const express = require('express');
const Routes = express.Router();
// const upload = require('../Controller/uploadfile.js')
const {sessionUser} = require('../middleware/session.js');
const { 
    getAllContent,
    getContentById,
    createNewPosting,
} = require('../Controller/posting.controller.js');

Routes.get('/posting/all_content', sessionUser , getAllContent)
Routes.get('/:id/posting', sessionUser , getContentById)
Routes.post('/posting/new_content' , sessionUser,  createNewPosting)

module.exports = Routes