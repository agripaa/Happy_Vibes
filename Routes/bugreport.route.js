const express = require('express');
const {sessionUser} = require('../middleware/session.js');

const router = express.Router();

const { sendReport, getReport } = require('../Controller/bugreport.controller.js');
router.get('/get_report', sessionUser, getReport)
router.post('/send_report', sessionUser,sendReport);

module.exports = router; 