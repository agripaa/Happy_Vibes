const Like = require("../Models/likeData.model");
const Posting = require("../Models/postingData.model");

module.exports = {
    async addLike(req, res){
        const { postId } = req.body;
        const { userId } = req;
        const posting = await Posting.findOne({
            where: {id: postId}
        })
        try {
            await posting.increment("like");
            const like = await Like.create({ postId, userId });
            res.status(200).json({status: 200, result: like});
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    async removeLike(req, res){
        const { postId } = req.body;
        const { userId } = req;
        const posting = await Posting.findOne({
            where: { id: postId },
        });
        try {
            const like = await Like.findOne({ where: { postId, userId } });
            if (like) {
            await posting.decrement("like");
            await like.destroy();
            res.status(200).json({ status: 200, msg: "Like removed successfully" });
            } else {
            posting.liked = !posting.liked;
            await posting.save();
            res.status(200).json({ status: 200, msg: "Like toggled successfully" });
            }
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}