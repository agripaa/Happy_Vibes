const Like = require("../Models/likeData.model");
const Posting = require("../Models/postingData.model");
const Users = require("../Models/usersData.model");
const { attributesLikePosting, attributesIdUUIDNameUser } = require("../utils/attributes.utils");

module.exports = {
  async getLike(req, res) {
    const { postId } = req.params;
    try {
        const like = await Posting.findOne({
            where: {id: postId},
            attributes: attributesLikePosting
        })
        res.status(200).json({status: 200, result: like})
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async addLike(req, res) {
    const { postId } = req.body;
    const { userId } = req;
    
    try {
        const posting = await Posting.findOne({
          where: { id: postId },
          include: [{
            model: Users,
            attributes: attributesIdUUIDNameUser
          }]
        });
        if (!posting) return res.status(404).json({status: 404, msg: "Posting data is not found!"})
        const user = await Users.findOne({
            where: { id: userId },
        })

        const exitingLike = await Like.findOne({
            where: {
                userId: userId,
                postId: postId
            }
        })

        if(exitingLike){
            posting.decrement("like");

            await exitingLike.destroy();
            res.status(200).json({status: 200, msg: "Unlike", like: posting.like - 1 })
        }else{
            await posting.increment("like");
            await Like.create({ postId: postId, userId: userId });
            if (userId !== posting.userId){
                await Notification.create({
                    content_notif: `${user.name} Like Your Posting!`,
                    type_notif: "Like",
                    userId: posting.userId,
                    postId: postId,
                })
            }
            res.status(200).json({ status: 200, msg: 'Liked', like: posting.like + 1 });
        }

    } catch (error) {
      res.status(500).json({ status:500, error: "Internal Server Error", msg: error.message });
    }
  }
};
