const express = require('express');
const router = express.Router();

const { getAll } = require('../Controller/bookmarkPosting.controller');

router.get('/', getAll);

module.exports = router;