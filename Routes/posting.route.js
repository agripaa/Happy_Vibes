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


Routes.get('/all_content', sessionUser , getAllContent);
Routes.get('/user', sessionUser , getPostUser);
Routes.get('/:id/user', sessionUser , getAllPostUserById)
Routes.get('/:id', sessionUser , getContentById);
Routes.get('/get/hot_postings', sessionUser, getHotPost);
Routes.post('/new_content' , sessionUser, createNewPosting);
Routes.patch('/like/:postId', sessionUser , updateLike);
Routes.delete('/:postId', sessionUser, deletePosting);

module.exports = Routes