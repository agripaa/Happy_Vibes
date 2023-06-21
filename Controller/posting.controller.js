const path = require('path');
const Posting = require('../Models/postingData.model');
const log = require('../utils/log');
const Users = require('../Models/usersData.model');

const attributesUser = ['name', 'url', 'name_img'];

const getAllContent = async (_, res) => {
  try {
    const posting = await Posting.findAll({
      include: [
        {
          model: Users,
          attributes: attributesUser,
        },
      ],
    });
    res.status(200).json({
      status: '200',
      result: posting,
    });
  } catch (error) {
    log.error(error);
  }
};
const getContentById = async (req, res) => {
  try {
    const posting = await Posting.findOne({
      where: {
        uuid: req.params.id,
      },
      include: [
        {
          model: Users,
          attributes: attributesUser,
        },
      ],
    });

    if (!posting) {
      res.status(404).json({
        msg: 'Data tidak ditemukan',
      });
    }
    res.status(200).json({
      status: '200',
      posting,
    });
  } catch (error) {
    log.error(error);
  }
};

const createNewPosting = async (req, res) => {
  const { files } = req;
  const { desc, like } = req.body;

  if (files === null) {
    return res.status(400).json({ status: 400, msg: 'No file uploaded' });
  }

  const { file } = files;
  const size = file.data.length;
  const extend = path.extname(file.name);
  const nameImage = file.md5 + extend;
  const url = `${req.protocol}://${req.get('host')}/users/${nameImage}`;
  const allowedTypePhotos = [
    '.jpg',
    '.png',
    '.jpeg',
    '.bmp',
    '.heif',
    '.psd',
    '.raw',
    '.gif',
  ];

  if (!allowedTypePhotos.includes(extend.toLowerCase())) {
    return res.status(422).json({ status: 422, msg: 'Invalid image' });
  }
  if (size > 5000000) {
    return res
      .status(422)
      .json({ status: 422, msg: 'Images must be less than 5MB' });
  }

  file.mv(`./public/postings/${nameImage}`, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ status: 500, msg: 'Internal server error', error: err });
    }
  });
  try {
    await Posting.create({
      name_img: nameImage,
      url,
      desc,
      like,
      userId: req.userId,
    });

    return res
      .status(200)
      .json({ status: 200, msg: 'Posting created successfully' });
  } catch (error) {
    return res.status(500).json({ status: 500, msg: 'Internal server error' });
  }
};

const getHotPost = async (req, res) => {
  try {
    const posting = await Posting.findAll({
      order: [['like', 'DESC']],
      limit: 15,
      include: [
        {
          model: Users,
          attributes: attributesUser,
        },
      ],
    });
    res.status(200).json({
      status: '200',
      result: posting,
    });
  } catch (error) {
    log.error(error);
  }
};

const deletePosting = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.session;

  try {
    const post = await Posting.findOne({
      include: [
        {
          model: Users,
          where: { uuid: userId },
        },
      ],
      where: { uuid: postId },
    });

    if (!post) {
      return res.status(404).json({ error: 'Postingan tidak ditemukan.' });
    }

    await post.destroy();

    return res.status(200).json({ message: 'Postingan berhasil dihapus.' });
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Terjadi kesalahan saat menghapus postingan.' });
  }
};

module.exports = {
  getAllContent,
  getContentById,
  createNewPosting,
  getHotPost,
  deletePosting,
};
