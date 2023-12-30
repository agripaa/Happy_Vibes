const express = require('express');
const router = express.Router();

const {addLike, getLike} = require('../Controller/like.controller.js');
const { sessionUser } = require('../middleware/session.js');

router.get('/:postId', sessionUser, getLike);
router.post('/', sessionUser, addLike);

module.exports = router;