const express = require('express');
const Routes = express.Router();
const {sessionUser} = require('../middleware/session.js');
const { 
    getAllContent,
    getContentById,
    createNewPosting,
    getHotPost,
    deletePosting,
} = require('../Controller/posting.controller.js');


Routes.get('/posting/all_content', sessionUser, getAllContent)
Routes.get('/:id/posting', sessionUser , getContentById)
Routes.post('/posting/new_content' , sessionUser, createNewPosting)
Routes.get('/posting/get/hot_postings', sessionUser, getHotPost)
Routes.delete('/posting/:postId', sessionUser, deletePosting)

module.exports = Routes