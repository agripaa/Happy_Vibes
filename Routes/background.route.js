const express = require('express');
const {
    getBgUser,
    getBackgroundUserById,
    updateBackgroundUser
} = require('../Controller/backgroundHandler.controller.js');
const { sessionUser } = require('../middleware/session.js');
const router = express.Router();

router.get('/background/user', sessionUser, getBgUser);
router.get('/background/:id/user', sessionUser, getBackgroundUserById);
router.post('/background/user/update', sessionUser, updateBackgroundUser);

module.exports = router;