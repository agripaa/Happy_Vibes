const nodemailer = require("nodemailer");
const Token = require('../Models/tokenData.model.js');
const crypto = require('crypto');
const Users = require('../Models/usersData.model.js');
const validatePassword = require('../middleware/password.validation.js');
const argon2 = require('argon2');
require('dotenv').config();

module.exports = {
    async sendEmailTokenNewPassword(email, subject, text){
        try {
          let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: process.env.EMAIL_SECURE,
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASS_EMAIL,
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
        if (user.verificationCode) return res.status(402).json({status: 402, msg: "user is not verified!"});

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
            status: 200,
            msg: 'password reset link sent to your email account',
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
          if (matchingPassword) return res.status(430).json({status:430, msg: "The password cannot be the same as the previous password"});
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
          res.status(200).json({ status: 200, message: 'Password updated.' });
          } catch (err) {
          res.status(500).json({ status: 500, msg: err.message, err });
        }
    },
}