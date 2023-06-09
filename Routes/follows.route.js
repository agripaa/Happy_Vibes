const express = require('express');
const { followUser, getFollowers, unfollowUser } = require('../Controller/follows.controller.js');
const { sessionUser } = require('../middleware/session.js');

const router = express.Router();

router.get('/get_followers/', sessionUser, getFollowers);
router.post('/follow/:id/user/', sessionUser, followUser);
router.post('/unfollow/:id/user/', sessionUser, unfollowUser);

module.exports = router;