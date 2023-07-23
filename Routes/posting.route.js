const express = require('express');
const Routes = express.Router();
const {sessionUser} = require('../middleware/session.js');
const { 
    getAllContent,
    getContentById,
    createNewPosting,
    getHotPost,
    deletePosting,
    updateLike,
    getPostUser,
    getAllPostUserById,
} = require('../Controller/posting.controller.js');


Routes.get('/posting/all_content', sessionUser , getAllContent);
Routes.get('/posting/user', sessionUser , getPostUser);
Routes.get('/posting/:id/user', sessionUser , getAllPostUserById)
Routes.get('/:id/posting', sessionUser , getContentById);
Routes.post('/posting/new_content' , sessionUser, createNewPosting);
Routes.patch('/posting/like/:postId', sessionUser , updateLike);
Routes.get('/posting/get/hot_postings', sessionUser, getHotPost);
Routes.delete('/posting/:postId', sessionUser, deletePosting);

module.exports = Routes