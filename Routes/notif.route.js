const express = require('express');
const { getNotifications } = require('../Controller/notif.controller.js');
const { sessionUser } = require('../middleware/session.js');

const router = express.Router();

router.get('/notif/get_all', sessionUser, getNotifications);

module.exports = router;