const express = require('express');
const router = express.Router();

const { sendReport } = require('../Controller/reportposting.controller.js');
const { sessionUser } = require('../middleware/session.js');

router.post('/report/:postId/posting', sessionUser, sendReport);

module.exports = router;