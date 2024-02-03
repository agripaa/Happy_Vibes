const express = require('express');
const router = express.Router();

const { verifyUser, resendCode } = require('../Controller/otp.controller.js');

router.patch('/verify', verifyUser);
router.patch('/resend/otp', resendCode);

module.exports = router;