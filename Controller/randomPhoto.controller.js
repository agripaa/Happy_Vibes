const RandomPhoto = require('../Models/randomPhotos.models');
const path = require('path');

module.exports = {
    async getRandom (req, res){
        try {
            const count = await RandomPhoto.count();
            const randomIndex = Math.floor(Math.random() * count);
            const randomPhoto = await RandomPhoto.findOne({
                offset: randomIndex,
            });
            return res.status(200).json({ randomPhoto });
        } catch (error) {
            console.error(err);
            res.status(500).json({status: 500, msg: err.message});
            return false;
        }
    },
    async postPhoto(req, res){
        const { files } = req;

        const file = files.file;
        const size = file.data.length;
        const ext = path.extname(file.name);
        const allowedTypePhotos = ['.jpg', '.png', '.jpeg', '.bmp', '.heif', '.psd', '.raw', '.gif']
        
        if(!allowedTypePhotos.includes(ext.toLowerCase())) return res.status(422).json({status: 422, msg: "Invalid image"})
        if(size > 5000000) return res.status(422).json({status: 422, msg: "Images must be less than 5MB"})
        
        const name_img = `user_${file.md5}${ext}`
        const url = `${req.protocol}://${req.get("host")}/users/${name_img}`;

        file.mv(`./public/random-pict/${name_img}`, async(err) => {
            if(err) return res.status(500).json({status: 500, msg: 'Internal server error', error: err});
        })

        try {
            await RandomPhoto.create({name_img, url});
            return res.status(200).json({status: 200, msg: 'successfully created'});
        } catch (err) {
            console.error(err);
            res.status(500).json({status: 500, msg: err.message});
            return false;
        }
    }
}