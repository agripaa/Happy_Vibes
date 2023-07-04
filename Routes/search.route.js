const express = require('express');
const { searchTerm } = require('../Controller/search.controller.js');

const router = express.Router();

router.get('/users/search', searchTerm);

module.exports = router;