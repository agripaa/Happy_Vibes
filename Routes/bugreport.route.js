const express = require('express');
const {sessionUser} = require('../middleware/session.js');

const router = express.Router();

const { sendReport, getReport } = require('../Controller/bugreport.controller.js');
router.get('/bugreport/get_report', sessionUser, getReport)
router.post('/bugreport', sessionUser,sendReport);

module.exports = router; 