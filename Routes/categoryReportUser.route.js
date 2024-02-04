const express = require('express');
const router = express.Router();

const { getAll } = require('../Controller/categoryAccountReport.controller.js');

router.get('/', getAll);

module.exports = router;