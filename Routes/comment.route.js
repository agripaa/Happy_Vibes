const express = require('express');
const sessionUser = require('../middleware/session.js');
const { getComments, uploadComment } = require('../Controller/comment.controller.js');


const router = express.Router();

router.get('/comment/all_comment', sessionUser, getComments);
router.post('/comment/upload', sessionUser , uploadComment);

module.exports = router;