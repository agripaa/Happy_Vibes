const express = require('express');
const { sessionUser } = require('../middleware/session.js');

const router = express.Router();

const { followUser, getFollowsCount, getFollowers, getFollowing } = require('../Controller/follows.controller.js');
router.get('/get_followers/', sessionUser, getFollowsCount);
router.get('/get/list/followers', sessionUser, getFollowers);
router.get('/get/list/following', sessionUser, getFollowing);
router.post('/:id/user/', sessionUser, followUser);
module.exports = router;