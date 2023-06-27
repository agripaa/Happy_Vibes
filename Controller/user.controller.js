const Users = require('../Models/usersData.model.js');
const argon2 = require('argon2');
const path = require('path');
const fs = require('fs');
const log = require('../utils/log.js');
const validatePassword = require('../middleware/password.validation.js');
const moment = require('moment');
const nodemailer = require("nodemailer");
const CodeOTP = require("../Models/codeOTP.model.js");
const { P } = require("pino");
const Token = require('../Models/tokenData.model.js');
require('dotenv').config();
const crypto = require('crypto');

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

        if(module.exports.validateName(name, username)) return res.status(403).json({status:403, msg: 'Name and username must be a minimum of 3 characters and a maximum of 25 characters'})
        if(password !== confPassword) return res.status(400).json({status: 400, msg: 'Password and Confirm Password do not match'})
        const hashPassword = await argon2.hash(password);

        const validationEmail = await Users.findOne({ where: { email: email } });
        if (validationEmail) return res.status(409).json({ status: 409, msg: 'Email already exists' });
        
        try {
            validatePassword(password);
            const OTP = module.exports.generateOTP();
            module.exports.sendOTP(email, OTP);
            
            await Users.create({
                name: name, 
                username: username,
                email: email,
                password: hashPassword,                     
                name_img: name_img, 
                url: url,
                bg_img: null,                                                                           
                bg_url: null,
                verificationCode: OTP,
                createdAt: moment().toISOString()
            });
            
            res.status(200).json({status: 200, msg: 'data user created successfully'});
        } catch (err) {
            log.error(err);
            res.status(500).json({status: 500, msg: err.message});
            return false;
        }
    },
    validateName(name, username){
        return name.length < 3 && name.length > 25 && username.length < 3 && username.length > 25
    },

    async verifyUser(req, res){
        const { otp } = req.body;
        
        const user = await Users.findOne({where: {verificationCode: otp}})
        if(!user) return res.status(404).json({status: 404, msg: 'wrong otp code'})

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
        try {
            await Users.update({
                verificationCode: OTP
            },{where: {email: email}})
        } catch (error) {
            log.error(err);
            res.status(500).json({status: 500, msg: "Internal server Error"});
            return false;
        }
    },
    async updateUser(req, res){
        let name_img, bg_img, hashPassword;
        const files = req.files;
        const { name, username, email, password, confPassword } = req.body;
        const photosToKeep = [
            'user_36da66ab4324b049f8032a2ae1cc12c4.jpeg',
            'user_053c88cf369f519d289b99d6119049f5.jpg',
            'user_60ef0bd9ba36c2c165e00be9b9a19dcd.jpg',
            'user_c13354bf51f1ce36d3e652b409e37f54.jpg',
            'user_db15b37020a2fbb05b69fa1157f0bbfa.jpg',
            'user_ff0b300a0e11132de2c89be1d79da25e.jpeg'
        ];
    
        if(this.validateName(name, username)) return res.status(403).json({status:403, msg: 'Name and username must be a minimum of 3 characters and a maximum of 25 characters'})
        try {
            const user = await Users.findOne({where: { uuid: req.params.id }});
            if (!user) return res.status(404).json({ status: 404, msg: 'User not found' });

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

            if (!files) {
                name_img = user.name_img;
                bg_img = user.bg_img
            } else {
                name_img = user.name_img;
                bg_img = user.bg_img;

                if (user.name_img && !photosToKeep.includes(user.name_img)) {
                    const nameImgPath = `./public/users/${user.name_img}`;
                    if (existsSync(nameImgPath)) {
                        unlinkSync(nameImgPath);
                    }
                }

                if(bg_img !== null){
                    unlinkSync(`./public/users/bg_img/${bg_img}`, (err) => {
                        if (err) return res.status(500).json({status: 500, msg: "Internal server error", error: err})
                    })
                }

                const file = files.file;
                const size = file.data.length;
                const extend = path.extname(file.name);
                name_img = `user_${file.md5}${ext}`
                bg_img = `bg_${file.md5}${ext}`;
                const allowedTypePhotos = ['.jpg', '.png', '.jpeg', '.bmp', '.heif', '.psd', '.raw', '.gif']
                
                if (!allowedTypePhotos.includes(extend.toLowerCase())) return res.status(422).json({ msg: 'Invalid image' });
                if (size > 5000000) return res.status(422).json({ msg: 'Images must be less than 5MB' });
                
                file.mv(`./public/users/${name_img}`, async (err) => {
                    if (err) return res.status(500).json({ status: 500, msg: 'Internal server error', err: err.message });
                });
                file.mv(`./public/users/bg_img/${bg_img}`, async (err) => {
                    if (err) return res.status(500).json({ status: 500, msg: 'Internal server error', err: err.message });
                });
            }
            
            const url = `${req.protocol}://${req.get("host")}/users/${name_img}`;
            const bg_url = `${req.protocol}://${req.get("host")}/users/bg_img/${bg_img}`;
            await Users.update( {
                name: name,
                email: email,
                password: hashPassword,
                name_img: name_img,
                url: url,
                bg_img: bg_img,
                bg_url: bg_url
            },{
                where: { id: user.id },
            });

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
                resolve();
              }
            });
        });
    },
    async deleteUser(req, res) {
        const {userId} = req;

        const user = await Users.findOne({
            where: {id: userId}
        });

        if(userId !== user.id) return res.status(400).json({status: 400, msg: "You cannot delete this account!"})

        try {
            await unlinkSync(`./public/users/${user.name_img}`, (err) => {
                if (err) return res.status(500).json({status: 500, msg: "Internal server error", error: err})
            })
            await unlinkSync(`./public/users/bg_img/${user.bg_img}`, (err) => {
                if (err) return res.status(500).json({status: 500, msg: "Internal server error", error: err})
            })

            const postings = await Posting.findAll({
                where: { userId: user.id }
            });
            
            for (const posting of postings) {
                if (posting.name_img) {
                    await unlinkSync(`./public/postings/${posting.name_img}`);
                }
                await posting.destroy();
            }

            await user.destroy();
            return res.status(200).json({status:200, msg: "User has been deleted"});
        } catch (err) {
            log.error(err);
            res.status(500).json({ status: 500, msg: 'Internal server error', err: err.message });
        }
    },
    async sendEmailTokenNewPassword(email, subject, text){
        try {
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASS_EMAIL_OTP,
                },
            });
    
            await transporter.sendMail({
                from: process.env.EMAIL,
                to: email,
                subject: subject,
                text: text,
            });
    
            log.info("email sent sucessfully, link : ", text);
        } catch (error) {
            console.log(error, "email not sent");
        }
    },
    async getEmail(req, res) {
        const { email } = req.body;
    
        try {
          const user = await Users.findOne({
            where: { email: email },
          });
    
        if (!user) return res.status(404).json("user with given email doesn't exist");
          
        let token = await Token.findOne({ where: { userId: user.id } });
        if (!token) {
            token = await Token.create({
                userId: user.id,
                token: crypto.randomBytes(32).toString("hex"),
            });
        }

        const link = `${req.protocol}://http://localhost:5173/update-pass/${user.id}/${token.token}`;
        await module.exports.sendEmailTokenNewPassword(user.email, "Password reset", link);

          res.status(200).json({
            msg: 'password reset link sent to your email account"',
            link
          })
        } catch (error){ 
            log
          log.error(error);
          res.status(500).json({ msg: 'Internal server error', error });
        }
      },
    async changePassword(req, res) {
        const { password, confPassword } = req.body;
        const { userId, token } = req.params;

        try {
        const user = await Users.findOne({where: {id: userId}});
        if (!user) return res.status(400).send("invalid link or expired");

        if (password !== confPassword) {
            return res.status(404).json({ error: 'Password tidak cocok' });
        }

        const tokenUser = await Token.findOne({
            where: {
                userId: user.id,
                token: token,
            },
        });
        if (!tokenUser) return res.status(400).send("Invalid link or expired");

        validatePassword(password);
        const hashPassword = await argon2.hash(password);
    
        await user.update({password: hashPassword});
        await tokenUser.destroy();
        res.status(200).json({ message: 'Password updated.' });
        } catch (err) {
        res.status(400).json({ msg: err.message });
        }
    },
};