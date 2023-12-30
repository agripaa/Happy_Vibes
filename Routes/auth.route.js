const express = require('express');
const router = express.Router();
const { Profile, Login, LogOut } = require('../Controller/auth.controller.js');

router.get('/profile', Profile);
router.post('/login', Login);
router.delete('/logOut', LogOut);

module.exports = router;