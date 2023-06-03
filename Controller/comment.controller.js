const Comment = require('../Models/commentsData.model.js');
const express = require('express');


const uploadComment = async (req,res) => {
    const commentsData = req.body.comment

    try {
        await Comment.create({
            comment: commentsData
        });

        return res.status(200).json({ status: 200, msg: 'Posting created successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, msg: 'Internal server error' });
    }
}

const getAllComment = async (req,res) => {
    try {
        const comment = await Comment.findAll();
        res.status(200).json({
            status: "200", 
            result: comment
        })
    } catch (error) {
        log.error(error)
    }
}

module.exports = { uploadComment , getAllComment }