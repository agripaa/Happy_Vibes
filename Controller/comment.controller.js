const Comment = require('../Models/commentsData.model.js');
const Posting = require('../Models/postingData.model.js');
const Users = require('../Models/usersData.model.js');

const attributesUser = ['name', 'url', 'name_img'];
const attributePosting = ['url', 'name_img', 'desc'];

module.exports = {
    async getComments(req, res) {
        try {
            const { id } = req.params;
            const comments = await Comment.findAll({
                where: { postId: id },
                include: [{
                    model: Users,
                    attributes: attributesUser
                },{
                    model: Posting,
                    attributes: attributePosting
                }]
            })
            res.status(200).json({status: 200, result: comments})
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 500, msg: 'Internal server error' });
        }
    },
    async uploadComment(req, res){
        const postId = req.params.id;
        const { comment } = req.body;

        const post = await Posting.findByPk(postId);
        if (!post) return res.status(404).json({ error: 'Posting not found' });

        try {
        await Comment.create({ comment: comment , postId: post.id, userId: req.userId });
        return res.status(200).json({ status: 200, msg: 'Comment posted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 500, msg: 'Internal server error' });
        }
    }
}