const BugReport = require("../Models/bugreportData.model");
const nodemailer = require('nodemailer');
const Users = require("../Models/usersData.model");

require('dotenv').config();

module.exports = {
  async getReport(req, res) {
    try {
      const bugReport = await BugReport.findAll({
        include:[{
          model: Users,
          attributes: ['uuid', 'name', 'email', 'url', 'name_img']
        }]
      })
      res.status(200).json({status: 200, result: bugReport})
    } catch (err) {
      console.error(err);
      return res.status(500).json({ status: 500, msg: 'Internal server error' });
    }
  },
  async sendReport(req, res) {
    const { title, type_bug, report } = req.body;

    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS_EMAIL_OTP,
      },
    });

    try {
      const user = await Users.findOne({
        attributes: ['uuid', 'name', 'email'],
        where: { uuid: req.session.userId },
      });

      if (!user) return res.status(404).json({ status: 404, msg: 'User not found!' });

      await BugReport.create({
        title: title,
        type_bug: type_bug,
        report: report,
        userId: req.userId,
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: 'Bug Report!',
        text: `Title: ${title}\nType bug: ${type_bug}\nBug Report: ${report}\nReporter: ${user.name}`,
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