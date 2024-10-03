const express = require('express');
const router = express.Router();

const { getAll, uploadStories, getStoryUser } = require('../Controller/stories.controller.js');
const { sessionUser } = require('../middleware/session.js');

router.get('/', getAll);
router.get('/get-story/user', sessionUser, getStoryUser);
router.post('/new/upload/', sessionUser, uploadStories);

module.exports = router;