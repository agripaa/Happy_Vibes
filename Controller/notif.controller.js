const Notifications = require("../Models/notifData.model");
const log = require("../utils/log");

module.exports = {
    async getNotifications(req, res) {
      const { userId } = req;
  
      try {
        const notifications = await Notifications.findAll({
          where: { userId: userId },
        });
  
        res.status(200).json({ status: 200, result: notifications });
      } catch (error) {
        log.error(error);
        res.status(500).json({ status: 500, msg: 'Internal server error' });
      }
    },
  };