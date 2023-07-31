const express = require('express');
const { followUser, getFollowers } = require('../Controller/follows.controller.js');
const { sessionUser } = require('../middleware/session.js');

const router = express.Router();

router.get('/get_followers/', sessionUser, getFollowers);
router.post('/follow/:id/user/', sessionUser, followUser);
module.exports = router;