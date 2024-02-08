const express = require('express');
const router = express.Router();

const { getAll } = require('../Controller/backgroundStories.controller.js');

router.get('/', getAll);

module.exports = router;