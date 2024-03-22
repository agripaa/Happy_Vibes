const Follows = require("../Models/followsData.model");
const ImageProfile = require("../Models/imageProfileData.model");
const Notifications = require("../Models/notifData.model");
const Users = require("../Models/usersData.model");


module.exports = {
  async getFollowsCount(req, res) {
    const { userId } = req;
    try {
      const user = await Users.findByPk(userId, {
        attributes: ['uuid', 'name', 'followerCount', 'followingCount']
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
        where: {followingId: userId}
      })
      
      const follower = listFollowers.map(follow => follow.followerId)
      if (!follower) return res.status(404).json({ status: 404, msg: 'you are has no followers' });
      console.log(`list followers: ${follower}`)
      const dataFollower = await Users.findAll({
        where: {id: follower},
        attributes: ['id', 'uuid', 'name', 'username', 'email', 'image_profile'],
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
      
      const following = listFollowing.map(follow => follow.followingId)
      if (!following) return res.status(404).json({ status: 404, msg: 'you are has no following' });

      const dataFollowing = await Users.findAll({
        where: {id: following},
        attributes: ['id', 'uuid', 'name', 'username', 'email', 'image_profile'],
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
}
