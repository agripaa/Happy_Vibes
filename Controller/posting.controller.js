const Posting = require('../Models/postingData.model.js');
const log = require('../utils/log.js');
const Users = require('../Models/usersData.model.js');
const Comment = require('../Models/commentsData.model.js');

const attributesUser = ['name', 'url', 'name_img'];

const getAllContent = async (req,res) => {
    try {
        const posting = await Posting.findAll({
            include: 
            [
                {
                    model: Users,
                    attributes: attributesUser
                },
                {
                    model: Comment,
                    attributes: ['comment']
                }
            ]
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
            include: [
                {
                    model: Users,
                    attributes: attributesUser
                },
                {
                    model: Comment,
                    attributes: ['comment']
                }
            ]
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
        const newPosting = req.body
        const image = req.file.path
        log.info(req.userId)
        try {
            await Posting.create({
                name_img: newPosting.name_img,
                url: image,
                desc: newPosting.desc,
                like: newPosting.like,
                userId: req.userId
            });

            return res.status(200).json({ status: 200, msg: 'Posting created successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 500, msg: 'Internal server error' });
        }
    };


module.exports = {getAllContent , getContentById , createNewPosting }