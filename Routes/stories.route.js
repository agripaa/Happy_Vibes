const express = require('express');
const router = express.Router();

const { getAll, uploadStories } = require('../Controller/stories.controller.js');
const { sessionUser } = require('../middleware/session.js');

router.get('/', getAll);
router.post('/new/upload/', uploadStories)

module.exports = router;