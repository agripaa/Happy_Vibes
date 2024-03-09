const express = require('express');
const router = express.Router();

const { getAll, createBackgorundStories } = require('../Controller/backgroundStories.controller.js');

router.get('/', getAll);
router.post('/create', createBackgorundStories);

module.exports = router;