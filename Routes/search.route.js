const express = require('express');
const {sessionUser} = require('../middleware/session.js')

const router = express.Router();

const { searchTerm } = require('../Controller/search.controller.js');
router.get('/user/search', sessionUser, searchTerm);

module.exports = router;