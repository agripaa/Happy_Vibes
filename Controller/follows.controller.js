const Follows = require("../Models/followsData.model");
const Users = require("../Models/usersData.model");
const log = require("../utils/log");

module.exports = {
  async getFollowers(req, res) {
    const { userId } = req;
    try {
      const user = await Users.findByPk(userId, {
        attributes: ['uuid', 'name', 'email', 'followerCount', 'followingCount']
      });

      if (!user) return res.status(404).json({ status: 404, msg: 'User not found' });

      res.status(200).json({ status: 200, result:user });
    } catch (err) {
      log.error(err);
      res.status(500).json({ status: 500, msg: 'Internal server error', err: err.message });
    }
  },
  async followUser(req, res) {
    const followerId = req.params.id;
    const followingId = req.userId;

    try {
      const follower = await Users.findOne({where: {id: followerId}});
      const following = await Users.findByPk(followingId);
      if (!follower || !following) return res.status(404).json({ status: 404, msg: 'User not found' });

      const existingFollow = await Follows.findOne({
        where: {
          followerId: followerId,
          followingId: followingId,
        },
      });

      if (existingFollow) return res.status(400).json({ status: 400, msg: 'User already followed' });

      await Follows.create({
        followerId: followerId,
        followingId: followingId,
      });

      await following.increment('followingCount');
      await follower.increment('followerCount');

      await Notifications.create({
        content_notif: `User ${follower.name} started following you`,
        type_notif: 'follow',
        userId: followingId,
        followsId: followerId
      });

      res.status(200).json({ status: 200, msg: 'User followed successfully' });
    } catch (err) {
      log.error(err);
      res.status(500).json({ status: 500, msg: 'Internal server error', err: err.message });
    }
  },
  async unfollowUser(req, res) {
    const followerId = req.params.id;
    const followingId = req.userId;
    try {
      const existingFollow = await Follows.findOne({
        where: {
          followerId: followerId,
          followingId: followingId,
        },
      });

      if (!existingFollow) res.status(404).json({ status: 404, msg: 'Follow relationship not found' });
      await existingFollow.destroy();

      const follower = await Users.findOne({
        where: {
          id: followerId,
        },
      });
      const following = await Users.findByPk(followingId);
      await following.decrement('followingCount');
      await follower.decrement('followerCount');

      res.status(200).json({ status: 200, msg: 'User unfollowed successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: 500, msg: 'Internal server error', err: err.message });
    }
  },
}