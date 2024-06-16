const Posting = require('../Models/postingData.model');
const Users = require('../Models/usersData.model');
const nodemailer = require('nodemailer');
const dataReportCategory = require('../data/reportCategory.json');

module.exports = {
    async getReportPostCategory(req, res){
      try {
        res.status(200).json({status: 200, data: dataReportCategory});
      } catch (error) {
        console.error(error);
        res.status(500).json({status: 500, msg: error.message, error});
      }
    },
    async getReportPostCategoryByName(req, res){
      const { category } = req.params;
    
      try {
        const categoryData = dataReportCategory[category];  
        if (!categoryData) return res.status(404).json({ status: 404, msg: `Category '${category}' not found` });

        res.status(200).json({ status: 200, data: categoryData });
      } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, msg: error.message, error });
      }
    },
    async sendReportPost(req, res) {
        const { postId, category }  = req.params;
        const { userId } = req;
        try {
            const posting = await Posting.findOne({where: {id: postId,}}); 
            const user  = await Users.findOne({where: {id: userId},})
            const categoryReportData = dataReportCategory[category];

            if(!categoryReportData) return res.status(404).json({status:404, msg: 'Report Category not found'});
            if(!posting) return res.status(404).json({status: 404, msg: 'posting not found'});

            const categoryDetails = categoryReportData
                .map(detail => `    * ${detail}`)
                .join('\n');

            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: process.env.EMAIL_PORT,
                secure: process.env.EMAIL_SECURE,
                auth: {
                  user: process.env.EMAIL_SENDER,
                  pass: process.env.PASS_EMAIL_OTP,
                },
              });

              const mailOptionsForCompany = {
                from: process.env.EMAIL_SENDER,
                to: process.env.INTERNAL_EMAIL,
                subject: `${user.username} send report posting!`,
                text: `
Report Details:
- Category: ${category}
- Post ID: ${posting.uuid}
- Reported by: ${user.username}

Category Report Details:
${categoryDetails}
                `.trim(),
              };

              const mailOptionsForUser = {
                from: process.env.EMAIL_SENDER,
                to: user.email,
                subject: `Thanks for you're reported!`,
                text: `
                We will proccess your reports
                Report Details:
                - Category: ${category}
                - Post Unique ID: ${posting.uuid}
                - Reported by: ${user.username}
                `,
              };

                await Promise.all([
                  transporter.sendMail(mailOptionsForCompany),
                  transporter.sendMail(mailOptionsForUser)
                ]);
              
                res.status(200).json({ status: 200, msg: "Report Sent Successfully" });
        } catch (err) {
            console.error(err);
            res.status(500).json({status: 500, msg: err.message, err});
        }
    }
}