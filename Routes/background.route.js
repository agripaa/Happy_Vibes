const express = require('express');
const { sessionUser } = require('../middleware/session.js');
const router = express.Router();

const {
    getBgUser,
    getBackgroundUserById,
    updateBackgroundUser,
} = require('../Controller/backgroundHandler.controller.js');
router.get('/user', sessionUser, getBgUser);
router.get('/:userId/user', sessionUser, getBackgroundUserById);
router.patch('/user/update', sessionUser, updateBackgroundUser);

module.exports = router;