const express = require('express');
const {sessionUser} = require('../middleware/session.js')

const router = express.Router();

const { getEmail, changePassword } = require('../Controller/forgotPassword.controller.js')

router.patch('/get_email', getEmail)
router.patch('/update/:userId/:token', changePassword);

module.exports = router;