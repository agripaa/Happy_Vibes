const express = require('express');
const Routes = express.Router();
const { uploadComment , getAllComment }  = require('../Controller/comment.controller.js')

Routes.post('/comment/upload' , uploadComment)
Routes.get('/comment/all_comment' , getAllComment)

module.exports = Routes