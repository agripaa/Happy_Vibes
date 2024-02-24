const express = require('express');
const {sessionUser} = require('../middleware/session.js')

const router = express.Router();

const { getUsers, createUser, updateUser, deleteUser, getUserId } = require('../Controller/user.controller.js');

router.get('/random', sessionUser, getUsers);
router.get('/get/:uuid', sessionUser, getUserId);
router.post('/create', createUser);
router.patch('/edit', sessionUser, updateUser);
router.delete('/delete', sessionUser, deleteUser);

module.exports = router;