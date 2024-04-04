const Follows = require("../Models/followsData.model");
const ImageProfile = require("../Models/imageProfileData.model");
const Notifications = require("../Models/notifData.model");
const Users = require("../Models/usersData.model");
const { attributesFollowCountUser, attributesFollowsListUser } = require('../utils/attributes.utils.js');

module.exports = {
  async getFollowsCount(req, res) {
    const { userId } = req;
    try {
      const user = await Users.findByPk(userId, {
        attributes: attributesFollowCountUser
      });

      if (!user) return res.status(404).json({ status: 404, msg: 'User not found' });

      res.status(200).json({ status: 200, result:user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: 500, msg: 'Internal server error', err: err.message });
    }
  },
  async getFollowers(req, res){
    const { userId } = req;
    try {
      const listFollowers = await Follows.findAll({
        where: {followerId: userId}
      })
      
      const follower = listFollowers.map(follow => follow.followingId)
      if (!follower) return res.status(404).json  ({ status: 404, msg: 'you are has no followers' });
      const dataFollower = await Users.findAll({
        where: {id: follower},
        attributes: attributesFollowsListUser,
        include: [{model: ImageProfile}]
      })

      res.status(200).json({ status: 200, result: dataFollower });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: 500, msg: 'Internal server error', err: err.message });
    }
  },
  async getFollowing(req, res){
    const {userId} = req;

    try {
      const listFollowing = await Follows.findAll({
        where: {followingId: userId}
      })
      
      const following = listFollowing.map(follow => follow.followerId)
      if (!following) return res.status(404).json ({ status: 404, msg: 'you are has no following' });

      const dataFollowing = await Users.findAll({
        where: {id: following},
        attributes: attributesFollowsListUser,
        include: [{model: ImageProfile}]
      })

      res.status(200).json({ status: 200, result: dataFollowing });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: 500, msg: 'Internal server error', err: err.message });
    }
  },
  async followUser(req, res) {
    const followerId = req.params.id;
    const followingId = req.userId;
  
    try {
      const follower = await Users.findOne({ where: { id: followerId } });
      const following = await Users.findByPk(followingId);

      const existingFollow = await Follows.findOne({
        where: {
          followerId: followerId,
          followingId: followingId,
        },
      });
  
      
      if (existingFollow) {
        await following.decrement("followingCount");
        await follower.decrement("followerCount");

        await existingFollow.destroy();

        res.status(200).json({ status: 200, msg: 'unfollowed' });
      } else {
        await Follows.create({
          followerId: followerId,
          followingId: followingId,
          userId: req.userId
        });

        await Notifications.create({
          content_notif: `${following.name} started following you!`,
          type_notif: "follow",
          userId: followerId,
          followsId: followerId,
        });
    
        await following.increment("followingCount");
        await follower.increment("followerCount");

        res.status(200).json({ status: 200, msg: 'followed' });
      }
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ status: 500, msg: "Internal server error", err: err.message });
    }
  },
  async getMutualFollows(req, res) {
    const { userId } = req;
    try {
      const user = await Users.findByPk(userId);

      if (!user) return res.status(404).json({ status: 404, msg: 'User not found' });

      const userFollowings = await Follows.findAll({
        where: { followerId: userId }
      });

      const userFollowers = await Follows.findAll({
        where: { followingId: userId }
      });

      const userFollowingIds = userFollowings.map(follow => follow.followingId);
      const userFollowerIds = userFollowers.map(follow => follow.followerId);

      const mutualFollowIds = userFollowingIds.filter(id => userFollowerIds.includes(id));

      if (mutualFollowIds.length === 0) {
        return res.status(200).json({ status: 200, msg: 'No mutual follows found', result: [] });
      }

      const mutualFollows = await Users.findAll({
        where: { id: mutualFollowIds },
        attributes: attributesFollowsListUser,
        include: [{ model: ImageProfile }]
      });

      res.status(200).json({ status: 200, result: mutualFollows });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: 500, msg: 'Internal server error', err: err.message });
    }
  },
}
