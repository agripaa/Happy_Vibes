const Background = require("../Models/backgroundData.model");
const Users = require("../Models/usersData.model");
const path = require('path');

const attributesUser = ['name','email', 'url', 'name_img'];

module.exports = {
    async getBgUser(req, res){
        try {
            const user = await Users.findOne({where: {id: req.userId}})
            const background = await Background.findOne({
                where: {id: user.backgroundId},
            });

            if(!background) return res.status(404).json({status: 404, msg: 'Please Upload your backgound file'});
            res.status(200).json({status: 200, result: background});
        } catch (err) {
            console.error(err);
            res.status(500).json({status: 500, msg: "Internal Server Error"});
        }
    },
    async getBackgroundUserById(req, res) {
        const {userId} = req.params;
        try {
            if (userId == req.userId) return res.status(401).json({status: 400, msg: "Cannot search your self background in this function."})

            const user = await Users.findOne({where: {id: userId}})
            if(!user) return res.status(404).json({status: 404, msg: "User Not Found!"})

            const background = await Background.findOne({
                where: {id: user.backgroundId},
            });

            if(!background) return res.status(404).json({status: 404, msg: 'User has not background image'});
            return res.status(200).json({status: 200, result: background});
        } catch (err) {
            console.error(err);
            res.status(500).json({status: 500, msg: "Internal Server Error"});
        }
    }, 
    async updateBackgroundUser(req, res){
        let name_bg;
        const {files} = req;
        const {userId} = req;

        const user = await Users.findOne({where: {id: userId}});
        if (!user) return res.status(404).json({status: 404, msg: "User Not Found!"})

        const background = await Background.findOne({
            where: {id: user.backgroundId}
        })

        if(!files) {
            name_bg = background.name_bg;
        } else {
            const {file} = files;
            const size = file.data.length;
            const ext = path.extname(file.name)
            name_bg = file.md5 + ext;
            const allowedTypePhotos = [
                '.png',
                '.jpg',
                '.jpeg'
            ];

            if(!allowedTypePhotos.includes(ext.toLowerCase())) return res.status(422).json({msg: "invalid images"})
            if(size > 5000000) return res.status(422).json({msg: "image must be less than 5 MB"});
            file.mv(`./public/users/bg_img/${name_bg}`, async (err) => {
                if (err) return res.status(500).json({ status: 500, msg: 'Internal server error', err: err.message });
            });
        }
        const bg_url = `/users/bg_img/${name_bg}`
        try {
            Background.update({
                name_bg: name_bg,
                url_bg: bg_url,
            },{
                where: {id: background.id},
            })
            res.status(200).json({status: 200, msg: "Image updated successfully"})
        } catch (error) {
            console.error(err);
            res.status(500).json({status: 500, msg: "Internal Server Error"});
        }
    }
}