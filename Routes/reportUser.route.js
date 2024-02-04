const express = require('express');
const router = express.Router();

const { getAll } = require('../Controller/reportUser.controller.js');

router.get('/', getAll);

module.exports = router;