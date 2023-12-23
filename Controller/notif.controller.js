const Notifications = require("../Models/notifData.model");


module.exports = {
    async getNotifications(req, res) {
      const { userId } = req;
  
      try {
        const notifications = await Notifications.findAll({
          where: { userId: userId },
        });
  
        res.status(200).json({ status: 200, result: notifications });
      } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, msg: 'Internal server error' });
      }
    },
  };