const express = require('express');
const router = express.Router();

const { sessionUser } = require('../middleware/session.js');

const { getReportPostCategory, getReportPostCategoryByName, sendReportPost } = require('../Controller/reportposting.controller.js');

router.get('/report/posting', getReportPostCategory);
router.get('/report/posting/name', getReportPostCategoryByName);
router.post('/report/upload/', sessionUser, sendReportPost);

module.exports = router;