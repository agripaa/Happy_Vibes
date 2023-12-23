const express = require('express');
const { sessionUser } = require('../middleware/session.js');
const router = express.Router();

const {
    getBgUser,
    getBackgroundUserById,
    updateBackgroundUser,
} = require('../Controller/backgroundHandler.controller.js');
router.get('/background/user', sessionUser, getBgUser);
router.get('/background/:userId/user', sessionUser, getBackgroundUserById);
router.patch('/background/user/update', sessionUser, updateBackgroundUser);

module.exports = router;