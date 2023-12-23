const Comment = require('../Models/commentsData.model.js');
const Notifications = require('../Models/notifData.model.js');
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
                }],
                order: [['id', 'DESC']] 
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

        const post = await Posting.findByPk(postId,
            {include: [{
                model: Users,
                attributes: ['id', 'uuid']
            }]});
        if (!post) return res.status(404).json({ error: 'Posting not found' });

        try {
        const createdComment = await Comment.create({ comment: comment , postId: post.id, userId: req.userId });
        if(req.userId !== post.users_datum.id) {
            await Notifications.create({
                content_notif: `User ${req.user.name} commented on your post : ${comment}`,
                type_notif: 'comment',
                userId: post.users_datum.id,
                postId: post.id,
                commentId: createdComment.id
              });
        }

        return res.status(200).json({ status: 200, msg: 'Comment posted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 500, msg: 'Internal server error' });
        }
    }
}