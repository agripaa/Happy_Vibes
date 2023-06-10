const Users = require("../Models/usersData.model.js");
const Follows = require("../Models/followsData.model.js");
const argon2 = require('argon2');
const path = require('path');
const fs = require('fs');
const log = require("../utils/log.js");

module.exports = {
    async getUsers(_, res){
        try{
            const users = await Users.findAll();
            res.status(200).json({
                status: "success", 
                result: users
            })
        } catch(err){
            log.error("error: ", err);
            res.status(500).json({status: "error", msg: "internal server error", error: err})
        }
    },
    async createUser(req, res) {
        const files = req.files;
        const { name, email, password, confPassword } = req.body;

        if(password !== confPassword) return res.status(400).json({status: 400, msg: 'Password and Confirm Password do not match'})
        const hashPassword = await argon2.hash(password);

        if(files === null) return res.status(400).json({status: 400, msg: 'No file uploaded'})
        const file = files.file;
        const size = file.data.length;
        const extend = path.extname(file.name);
        const name_img = file.md5 + extend
        const url = `${req.protocol}://${req.get("host")}/users/${name_img}`;
        const allowedTypePhotos = ['.jpg', '.png', '.jpeg', '.bmp', '.heif', '.psd', '.raw', '.gif']

        if(!allowedTypePhotos.includes(extend.toLowerCase())) return res.status(422).json({status: 422, msg: "Invalid image"})
        if(size > 5000000) return res.status(422).json({status: 422, msg: "Images must be less than 5MB"})

        file.mv(`./public/users/${name_img}`, async(err) => {
            if(err) return res.status(500).json({status: 500, msg: 'Internal server error', error: err});
 
            try {
                await Users.create({
                    name: name,
                    email: email, 
                    password: hashPassword, 
                    name_img: name_img, 
                    url: url
                });
                res.status(200).json({status: 200, msg: 'data user created successfully'});
            } catch (err) {
                log.error(err);
                res.status(500).json({status: 500, msg: "Internal server Error"});
                return false;
            }
        })
    },
    async updateUser(req, res){
        let name_img, hashPassword;
        const files = req.files;
        const { name, email, password, confPassword } = req.body;
    
        try {
            const user = await Users.findOne({where: { uuid: req.params.id }});
            if (!user) return res.status(404).json({ status: 404, msg: 'User not found' });

            if (password !== confPassword) return res.status(400).json({ status: 400, msg: 'Password and confirm password do not match' });

            if (password === null || password === '') {
                hashPassword = user.password;
            } else {
                hashPassword = await argon2.hash(password);
            }

            if (files === null) {
                name_img = user.name_img;
            } else {
                name_img = user.name_img;
                fs.unlinkSync(`./public/users/${name_img}`, (err) => {
                    if (err) return res.status(500).json({status: 500, msg: "Internal server error", error: err})
                })
                const file = files.file;
                const size = file.data.length;
                const extend = path.extname(file.name);
                name_img = file.md5 + extend;
                const allowedTypePhotos = ['.jpg', '.png', '.jpeg', '.bmp', '.heif', '.psd', '.raw', '.gif']

                if (!allowedTypePhotos.includes(extend.toLowerCase())) return res.status(422).json({ msg: 'Invalid image' });
                if (size > 5000000) return res.status(422).json({ msg: 'Images must be less than 5MB' });

                file.mv(`./public/users/${name_img}`, async (err) => {
                    if (err) {
                    return res.status(500).json({ status: 500, msg: 'Internal server error', err: err.message });
                    }
                });
            }

            const url = `${req.protocol}://${req.get('host')}/users/${name_img}`;
            await Users.update( {
                name: name,
                email: email,
                password: hashPassword,
                name_img: name_img,
                url: url
            },{
                where: { id: user.id },
            });

            res.status(200).json({ status: 200, msg: 'User updated successfully' });
        } catch (err) {
            log.error(err);
            res.status(500).json({ status: 500, msg: 'Internal server error', err: err.message });
        }
    }
}