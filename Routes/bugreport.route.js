const express = require('express');
const { sendReport } = require('../Controller/bugreport.controller.js');
const {sessionUser} = require('../middleware/session.js');

const router = express.Router();

router.post('/bugreport', sessionUser,sendReport);

module.exports = router; 