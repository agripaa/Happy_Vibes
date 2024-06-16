const express = require('express');
const router = express.Router();

const { sessionUser } = require('../middleware/session.js');

const { getReportPostCategory, getReportPostCategoryByName, sendReportPost } = require('../Controller/reportposting.controller.js');

router.get('/report/posting', getReportPostCategory);
router.get('/report/post/:category', getReportPostCategoryByName);
router.post('/:postId/posting/:category', sessionUser, sendReportPost);

module.exports = router;