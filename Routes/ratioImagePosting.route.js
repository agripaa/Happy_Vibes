const express = require('express');
const router = express.Router();

const { getAll, createRatio } = require('../Controller/ratioImagePosting.controller.js');

router.get('/', getAll);
router.post('/add', createRatio);

module.exports = router