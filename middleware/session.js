const Users = require('../Models/usersData.model.js');

module.exports = {
    async sessionUser(req, res, next) {
        if(!req.session.userId) return res.status(489).json({status:489, msg: "Please Login your account"})
        const user = await Users.findOne({
            attribute: ['id', 'uuid', 'name', 'email', 'name_img', 'url', 'verificationCode'],
            where: {
                uuid: req.session.userId
            }
        })
        if(!user) return res.status(404).json({status:404, msg: "User not found"});
        if(user.verificationCode !== null) return res.status(401).json({status:401, msg: "User hasn't verified"})

        req.userId = user.id;
        req.user = user;
        return next();
    }
} 
