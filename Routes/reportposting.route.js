const express = require('express');
const router = express.Router();

const { sessionUser } = require('../middleware/session.js');

const { sendReportPost } = require('../Controller/reportposting.controller.js');
router.post('/report/:postId/posting', sessionUser, sendReportPost);

module.exports = router;