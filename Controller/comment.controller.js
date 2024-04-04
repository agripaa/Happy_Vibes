const Comment = require('../Models/commentsData.model.js');
const ImagePosting = require('../Models/imagePostingData.model.js');
const ImageProfile = require('../Models/imageProfileData.model.js');
const Notifications = require('../Models/notifData.model.js');
const Posting = require('../Models/postingData.model.js');
const RatioImage = require('../Models/ratioImagePostingData.model.js');
const Users = require('../Models/usersData.model.js');
const { attributesUserImageProfileId, attributesImageProfile, attributesPostingDescription, attributesImagePosting } = require('../utils/attributes.utils.js');

const includeUserDatas = {
    model: Users,
    attributes: attributesUserImageProfileId,
    include: [{
        model: ImageProfile,
        attributes: attributesImageProfile
    }]
};

module.exports = {
    async getComments(req, res) {
        try {
            const { id } = req.params;

            const comments = await Comment.findAll({
                where: { postId: id },
                include: [
                    includeUserDatas,
                    {
                    model: Posting,
                    attributes: attributesPostingDescription,
                    include: [{
                        model: ImagePosting,
                        attributes: attributesImagePosting,
                        include: [{
                            model: RatioImage,
                            attributes: atatributesRatioImage
                        }]
                    }]
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

        const post = await Posting.findByPk(postId, {include: includeUserDatas});
        if (!post) return res.status(404).json({ error: 'Posting not found' });
        
        console.log({data_post: post.users_datum.id})
        console.log(req.userId)

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