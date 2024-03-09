const express = require('express');
const router = express.Router();

const { getAll, createFontCategory } = require('../Controller/fontStories.controller.js');

router.get('/', getAll);
router.post('/create', createFontCategory);

module.exports = router;