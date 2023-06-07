const BugReport = require("../Models/bugreportData.model");
const nodemailer = require('nodemailer');
const Users = require("../Models/usersData.model");
require('dotenv').config();

module.exports = {
  async sendReport(req, res) {
    const { title, type_bug, report } = req.body;

    let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
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
        from: 'zycx989@gmail.com',
        to: 'happyVibess23@gmail.com',
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