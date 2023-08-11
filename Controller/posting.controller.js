const Like = require('../Models/likeData.model.js');
const Posting = require('../Models/postingData.model.js');
const Users = require('../Models/usersData.model.js');
const log = require('../utils/log.js');
const moment = require('moment');
const path = require('path');

const attributesUser = ['id', 'uuid', 'name', 'username', 'url', 'name_img'];

const getAllContent = async (req, res) => {
    try {
      const totalPostings = await Posting.count(); 
      const randomIndices = generateRandomIndices(totalPostings, 100);

      const postings = await Posting.findAll({
        where: {
          id: randomIndices
        },
        include: [
          {
            model: Users,
            attributes: attributesUser,
          },
          {
            model: Like,
            as: 'likes',
            attributes: ['userId'],
          },
        ],
      });

      const formattedPostings = postings.map((posting) => {
        const createdAt = moment(posting.createdAt).fromNow();
        return {
          ...posting.toJSON(),
          createdAt: createdAt,
        };
      });

      res.status(200).json({
        status: 200,
        result: formattedPostings,
      });
    } catch (error) {
      log.error(error);
      return res.status(500).json({ status: 500, msg: 'Internal server error' });
    }
};

function generateRandomIndices(totalItems, count) {
  const indices = [];
  while (indices.length < count) {
    const randomIndex = Math.floor(Math.random() * totalItems) + 1;
    if (!indices.includes(randomIndex)) {
      indices.push(randomIndex);
    }
  }
  return indices;
}

  const getPostUser = async(req, res) => {
    try {
      const postings = await Posting.findAll({
        where: {userId: req.userId},
        include: [{
          model: Users,
          attributes: attributesUser
        },
        {
          model: Like,
          as: 'likes',
          attributes: ['userId']
        }]
      })
      if(!postings) return res.status(404).json({status: 404, msg: "user hasn't posted anything"})

      const shuffledPostings = shuffleArray(postings);
  
      const formattedPostings = shuffledPostings.map((posting) => {
        const createdAt = moment(posting.createdAt).fromNow();
        return {
          ...posting.toJSON(),
          createdAt: createdAt
        };
      });
      res.status(200).json({status: 200, result: formattedPostings})
    } catch (err) {
      log.error(err);
      return res.status(500).json({ status: 500, msg: 'Internal server error' });
    }
  }

  const getAllPostUserById = async(req, res) => {
    try {
      const postings = await Posting.findAll({
        where: {userId: req.params.id},
        include: [{
          model: Users,
          attributes: attributesUser
        },
        {
          model: Like,
          as: 'likes',
          attributes: ['userId']
        }]
      })
      if(!postings) return res.status(404).json({status: 404, msg: "user hasn't posted anything"})

      const shuffledPostings = shuffleArray(postings);
  
      const formattedPostings = shuffledPostings.map((posting) => {
        const createdAt = moment(posting.createdAt).fromNow();
        return {
          ...posting.toJSON(),
          createdAt: createdAt
        };
      });
      res.status(200).json({status: 200, result: formattedPostings})
    } catch (err) {
      log.error(err);
      return res.status(500).json({ status: 500, msg: 'Internal server error' });
    }
  }
  
  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }
const getContentById = async (req,res) => {
    try {
        const posting = await Posting.findOne({
            where: {
              id : req.params.id
            },
            include: [{
                    model: Users,
                    attributes: attributesUser
                },
                {
                  model: Like,
                  as: 'likes',
                  attributes: ['userId']
                }]
          });

          if(!posting) return res.status(404).json({"msg" : "Data tidak ditemukan"})

        res.status(200).json({
            status: 200, 
            result: posting
        })
    } catch (error) {
        log.error(error)
        return res.status(500).json({ status: 500, msg: 'Internal server error' });
    }
}

const createNewPosting = async (req, res) => {
    const files = req.files;
    const { desc, like } = req.body; 

    if(files){
      const file = files.file;
      const size = file.data.length;
      const extend = path.extname(file.name);
      const name_img = file.md5 + extend
      const url = `${req.protocol}://${req.get("host")}/postings/${name_img}`;

      if(size > 5000000) return res.status(422).json({status: 422, msg: "Images must be less than 5MB"})
      file.mv(`./public/postings/${name_img}`, async(err) => {
          if(err) return res.status(500).json({status: 500, msg: 'Internal server error', error: err});
          
          try {
              const posting = await Posting.create({
                  name_img: name_img,
                  url: url,
                  desc: desc,
                  like: like,
                  liked: false,
                  userId: req.userId
              });
              const createdAt = moment(posting.createdAt).fromNow();
              return res.status(200).json({ status: 200, msg: 'Posting created successfully', createdAt });
          } catch (error) {
              log.error(error);
              return res.status(500).json({ status: 500, msg: 'Internal server error' });
          }
      })
    }else{
      try {
        const posting = await Posting.create({
            name_img: null,
            url: null,
            desc: desc,
            like: like,
            liked: false,
            userId: req.userId
        });
        const createdAt = moment(posting.createdAt).fromNow();
        return res.status(200).json({ status: 200, msg: 'Posting created successfully', createdAt });
    } catch (error) {
        log.error(error);
        return res.status(500).json({ status: 500, msg: 'Internal server error' });
    }
  }
}

const updateLike = async (req, res) => {
    const { postId } = req.params;
    const { liked } = req.body;
  
    try {
        const posting = await Posting.findByPk(postId);
        if (!posting) return res.status(404).json({ status: 404, msg: 'Posting not found' });
  
        let likeCount = posting.like;
        if (liked) {
            likeCount++;
        } else {
            likeCount--;
        }

        await posting.update({ like: likeCount });
        return res.status(200).json({status: 200, result: posting});
    } catch (error) {
        log.error(error);
        return res.status(500).json({ status: 500, msg: 'Internal server error', err: err.message });
    }
  }
  

const getHotPost = async (req, res) => {
    try {
        const posting = await Posting.findAll({
            order: [['like', 'DESC']],
            limit: 50,
            include: [{
                model: Users,
                attributes: attributesUser
            },
            {
              model: Like,
              as: 'likes',
              attributes: ['userId']
            }]
        });
        res.status(200).json({
            status: "200", 
            result: posting
        })
    } catch (error) {
        log.error(error)
        return res.status(500).json({ status: 500, msg: 'Internal server error' });
    }
} 

const deletePosting = async (req, res) => {
    const {postId}  = req.params;
    const {userId} = req;

  try {
    const post = await Posting.findOne({
        include: [{
          model: Users,
          where: {id: userId}
      }],
        where: { uuid: postId },
    });

    if (!post) {
      return res.status(404).json({ status: 404, msg: 'Postingan tidak ditemukan.' });
    }
    await post.destroy();

    return res.status(200).json({ status: 200, msg: 'Postingan berhasil dihapus.' });
  } catch (error) {
    log.error(error);
    return res.status(500).json({ error: 'Terjadi kesalahan saat menghapus postingan.' });
  }
};

module.exports = {getAllContent, getPostUser, getContentById, createNewPosting, getAllPostUserById, updateLike, getHotPost, deletePosting }