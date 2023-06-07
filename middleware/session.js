const Users = require('../Models/usersData.model.js');
const log = require("../utils/log.js");

module.exports = {
    async sessionUser(req, res, next) {
        if(!req.session.userId) return res.status(404).json({status:404, msg: "Please Login your account"})
        const user = await Users.findOne({
            attribute: ['uuid', 'name', 'email', 'name_img', 'url'],
            where: {
                uuid: req.session.userId
            }
        })
        if(!user) return res.status(404).json({status:404, msg: "User not found"});
    
        req.userId = user.id;
        log.info(req.userId)
        return next();
    }
}