const CodeOTP = require('../Models/codeOTP.model.js');
const Users = require('../Models/usersData.model.js');
const nodemailer = require('nodemailer')
require('dotenv').config();

module.exports = {
    async verifyUser(req, res){
        const { otp } = req.body;
        
        const userOtp = await CodeOTP.findOne({otp});        
        if(!userOtp) return res.status(404).json({status: 404, msg: 'wrong otp code'})
        if (userOtp.otp !== otp)
        return res
            .status(400)
            .json({ status: 400, msg: 'code otp yang anda masukkan tidak sesuai' });
        try {
        await Users.update({
          verify: true || 1,
        }, {where: {verify_id: userOtp.id}});

        await CodeOTP.destroy({
            where: { otp }
        })
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
            user: process.env.EMAIL_SENDER,
            pass: process.env.PASS_EMAIL_OTP,
          },
        });
    
        const mailOptions = {   
          from: process.env.EMAIL_SENDER,
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
    generateOTP() {
        const digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 6; i++) {
          OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
    },
}