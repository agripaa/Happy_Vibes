const express = require('express');
const router = express.Router();

const { getAll } = require('../Controller/imageStories.controller.js');

router.get('/', getAll);

module.exports = router;