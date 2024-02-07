const express = require('express');
const router = express.Router();

const { getAll } = require('../Controller/stories.controller.js');

router.get('/', getAll);

module.exports = router;