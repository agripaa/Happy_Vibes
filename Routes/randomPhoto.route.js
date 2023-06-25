const express = require('express');
const Routes = express.Router();
const { 
    getRandom,
    postPhoto
} = require('../Controller/randomPhoto.controller.js');


Routes.get('/random_photo', getRandom);
Routes.post('/random_photo/upload', postPhoto);

module.exports = Routes