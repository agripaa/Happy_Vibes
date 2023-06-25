const Users = require('../Models/usersData.model.js');
const argon2 = require('argon2');
const path = require('path');
const fs = require('fs');
const log = require('../utils/log.js');
const validatePassword = require('../middleware/password.validation.js');
const moment = require('moment');
const nodemailer = require('nodemailer');
const CodeOTP = require('../Models/codeOTP.model.js');
const { P } = require('pino');
require('dotenv').config();

module.exports = {
  async getUsers(_, res) {
    try {
      const users = await Users.findAll();
      res.status(200).json({
        status: 'success',
        result: users,
      });
    } catch (err) {
      log.error('error: ', err);
      res
        .status(500)
        .json({ status: 'error', msg: 'internal server error', error: err });
    }
  },
  async createUser(req, res) {
    const files = req.files;
    const { name, username, email, password, confPassword } = req.body;

    if (name.length <= 3 && name.length > 25)
      return res.status(403).json({
        status: 403,
        msg: 'Username must be a minimum of 3 characters and a maximum of 25 characters',
      });
    if (password !== confPassword)
      return res.status(400).json({
        status: 400,
        msg: 'Password and Confirm Password do not match',
      });
    const hashPassword = await argon2.hash(password);

    if (files === null)
      return res.status(400).json({ status: 400, msg: 'No file uploaded' });
    const file = files.file;
    const size = file.data.length;
    const extend = path.extname(file.name);
    const name_img = file.md5 + extend;
    const url = `${req.protocol}://${req.get('host')}/users/${name_img}`;
    const allowedTypePhotos = [
      '.jpg',
      '.png',
      '.jpeg',
      '.bmp',
      '.heif',
      '.psd',
      '.raw',
      '.gif',
    ];

    if (!allowedTypePhotos.includes(extend.toLowerCase()))
      return res.status(422).json({ status: 422, msg: 'Invalid image' });
    if (size > 5000000)
      return res
        .status(422)
        .json({ status: 422, msg: 'Images must be less than 5MB' });

    file.mv(`./public/users/${name_img}`, async (err) => {
      if (err)
        return res
          .status(500)
          .json({ status: 500, msg: 'Internal server error', error: err });

      const validationEmail = await Users.findOne({ where: { email: email } });
      if (validationEmail)
        return res
          .status(409)
          .json({ status: 409, msg: 'Email already exists' });

      try {
        validatePassword(password);

        const OTP = module.exports.generateOTP();
        module.exports.sendOTP(email, OTP);
        log.info(OTP);

        await Users.create({
          name: name,
          username: username,
          email: email,
          password: hashPassword,
          name_img: name_img,
          url: url,
          verificationCode: OTP,
          createdAt: moment().toISOString(),
        });

        res
          .status(200)
          .json({ status: 200, msg: 'data user created successfully' });
      } catch (err) {
        log.error(err);
        res.status(400).json({ status: 400, msg: err.message });
        return false;
      }
    });
  },
  async verifyUser(req, res) {
    const { otp } = req.body;

    const user = await Users.findOne({ where: { verificationCode: otp } });
    if (!user)
      return res.status(404).json({ status: 404, msg: 'wrong otp code' });

    if (user.verificationCode !== otp)
      return res
        .status(400)
        .json({ status: 400, msg: 'code otp yang anda masukkan tidak sesuai' });
    try {
      await Users.update(
        {
          verificationCode: null,
        },
        {
          where: { verificationCode: user.verificationCode },
        }
      );
      res.status(200).json({ status: 200, msg: 'otp approved' });
    } catch (err) {
      log.error(err);
      res.status(500).json({ status: 500, msg: 'Internal server Error' });
      return false;
    }
  },
  async resendCode(req, res) {
    const { email } = req.body;

    const user = await Users.findOne({ email: email });
    if (user.verificationCode === null)
      return res
        .status(400)
        .json({ status: 400, msg: 'email already registered' });
    if (!user)
      return res.status(404).json({ status: 404, msg: 'email user not found' });

    const OTP = module.exports.generateOTP();
    module.exports.sendOTP(email, OTP);
    log.info(OTP);
    try {
      await Users.update(
        {
          verificationCode: OTP,
        },
        { where: { email: email } }
      );
    } catch (error) {
      log.error(err);
      res.status(500).json({ status: 500, msg: 'Internal server Error' });
      return false;
    }
  },
  async updateUser(req, res) {
    let name_img, hashPassword;
    const files = req.files;
    const { name, email, password, confPassword } = req.body;

    try {
      const user = await Users.findOne({ where: { uuid: req.params.id } });
      if (!user)
        return res.status(404).json({ status: 404, msg: 'User not found' });

      if (password !== confPassword)
        return res.status(400).json({
          status: 400,
          msg: 'Password and confirm password do not match',
        });
      if (password === null || password === '') {
        hashPassword = user.password;
      } else {
        hashPassword = await argon2.hash(password);
      }

      if (files === null) {
        name_img = user.name_img;
      } else {
        name_img = user.name_img;
        fs.unlinkSync(`./public/users/${name_img}`, (err) => {
          if (err)
            return res
              .status(500)
              .json({ status: 500, msg: 'Internal server error', error: err });
        });
        const file = files.file;
        const size = file.data.length;
        const extend = path.extname(file.name);
        name_img = file.md5 + extend;
        const allowedTypePhotos = [
          '.jpg',
          '.png',
          '.jpeg',
          '.bmp',
          '.heif',
          '.psd',
          '.raw',
          '.gif',
        ];

        if (!allowedTypePhotos.includes(extend.toLowerCase()))
          return res.status(422).json({ msg: 'Invalid image' });
        if (size > 5000000)
          return res.status(422).json({ msg: 'Images must be less than 5MB' });

        file.mv(`./public/users/${name_img}`, async (err) => {
          if (err)
            return res.status(500).json({
              status: 500,
              msg: 'Internal server error',
              err: err.message,
            });
        });
      }

      const url = `${req.protocol}://${req.get('host')}/users/${name_img}`;
      await Users.update(
        {
          name: name,
          email: email,
          password: hashPassword,
          name_img: name_img,
          url: url,
        },
        {
          where: { id: user.id },
        }
      );

      res.status(200).json({ status: 200, msg: 'User updated successfully' });
    } catch (err) {
      log.error(err);
      res
        .status(500)
        .json({ status: 500, msg: 'Internal server error', err: err.message });
    }
  },
  generateOTP() {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  },
  async sendOTP(email, otp) {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS_EMAIL_OTP,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Verification Code',
      text: `Your verification code is: ${otp}`,
    };

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          log.error('Error sending OTP email:', error);
          reject(new Error('Failed to send OTP email'));
        } else {
          log.info('OTP email sent successfully');
          resolve();
        }
      });
    });
  },
  async getEmail(req, res) {
    const { email } = req.body;

    try {
      const findEmail = await Users.findOne({
        where: { email: email },
        attributes: ['email'],
      });

      if (!findEmail) {
        return res.status(404).json({ error: 'Email tidak ditemukan.' });
      }

      res.status(200).json({
        massage: 'Email ditemukan',
        email: findEmail,
      });
    } catch (error) {
      res.status(500).json({ msg: 'Internal server error' });
    }
  },
  async changePassword(req, res) {
    const { email } = req.params;
    const { newPassword, newConfirmPassword } = req.body;

    try {
      const newUserPassword = await await Users.findOne({
        where: { email: email },
      });

      if (newPassword !== newConfirmPassword) {
        return res.status(404).json({ error: 'Password tidak cocok' });
      }
      validatePassword(newPassword);

      const hashPassword = await argon2.hash(newPassword);
      newUserPassword.password = hashPassword;
      
      await newUserPassword.save();
      res.status(200).json({ message: 'Password updated.' });
    } catch (err) {
      res.status(400).json({ msg: err.message });
    }
  },
};
