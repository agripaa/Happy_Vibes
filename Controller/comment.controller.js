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
        const { comment } = req.body;
        
    }
}