const express = require('express');
const router = express.Router();

const {addLike, getLike} = require('../Controller/like.controller.js');
const { sessionUser } = require('../middleware/session.js');

router.get('/like/:postId', sessionUser, getLike);
router.post('/like', sessionUser, addLike);

module.exports = router;