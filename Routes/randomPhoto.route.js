const express = require('express');
const Routes = express.Router();
const { 
    postPhoto
} = require('../Controller/randomPhoto.controller.js');

Routes.post('/random_photo/upload', postPhoto);

module.exports = Routes