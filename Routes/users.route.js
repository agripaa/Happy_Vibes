const express = require('express');
const { sessionUser } = require('../middleware/session');
const {
  getUsers,
  createUser,
  updateUser,
  verifyUser,
  resendCode,
} = require('../Controller/user.controller');

const router = express.Router();

router.get('/users', sessionUser, getUsers);
router.post('/user/create', createUser);
router.patch('/user/verify', verifyUser);
router.patch('/user/resend/otp', resendCode);
router.patch('/user/:id/edit', sessionUser, updateUser);

module.exports = router;
