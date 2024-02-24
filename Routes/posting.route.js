const express = require('express');
const Routes = express.Router();
const {sessionUser} = require('../middleware/session.js');
const { 
    getAllContent,
    getContentById,
    createNewPosting,
    getHotPost,
    deletePosting,
    getPostUser,
    getAllPostUserById,
} = require('../Controller/posting.controller.js');


Routes.get('/all_content', sessionUser , getAllContent);
Routes.get('/user', sessionUser , getPostUser);
Routes.get('/:id/user', sessionUser , getAllPostUserById)
Routes.get('/:id', sessionUser , getContentById);
Routes.get('/get/hot_postings', sessionUser, getHotPost);
Routes.post('/new_content' , sessionUser, createNewPosting);
Routes.delete('/:postUUID', sessionUser, deletePosting);

module.exports = Routes