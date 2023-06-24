const Users = require("../Models/usersData.model");
const { Op }  = require('sequelize');

module.exports = {
    async searchTerm(req, res){
        const searchTerm = req.query.name;
        try {
            const users = await Users.findAll({
                where: {
                    [Op.or]: [
                        { name: { [Op.like]: `${searchTerm}%` } },
                        { username: { [Op.like]: `${searchTerm}%` } }
                    ]
                }
            });
            if(!users) return res.status(404).json({status: 404, msg: "User not found!"})
            res.status(200).json({status: 200, result: users});
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Terjadi kesalahan dalam pencarian pengguna.' });
        }
    }
}