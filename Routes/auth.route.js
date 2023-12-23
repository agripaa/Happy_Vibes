const express = require('express');
const router = express.Router();

const { Profile, Login, LogOut } = require('../Controller/auth.controller.js');

router.get('/auth/profile', Profile);
router.post('/auth/login', Login);
router.delete('/auth/logOut', LogOut);

module.exports = router;