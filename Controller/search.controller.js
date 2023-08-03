const Users = require("../Models/usersData.model");
const { Op }  = require('sequelize');

module.exports = {
    async searchTerm(req, res){
        const searchTerm = req.query.name;
        const {userId} = req;
        // if(!searchTerm) return res.status(404).json({status: 404, msg: 'Please enter a search term'});
        try {
            const users = await Users.findAll({
                where: {
                    [Op.not] : [{id: userId}],
                    [Op.or]: [
                        { name: { [Op.like]: `${searchTerm}%` } },
                        { username: { [Op.like]: `${searchTerm}%` } }
                    ]
                },
                limit: 15
            });
            // if(!users) return res.status(404).json({status: 404, msg: "User not found!"})
            return res.status(200).json({status: 200, result: users});
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Terjadi kesalahan dalam pencarian pengguna.' });
        }
    }
}