const express = require('express');
const router = express.Router();

const { sessionUser } = require('../middleware/session.js');

const { getReportPosting, sendReportPost, deleteReportPostingData } = require('../Controller/reportposting.controller.js');

router.get('/', getReportPosting);
router.post('/', sessionUser, sendReportPost);
router.delete('/:id', deleteReportPostingData);

module.exports = router;