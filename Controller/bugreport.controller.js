const BugReport = require("../Models/bugreportData.model");
const nodemailer = require('nodemailer');
const Users = require("../Models/usersData.model");
const ImageProfile = require("../Models/imageProfileData.model");
const TypeBug = require("../Models/typeBugData.model");
const { attributesUserImageProfileId } = require("../utils/attributes.utils");

require('dotenv').config();

module.exports = {
  async getReport(req, res) {
    try {
      const bugReport = await BugReport.findAll({
        include:[{
          model: Users,
          attributes: attributesUserImageProfileId,
          include: [{model: ImageProfile}]
        }]
      })
      res.status(200).json({status: 200, result: bugReport})
    } catch (err) {
      console.error(err);
      return res.status(500).json({ status: 500, msg: 'Internal server error' });
    }
  },
  async sendReport(req, res) {
    const { title, type_bug_id, report } = req.body;

    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE,
      auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.PASS_EMAIL_OTP,
      },
    });

    try {
      await BugReport.create({
        title: title,
        type_bug_id: type_bug_id,
        report: report,
        userId: req.userId,
      });

      const type_bug = await TypeBug.findOne({where: {id: type_bug_id}})
      const user = await Users.findOne({where: {id: req.userId}})

      const mailOptions = {
        from: process.env.EMAIL_SENDER,
        to: process.env.INTERNAL_EMAIL,
        subject: 'Bug Report!',
        text: `Title: ${title}\nType bug: ${type_bug.bug}\nBug Report: ${report}\nReporter: ${user.name}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(500).json({ status: 500, msg: 'Error sending bug report', error: error });
        } else {
          res.status(200).json({ status: 200, msg: 'Bug report sent' });
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: 500, msg: 'Error saving bug report' });
    }
  }
};