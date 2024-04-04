const { Op } = require("sequelize");
const BookmarkCollection = require("../Models/bookmarkCollection.model");
const ImageProfile = require("../Models/imageProfileData.model");
const Users = require("../Models/usersData.model");
const { attributesUserImageProfileId, attributesImageProfile } = require("../utils/attributes.utils");

module.exports = {
    getAll: async function(req, res) {
        try {
            const bookmark_collections = await BookmarkCollection.findAll()
            res.status(200).json({status: 200, bookmark_collections})
        } catch (error) {
            console.error(error);
            res.status(500).json({status: "error", error, msg: error.message, data: null});
        }
    },
    getBookmarkCollectionById: async function(req, res){
        const bookmarkCollectionId = req.params.id;
        const {userId} = req;

        try {
            const bookmark_collection = await BookmarkCollection.findOne({
                where: {[Op.and]: [{id: bookmarkCollectionId}, {userId}]},
                include: [{
                    model: Users,
                    attributes: attributesUserImageProfileId,
                    include: [{
                        model: ImageProfile,
                        attributes: attributesImageProfile
                    }]
                }]
            })
            
            if(!bookmark_collection) return res.status(404).json({status: 404, msg: "bookmark collection not found!", data: null})
            res.status(200).json({status: 200, bookmark_collection})
        } catch (error) {
            console.error(error);
            res.status(500).json({status: "error", error, msg: error.message, data: null});
        }
    },
    createBookmarkCollection: async function(req, res) {
        const { name_collection } = req.body;
        const { userId } = req;
        try {
            await BookmarkCollection.create({name_collection, userId});
            res.status(201).json({status: 201, msg: 'Bookmark collection adding succesfully'})
        } catch (error) {
            console.error(error);
            res.status(500).json({status: "error", error, msg: error.message, data: null});
        }
    },
    updateBookmarkCollection: async function(req, res) {
        const { name_collection } = req.body;
        const { userId } = req;

        try {
            const bookmark_collection = await BookmarkCollection.findOne({where: {userId}});
            if(name_collection == null) { name_collection = bookmark_collection.name_collection }

            await BookmarkCollection.update({name_collection},{where: {userId}});
            res.status(200).json({status: 200, msg: 'Bookmark collection updating succesfully'})
        } catch (error) {
            console.error(error);
            res.status(500).json({status: "error", error, msg: error.message, data: null});
        }
    },
    deleteBookmarkCollection: async function (req, res){
        const bookmarkCollectionId = req.params.id;

        try {
            await BookmarkCollection.destroy({where: {id: bookmarkCollectionId}})
            res.status(200).json({status: 200, msg: "Bookmark deleted succesfully", id_bookmark: bookmarkCollectionId})
        } catch (error) {
            console.error(error);
            res.status(500).json({status: "error", error, msg: error.message, data: null});
        }
    }
}