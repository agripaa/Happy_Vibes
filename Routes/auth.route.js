const express = require('express');
const { Profile, Login, LogOut } = require('../Controller/auth.controller');

const router = express.Router();

router.get('/auth/profile', Profile);
router.post('/auth/login', Login);
router.delete('/auth/logOut', LogOut);

module.exports = router;
