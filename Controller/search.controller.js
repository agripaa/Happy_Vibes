const ImageProfile = require("../Models/imageProfileData.model");
const Users = require("../Models/usersData.model");
const { Op }  = require('sequelize');

module.exports = {
    async searchTerm(req, res){
        const searchTerm = req.query.name;
        const {userId} = req;

        if(!searchTerm) return res.status(404).json({status: 404, msg: 'Please enter a search term'});
        try {
            const users = await Users.findAll({
                where: {
                    [Op.not] : [{id: userId}],
                    [Op.or]: [
                        { name: { [Op.like]: `${searchTerm}%` } },
                        { username: { [Op.like]: `${searchTerm}%` } }
                    ]
                },
                limit: 15,
                include: [{
                    model: ImageProfile,
                    attributes: ['name_image', 'url_image']
                }],
                attributes: ['id', 'uuid', 'name', 'username', 'image_profile']
            });

            return res.status(200).json({status: 200, result: users});
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 500, message: 'Terjadi kesalahan dalam pencarian pengguna.' });
        }
    }
}