const express = require('express');
const { sessionUser } = require('../middleware/session.js');

const router = express.Router();
const { getNotifications } = require('../Controller/notif.controller.js');

router.get('/notif/get_all', sessionUser, getNotifications);

module.exports = router;