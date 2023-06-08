const BugReport = require("../Models/bugreportData.model");
const nodemailer = require('nodemailer');
const Users = require("../Models/usersData.model");
const log = require("../utils/log");
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
      log.error(err);
      return res.status(500).json({ status: 500, msg: 'Internal server error' });
    }
  },
  async sendReport(req, res) {
    const { title, type_bug, report } = req.body;

     let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_SEND, 
        pass: process.env.EMAIL_SEND_PASSWORD, 
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
        from: process.env.EMAIL_SEND,
        to: process.env.EMAIL,
        subject: 'Bug Report!',
        text: `Title: ${title}\nType bug: ${type_bug}\nBug Report: ${report}\nReporter: ${user.name}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: 500, msg: 'Error sending bug report', error: error });
        } else {
          console.log(info);
          res.status(200).json({ status: 200, msg: 'Bug report sent' });
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: 500, msg: 'Error saving bug report' });
    }
  }
};