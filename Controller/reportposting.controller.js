const CategoryReportPosting = require('../Models/categoryReportPostingData.model');
const ImagePosting = require('../Models/imagePostingData.model');
const Posting = require('../Models/postingData.model');
const RatioImage = require('../Models/ratioImagePostingData.model');
const ReportPosting = require('../Models/reportPostingData.model');
const Users = require('../Models/usersData.model');
const path = require('path');
const nodemailer = require('nodemailer');
const { attributesUser, attributesImagePostingId, attributesImagePosting, attributesRatioImage } = require('../utils/attributes.utils');

module.exports = {
    async getReportPosting(req, res){
      try {
        const report_posting = await ReportPosting.findAll({
          include: [
            {
              model: Users,
              attributes: attributesUser
            },
            {
              model: Posting,
              attributes: attributesImagePostingId,
              include: [{
                model: ImagePosting,
                attributes: attributesImagePosting,
                include: [{
                  model: RatioImage,
                  attributes: attributesRatioImage
                }]
              }]
            }
          ]
        });
        if(report_posting.length === 0) return res.status(404).json({status: 404, msg: "data report posting is null"});
        
        res.status(200).json({status: 200, result: report_posting});
      } catch (error) {
        console.error(error);
        res.status(500).json({status: 500, msg: error.message});
      }
    },
    async sendReportPost(req, res) {
        const { postId, category_report_post } = req.body;
        const { userId } = req;

        const posting = await Posting.findOne({
            where: {id: postId,},
            include: [
              {
                model: Users,
                attributes: attributesUser
              },
              {
                model: ImagePosting,
                attributes: attributesImagePosting,
                include: [{
                  model: RatioImage,
                  attributes: attributesRatioImage
                }]
              }
            ]
        }); 
        if(!posting) return res.status(404).json({status: 404, msg: 'posting not found'});
        console.log({posting})

        const category_report = await CategoryReportPosting.findOne({ 
          where: {id: category_report_post}
        });
        if(!category_report) return res.status(404).json({status: 404, msg: 'category report posting is not found!'});
        
        const user  = await Users.findOne({
          where: {id: userId}
        });

        try {
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: process.env.EMAIL_PORT,
                secure: process.env.EMAIL_SECURE,
                auth: {
                  user: process.env.EMAIL,
                  pass: process.env.PASS_EMAIL,
                },
              });

              const imagePath = path.join(__dirname, '..', 'public', 'postings', posting.image_posting.name_img);

              const mailOptions = {
                from: process.env.EMAIL,
                to: process.env.EMAIL,
                subject: `${user['username']} send report posting!`,
                text: `
something wrong this posting: 
  Detail user : 
  Username  : ${user['username']}
  Email   : ${user['email']}

  Detail posting  :
  Id Posting  : ${posting['id']}
  Uniqe Id Posting  : ${posting['uuid']}

  Detail Report :
  Title Report  : ${category_report['category_report']}
  Desc Report : ${category_report['desc_category_report']}
                `,
                attachments: [
                  {
                      filename: posting.image_posting.name_img, 
                      path: imagePath, 
                      cid: 'image_posting'
                  }
                ]
              };

              await ReportPosting.create({category_report_post, userId, postId});
          
              return new Promise((resolve, reject) => {
                  transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                      console.error('Error sending email:', error);
                      reject(new Error('Failed to send Report Post Email'));
                    } else {
                      resolve();
                      res.status(200).json({status: 200, msg: "report posting successfully"});
                    }
                  });
              });
        } catch (err) {
          console.error(err);
          res.status(500).json({status: 500, msg: err.message});  
        }
    },
    async deleteReportPostingData(req, res) {
      const { id } = req.params;
    
      const report_posting = await ReportPosting.findOne({where: {id}});
      if(!report_posting) return res.status(404).json({status: 404, msg: "data report posting is not found!"})
      try {
        await ReportPosting.destroy({where: {id: report_posting['id']}});
        res.status(200).json({status: 200, msg: "deleted report posting successfully!"});
      } catch (error) {
        console.error(error);
        res.status(500).json({status: 500, msg: error.message});
      }
    }
}