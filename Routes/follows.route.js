const express = require('express');
const { sessionUser } = require('../middleware/session.js');

const router = express.Router();

const { getFollowsCount, followUser, getFollowers, getFollowing, getMutualFollows } = require('../Controller/follows.controller.js');

router.get('/get_followers/', sessionUser, getFollowsCount);
router.get('/list/followers', sessionUser, getFollowers);
router.get('/list/following', sessionUser, getFollowing);
router.get('/list/mutual', sessionUser, getMutualFollows);
router.post('/:id/user/', sessionUser, followUser);

module.exports = router;