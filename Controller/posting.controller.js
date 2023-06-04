const Posting = require('../Models/postingData.model.js');
const log = require('../utils/log.js');
const Users = require('../Models/usersData.model.js');
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
        const { name_img, desc, like } = req.body
        const image = req.file.path
        try {
            await Posting.create({
                name_img: name_img,
                url: image,
                desc: desc,
                like: like,
                userId: req.userId
            });

            return res.status(200).json({ status: 200, msg: 'Posting created successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 500, msg: 'Internal server error' });
        }
    };


module.exports = {getAllContent , getContentById , createNewPosting }