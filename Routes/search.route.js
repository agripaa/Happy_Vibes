const express = require('express');
const { searchTerm } = require('../Controller/search.controller.js');
const {sessionUser} = require('../middleware/session.js')

const router = express.Router();

router.get('/user/search', sessionUser, searchTerm);

module.exports = router;