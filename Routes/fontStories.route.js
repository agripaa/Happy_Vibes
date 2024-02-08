const express = require('express');
const router = express.Router();

const { getAll } = require('../Controller/fontStories.controller.js');

router.get('/', getAll);

module.exports = router;