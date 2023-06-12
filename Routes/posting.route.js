const express = require('express');
const Routes = express.Router();
// const upload = require('../Controller/uploadfile.js')
const {sessionUser} = require('../middleware/session.js');
const { 
    getAllContent,
    getContentById,
    createNewPosting,
    getHotPost,
} = require('../Controller/posting.controller.js');

Routes.get('/posting/all_content', async (req,res) => {
    try {
        const posting = await Posting.findAll({
            include: [{
                model: Users,
                attributes: attributesUser
            }]
        });
        res.status(200).json({
            status: "200", 
            result: posting
        })
    } catch (error) {
        log.error(error)
    }
})
Routes.get('/:id/posting', sessionUser , getContentById)
Routes.post('/posting/new_content' , createNewPosting)
Routes.get('/posting/get/hot_postings' , getHotPost)

module.exports = Routes