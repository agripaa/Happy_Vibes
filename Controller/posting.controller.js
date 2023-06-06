const Posting = require('../Models/postingData.model.js');
const log = require('../utils/log.js');
const Users = require('../Models/usersData.model.js');
const path = require('path');
const Comment = require('../Models/commentsData.model.js');

const attributesUser = ['name', 'url', 'name_img'];

const getAllContent = async (req,res) => {
    try {
        const posting = await Posting.findAll({
            include: [{
                model: Users,
                attributes: attributesUser
            }]
        });
        res.status(200).json({
            status: "200", 
            result: posting
        })
    } catch (error) {
        log.error(error)
    }
}
const getContentById = async (req,res) => {
    try {
        
        const posting = await Posting.findOne({
            where: {
              uuid : req.params.id
            },
            include: [{
                    model: Users,
                    attributes: attributesUser
                }]
          });

          if(!posting) {
            res.status(404).json({
               "msg" : "Data tidak ditemukan"})
          }
        res.status(200).json({
            status: "200", 
            posting
        })
    } catch (error) {
        log.error(error)
    }
}

const createNewPosting = async (req, res) => {
        const files = req.files;
        const { desc, like, password, confPassword } = req.body;

        if(password !== confPassword) return res.status(400).json({status: 400, msg: 'Password and Confirm Password do not match'})

        if(files === null) return res.status(400).json({status: 400, msg: 'No file uploaded'})
        const file = files.image;
        const size = file.data.length;
        const extend = path.extname(file.name);
        const name_img = file.md5 + extend
        const url = `${req.protocol}://${req.get("host")}/users/${name_img}`;
        const allowedTypePhotos = ['.jpg', '.png', '.jpeg', '.bmp', '.heif', '.psd', '.raw', '.gif']

        if(!allowedTypePhotos.includes(extend.toLowerCase())) return res.status(422).json({status: 422, msg: "Invalid image"})
        if(size > 5000000) return res.status(422).json({status: 422, msg: "Images must be less than 5MB"})

        file.mv(`./public/postings/${name_img}`, async(err) => {
            if(err) return res.status(500).json({status: 500, msg: 'Internal server error', error: err});
 
            try {
                const image = req.file
                console.log(image)
                await Posting.create({
                    name_img: name_img,
                    url: url,
                    desc: desc,
                    like: like,
                    userId: req.userId
                });
    
                return res.status(200).json({ status: 200, msg: 'Posting created successfully' });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ status: 500, msg: 'Internal server error' });
            }
        })
}


module.exports = {getAllContent , getContentById , createNewPosting }