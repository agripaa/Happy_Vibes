const express = require('express');
const sessionUser = require('../middleware/session.js')
const { getUsers, createUser, updateUser } = require('../Controller/user.controller.js');

const router = express.Router();

router.get('/users', sessionUser, getUsers);
router.post('/user/create', sessionUser, createUser);
router.patch('/user/:id/edit', sessionUser, updateUser)

module.exports = router;