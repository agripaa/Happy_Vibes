const express = require('express');
const {sessionUser} = require('../middleware/session.js')

const router = express.Router();

const { getUsers, createUser, updateUser, verifyUser, resendCode, getEmail, changePassword, deleteUser, getUserId } = require('../Controller/user.controller.js');
router.get('/random', sessionUser, getUsers);
router.get('/get/:uuid', sessionUser, getUserId);
router.post('/create', createUser);
router.patch('/forgot-pass/get_email', getEmail)
router.patch('/update-pass/:userId/:token', changePassword);
router.patch('/verify', verifyUser);
router.patch('/resend/otp', resendCode);
router.patch('/edit', sessionUser, updateUser);
router.delete('/delete', sessionUser, deleteUser);

module.exports = router;