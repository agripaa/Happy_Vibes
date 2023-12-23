const express = require('express');
const {sessionUser} = require('../middleware/session.js')

const router = express.Router();

const { getUsers, createUser, updateUser, verifyUser, resendCode, getEmail, changePassword, deleteUser, getUserId } = require('../Controller/user.controller.js');
router.get('/users/random', sessionUser, getUsers);
router.get('/get/user/:uuid', sessionUser, getUserId);
router.post('/user/create', createUser);
router.patch('/forgot-pass/get_email', getEmail)
router.patch('/update-pass/:userId/:token', changePassword);
router.patch('/user/verify', verifyUser);
router.patch('/user/resend/otp', resendCode);
router.patch('/user/edit', sessionUser, updateUser);
router.delete('/delete/user', sessionUser, deleteUser);

module.exports = router;