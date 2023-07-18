const Background = require("../Models/backgroundData.controller");
const Users = require("../Models/usersData.model");

const attributesUser = ['name','email', 'url', 'name_img'];

module.exports = {
    async getBgUser(req, res){
        try {
            const background = await Background.findOne({
                where: {userId: req.userId},
                include: {
                    model: Users,
                    attributes: attributesUser 
                }
            });

            if(!background) return res.status(404).json({status: 404, msg: 'Please Upload your backgound file'});
            res.status(200).json({status: 200, result: background});
        } catch (err) {
            console.error(err);
            res.status(500).json({status: 500, msg: "Internal Server Error"});
        }
    },
    async updateBackgroundUser(req, res){
        let name_bg;
        const {files} = req;
        const {userId} = req;

        const background = await Background({
            where: {userId: userId}
        })

        if(!files) {
            
        } 
        try {
            
        } catch (error) {
            
        }
    }
}