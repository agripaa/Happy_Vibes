const express = require('express');
const multer = require('multer');
const Routes = express.Router();
const { 
    getAllContent,
    getContentById,
    createNewPosting,
} = require('../Controller/posting.controller.js')

const fileStorage = multer.diskStorage({
    destination: (req, file , cb) => {
        cb(null, './public/users/');
    },
    filename: (req , file , cb) => {
        cb( null, Date.now() + '-' + file.originalname);
        // cb(null , file.originalname)
    }
})

const upload = multer({storage: fileStorage})

Routes.get('/posting/all_content', getAllContent)
Routes.get('/:id/posting', getContentById)
Routes.post('/posting/new_content', upload.single('image') , createNewPosting)

module.exports = Routes