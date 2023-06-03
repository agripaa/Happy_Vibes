const Posting = require('../Models/postingData.model.js');
const { sequelize , QueryTypes } = require('sequelize');
const multer = require('multer')
const log = require('../utils/log.js')

const express = require('express');

const fileStorage = multer.diskStorage({
    destination: (req, file , cb) => {
        cb(null , './public/users')
    },
    filename: (req , file , cb) => {
        cb(null , new Date().toString() + '-' + file.originalname)
    }
})

const filterImage = (req , file , cb) => {

}

const getAllContent = async (req,res) => {
    try {
        const posting = await Posting.findAll();
        res.status(200).json({
            status: "200", 
            result: posting
        })
    } catch (error) {
        log.error(error)
    }
}
const getContentById = async (req,res) => {
    try {
        
        const posting = await Posting.findOne({
            where: {
              uuid : req.params.id
            }
          });

          if(!posting) {
            res.status(404).json({
               "msg" : "Data tidak ditemukan"})
          }
        res.status(200).json({
            status: "200", 
            posting
        })
    } catch (error) {
        log.error(error)
    }
}

const createNewPosting = async (req, res) => {
        const newPosting = req.body
        const image = req.file.path
        try {
            await Posting.create({
                name_img: newPosting.name_img,
                url: image, // Tambahkan url ke data yang akan dibuat
                desc: newPosting.desc,
                like: newPosting.like
            });

            return res.status(200).json({ status: 200, msg: 'Posting created successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 500, msg: 'Internal server error' });
        }
    };


module.exports = {getAllContent , getContentById , createNewPosting }