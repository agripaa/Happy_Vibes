const Posting = require('../Models/postingData.model');
const Users = require('../Models/usersData.model');
const nodemailer = require('nodemailer');

module.exports = {
    async sendReportPost(req, res) {
        const { postId }  = req.params;
        const { userId } = req;
        try {
            const posting = await Posting.findOne({
                where: {id: postId,}
            }); 
            if(!posting) return res.status(404).json({status: 404, msg: 'posting not found'});
            const user = await Users.findOne({
              where: {id: userId},
            })

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
                to: process.env.EMAIL,
                subject: `${user.username} send report posting!`,
                text: `something wrong with posting with uuid : ${posting.uuid}`,
              };
          
                return new Promise((resolve, reject) => {
                    transporter.sendMail(mailOptions, (error, info) => {
                      if (error) {
                        console.error('Error sending OTP email:', error);
                        reject(new Error('Failed to send OTP email'));
                      } else {
                        resolve();
                        res.status(200).json({status: 200, msg: "report posting successfully"});
                      }
                    });
                });
        } catch (err) {
            console.error(err);
        }
    }
}