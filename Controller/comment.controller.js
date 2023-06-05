const Comment = require('../Models/commentsData.model.js');
const Users = require('../Models/usersData.model.js');

const attributesUser = ['name', 'url', 'name_img'];

module.exports = {
    async getComments(_, res) {
        const comments = await Comment.findAll({
            include: [{
                model: Users,
                attributes: attributesUser
            }]
        })
        res.status(200).json({status: 200, result: comments})
    },
    async uploadComment(req, res){
        const postId = req.params.id;
        const { content } = req.body;

        try {

        // Mencari posting dengan ID yang sesuai
        const post = await Posting.findByPk(postId);
        if (!post) return res.status(404).json({ error: 'Posting not found' })

        // Menambahkan komentar ke posting
        const comment = await Comment.create({ content, PostId: postId, userId: req.userId });

        res.json(comment);


                return res.status(200).json({ status: 200, msg: 'Comment posted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 500, msg: 'Internal server error' });
        }
    }
}