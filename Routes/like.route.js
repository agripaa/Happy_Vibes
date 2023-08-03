const express = require('express');
const router = express.Router();

const {addLike, removeLike} = require('../Controller/like.controller.js');
const { sessionUser } = require('../middleware/session.js');

router.post('/like', sessionUser, addLike);
router.post('/like', sessionUser, removeLike);

module.exports = router;