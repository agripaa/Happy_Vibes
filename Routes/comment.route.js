const express = require('express');
const {sessionUser} = require('../middleware/session.js');
const { getComments, uploadComment } = require('../Controller/comment.controller.js');


const router = express.Router();

router.get('/posting/:id/all_comment', sessionUser, getComments);
router.post('/posting/:id/comment', sessionUser , uploadComment);

module.exports = router;                                 