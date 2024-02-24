const Like = require('../Models/likeData.model.js');
const Posting = require('../Models/postingData.model.js');
const db = require('../Config/database.js');
const Users = require('../Models/usersData.model.js');
const moment = require('moment');
const path = require('path');
const ImagePosting = require('../Models/imagePostingData.model.js');
const RatioImage = require('../Models/ratioImagePostingData.model.js');
const ImageProfile = require('../Models/imageProfileData.model.js');

const attributesUser = ['id', 'uuid', 'name', 'username', 'image_profile'];
const subDataInclude = [
  {
    model: Users,
    attributes: attributesUser,
    include: [{
      model: ImageProfile,
      attributes: ['name_image', 'url_image']
    }]
  },
  {
    model: Like,
    as: 'likes',
    attributes: ['userId'],
  },
  {
    model: ImagePosting,
    attributes: ['name_img', 'url', 'ratio_id'],
    include: [{
      model: RatioImage,
      attributes: ['ratio']
    }]
  }
]

const getAllContent = async (req, res) => {
    try {
      const postings = await Posting.findAll({
        include: subDataInclude,
        limit: 100,
        order: db.random()
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
      console.error(error);
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
        include: subDataInclude,
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
      console.error(err);
      return res.status(500).json({ status: 500, msg: 'Internal server error' });
    }
  }

  const getAllPostUserById = async(req, res) => {
    try {
      const postings = await Posting.findAll({
        where: {userId: req.params.id},
        include: subDataInclude,
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
      console.error(err);
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
            where: {id : req.params.id},
            include: subDataInclude
          });

          if(!posting) return res.status(404).json({"msg" : "Data tidak ditemukan"})

        res.status(200).json({
            status: 200, 
            result: posting
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ status: 500, msg: 'Internal server error' });
    }
}

const createNewPosting = async (req, res) => {
    const files = req.files;
    const { desc, like, ratio } = req.body; 

    if(files){
      const file = files.file;
      const size = file.data.length;
      const extend = path.extname(file.name);
      const name_img = file.md5 + extend
      const url = `/postings/${name_img}`;

      if(size > 5000000) return res.status(422).json({status: 422, msg: "Images must be less than 5MB"})
      file.mv(`./public/postings/${name_img}`, async(err) => {
          if(err) return res.status(500).json({status: 500, msg: 'Internal server error', image: "image hasn't been uploaded!" ,error: err});
          
          try {
              const ratio_image = await RatioImage.create({ratio})

              const image_posting = await ImagePosting.create({
                url,
                name_img,
                ratio_id: ratio_image.id
              });

              const posting = await Posting.create({
                  desc: desc,
                  like: like,
                  liked: false,
                  image_posting_id: image_posting.id,
                  userId: req.userId
              });
              const createdAt = moment(posting.createdAt).fromNow();
              return res.status(200).json({ status: 200, msg: 'Posting created successfully', createdAt });
          } catch (error) {
              console.error(error);
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
        console.error(error);
        return res.status(500).json({ status: 500, msg: 'Internal server error' });
    }
  }
}

const getHotPost = async (req, res) => {
    try {
        const posting = await Posting.findAll({
            order: [['like', 'DESC']],
            limit: 50,
            include: subDataInclude,
        });
        res.status(200).json({
            status: "200", 
            result: posting
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ status: 500, msg: 'Internal server error' });
    }
} 

const deletePosting = async (req, res) => {
    const {postUUID}  = req.params;
    const {userId} = req;
  console.log(postUUID)
  try {
    const post = await Posting.findOne({
        include: [{
          model: Users,
          where: {id: userId} 
      }],
        where: { uuid: postUUID },
    });

    if (!post) {
      return res.status(404).json({ status: 404, msg: 'Postingan tidak ditemukan.' });
    }
    await post.destroy();

    return res.status(200).json({ status: 200, msg: 'Postingan berhasil dihapus.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Terjadi kesalahan saat menghapus postingan.' });
  }
};

module.exports = {getAllContent, getPostUser, getContentById, createNewPosting, getAllPostUserById, getHotPost, deletePosting }