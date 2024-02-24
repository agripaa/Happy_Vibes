const express = require('express');
const router = express.Router();

const { getAll } = require('../Controller/textStories.controller.js');

router.get('/', getAll);

module.exports = router;