const express = require('express');
const { sessionUser } = require('../middleware/session.js');

const router = express.Router();

const { followUser, getFollowers } = require('../Controller/follows.controller.js');
router.get('/get_followers/', sessionUser, getFollowers);
router.post('/follow/:id/user/', sessionUser, followUser);
module.exports = router;