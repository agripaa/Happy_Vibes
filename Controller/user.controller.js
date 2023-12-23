const Users = require('../Models/usersData.model.js');
const argon2 = require('argon2');
const path = require('path');
const validatePassword = require('../middleware/password.validation.js');
const moment = require('moment');
const nodemailer = require("nodemailer");
const Token = require('../Models/tokenData.model.js');
require('dotenv').config();
const crypto = require('crypto');
const Posting = require('../Models/postingData.model.js');
const { unlinkSync, existsSync } = require('fs');
const db = require('../Config/database.js');
const { Op } = require('sequelize');
const Background = require('../Models/backgroundData.model.js');
const Follows = require('../Models/followsData.model.js');

module.exports = {
  async getUsers(req, res) {
    try {
      const { userId } = req;
  
      const user = await Users.findAll({
        where: {
          id: {
            [Op.not]: userId
          }
        },
        order: db.random(),
        limit: 3,
        include: [{
          model: Follows,
          as: 'followers',
          attributes: ['followingId']
        },
        {
          model: Background,
          as: 'backgrounds',
          attributes: ['name_bg', 'url_bg']
        }]      
      });
      if(!user) return res.status(404).json({status: 404, msg:"No have data!"})
      res.status(200).json({ status: 200, result: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, result: 'Terjadi kesalahan saat mengambil data pengguna' });
    }
  },
  async getUserId(req, res){
    const { uuid } = req.params;
    const { userId } = req;
    try {
      const user = await Users.findOne({
        where: {
          uuid: {
            [Op.eq]: uuid
          }
        },
        attributes: ['id', 'uuid', 'name', 'username', 'desc', 'email', 'name_img', 'url', 'followingCount', 'followerCount'],
        include: [
          {
            model: Follows,
            as: 'followers',
            attributes: ['followingId']
          }
      ]    
      });
      if(user.id === userId) return res.status(403).json({status: 403, msg: 'Cannot see your profile in here'})
      if(!user) return res.status(404).json({ status: 404, msg: 'User not found' });
      return res.status(200).json({ status: 200, result: user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: 500, msg: err.message });
    }
  },
  shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  },
  async createUser(req, res) {
    const { name, username, email, password, confPassword, name_img, url } = req.body;
    
    const validatePass = validatePassword(password);
    if(validatePass['regex'] === "false" || validatePass['regex_symbol'] === 'false') return res.status(402).json({status: 400, msg: "The password must be at least 8 characters, there is one capital, one number and certain symbols are prohibited"})
    if(module.exports.validateName(name)) return res.status(403).json({status:403, msg: 'Name must be a min of 3 char and a max of 25 char'})
    if(module.exports.validateUsername(username)) return res.status(408).json({status:403, msg: 'Username must be a min of 3 char and a max of 15 char'})
        if(password !== confPassword) return res.status(400).json({status: 400, msg: 'Password and Confirm Password do not match'})
        const hashPassword = await argon2.hash(password);

        const validationEmail = await Users.findOne({ where: { email: email } });
        if (validationEmail) return res.status(409).json({ status: 409, msg: 'Email already exists' });
        
        try {
            const OTP = module.exports.generateOTP();
            module.exports.sendOTP(email, OTP);
            
            
            const user = await Users.create({
                name: name, 
                username: username,
                email: email,
                password: hashPassword,                     
                name_img: name_img, 
                url: url,
                verificationCode: OTP,
                createdAt: moment().toISOString()
              });
              
              Background.create({
                name_bg: null,
                url_bg: null,
                userId: user.id,
            })
            res.status(200).json({status: 200, msg: 'data user created successfully'});
        } catch (err) {
            console.error(err);
            res.status(500).json({status: 500, msg: err.message});
            return false;
        }
    },
    validateName(name){
        return name.length < 3 || name.length > 25
    },
    validateUsername(username){
      return username.length < 3 || username.length > 15
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
      console.error(err);
      res.status(500).json({ status: 500, msg: 'Internal server Error' });
      return false;
    }
  },
  async resendCode(req, res) {
    const { email } = req.body;

    const user = await Users.findOne({ email: email });
    if (!user)
      return res.status(404).json({ status: 404, msg: 'email user not found' });
    if (!user)
      return res
        .status(400)
        .json({ status: 400, msg: 'email already registered' });

        const OTP = module.exports.generateOTP();
        module.exports.sendOTP(email, OTP);
        try {
            await Users.update({
                verificationCode: OTP
            },{where: {email: email}})
        } catch (error) {
            console.error(err);
            res.status(500).json({status: 500, msg: "Internal server Error"});
            return false;
        }
    },
    async updateUser(req, res) {
      let profile_img;
      const {files} = req;
      let { desc } = req.body;
    
      try {
        const user = await Users.findOne({ where: { id: req.userId } });
        if (!user) return res.status(404).json({ status: 404, msg: 'User not found' });
        console.log(user)
        if (!desc) desc = user.desc;
        if (!files) {
          profile_img = user.name_img;
          console.log(profile_img);
        } else {
          profile_img = user.name_img;

          let {file} = files;
          let size = file.data.length;
          let profileExtend = path.extname(file.name);
          profile_img = `user_${file.md5}${profileExtend}`;
    
          let allowedTypePhotos = ['.jpg', '.png', '.jpeg', '.bmp', '.heif', '.psd', '.raw', '.gif'];
    
          if (!allowedTypePhotos.includes(profileExtend.toLowerCase())) return res.status(422).json({ msg: 'Invalid image' });
          if (size > 5000000) return res.status(422).json({ msg: 'Images must be less than 5MB' });
    
          file.mv(`./public/users/${profile_img}`, async (err) => {
            if (err) return res.status(500).json({ status: 500, msg: 'Internal server error', err: err.message });
          });
        }
        const profile_url = `${req.protocol}://${req.get('host')}/users/${profile_img}`;

        await Users.update(
          {
            name_img: profile_img,
            url: profile_url,
            desc: desc
          },
          {
            where: { id: user.id }
          }
        )
        res.status(200).json({ status: 200, msg: 'User updated successfully' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, msg: 'Internal server error', err: err.message });
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
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE,
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
                console.error('Error sending OTP email:', error);
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
          const photosToKeep = [
            'user_36da66ab4324b049f8032a2ae1cc12c4.jpeg',
            'user_053c88cf369f519d289b99d6119049f5.jpg',
            'user_60ef0bd9ba36c2c165e00be9b9a19dcd.jpg',
            'user_c13354bf51f1ce36d3e652b409e37f54.jpg',
            'user_db15b37020a2fbb05b69fa1157f0bbfa.jpg',
            'user_ff0b300a0e11132de2c89be1d79da25e.jpeg'
        ];

              if (user.name_img && !photosToKeep.includes(user.name_img)) {
                const nameImgPath = `./public/users/${user.name_img}`;
                if (existsSync(nameImgPath)) {
                    unlinkSync(nameImgPath);
                }
            }

            if(user.bg_img !== null){
                unlinkSync(`./public/users/bg_img/${user.bg_img}`, (err) => {
                    if (err) return res.status(500).json({status: 500, msg: "Internal server error", error: err})
                })
            }

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
            console.error(err);
            res.status(500).json({ status: 500, msg: 'Internal server error', err: err.message });
        }
    },
    async sendEmailTokenNewPassword(email, subject, text){
        try {
          let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: process.env.EMAIL_SECURE,
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
        } catch (error) {
            console.error(error, "email not sent");
        }
    },
    async getEmail(req, res) {
        const { email } = req.body;
    
        try {
          const user = await Users.findOne({
            where: { email: email },
          });
    
        if (!user) return res.status(404).json({status: 404, msg: "user with given email doesn't exist"});
          
        let token = await Token.findOne({ where: { userId: user.id } });
        if (!token) {
            token = await Token.create({
                userId: user.id,
                token: crypto.randomBytes(32).toString("hex"),
            });
        }

        const link = `${req.protocol}://localhost:5173/update-pass/${user.id}/${token.token}`;
        await module.exports.sendEmailTokenNewPassword(user.email, "Password reset", link);

          res.status(200).json({
            msg: 'password reset link sent to your email account"',
            link
          })
        } catch (error){ 
          console.error(error);
          res.status(500).json({ msg: 'Internal server error', error });
        }
      },
    async changePassword(req, res) {
        const { password, confPassword } = req.body;
        const { userId, token } = req.params;

        try {
          const user = await Users.findOne({where: {id: userId}});
          
          if (!user) return res.status(404).json({status: 404, msg: 'User not found'});
          const matchingPassword = await argon2.verify(user.password, password);
          if (matchingPassword) return res.status(430).json({status:430, msg: "The password cannot be the same as the previous password"})
          if (password !== confPassword) return res.status(400).json({ status: 400, msg: 'Password and Confirm Password do not match' });

          const tokenUser = await Token.findOne({
              where: {
                  userId: user.id,
                  token: token,
              },
            });
          if (user.id !== tokenUser.userId) return res.status(403).json({status: 403, msg: 'Have some problem on url link in token or id user'});
          if (!tokenUser) return res.status(404).json({status: 403, msg: "Tokens don't match"});

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