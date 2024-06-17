const CategoryStories = require('../Models/categoryStoriesData.model.js');
const ImageStories = require('../Models/imageStoriesData.model.js');
const Stories = require('../Models/storiesData.model.js');
const path = require('path');
const TextStories = require('../Models/textStoriesData.model.js');
const { attributesCategoryStory, attributesImageProfile } = require('../utils/attributes.utils.js');
const Follows = require('../Models/followsData.model.js');
const { Op } = require('sequelize');
const ImageProfile = require('../Models/imageProfileData.model.js');
const Users = require('../Models/usersData.model.js');

module.exports = {
    getAll: async function(req, res) {
        try {
            const stories = await Stories.findAll();
            res.status(200).json({status: 200, data: stories});
        } catch (error) {
            console.error(error);
            res.status(500).json({status: 500, msg: error.message});
        }
    },
    getListStoriesFollowerOrFollowing: async function (req, res) {
        const {userId} = req;

        try{
            const follows = await Follows.getAll({where: {userId}});
            if (!follows.length) return res.status(404).json({status: 'Not Found', statusCode: 404, msg: "follows user is null!" });

            const followingIds = follows.map(follow => follow.followingId).filter(id => id !== null);
            const followerIds = follows.map(follow => follow.followerId).filter(id => id !== null);
            
            const userIds = [...new Set([...followingIds, ...followerIds])];
            if (!userIds.length) return res.status(404).json({ status: 'Not Found', statusCode: 404, msg: "No valid user IDs found for following or followers!" });

            const storiesFollows = await Stories.findAll({
                where: {
                    userId: {
                        [Op.in]: userIds
                    }
                },
                include: [{
                    model: Users,
                    attributes: ['id', 'username', 'email', "image_profile"],
                    include: [{
                        model: ImageProfile,
                        attributes: attributesImageProfile,
                    }]
                }]
            });

            res.status(200).json({status: 'success', statusCode: 200, data: storiesFollows})
        } catch(error){
            console.error(error);
            res.status(500).json({status: 500, msg: error.message, error});
        }
    },
    handleImageUpload: async function(files, text_stories, stories, res){
        try {
            const file = files.file;
            const { data, name } = file;
            const size = data.length;
            const extend = path.extname(name);
            const name_img = file.md5 + extend;
            const url = `/stories/${name_img}`;
    
            if (size > 5000000) {
                return res.status(422).json({ status: 422, msg: "Images must be less than 5MB" });
            }
    
            file.mv(`./public/stories/${name_img}`, err => {
                if (err) {
                    return res.status(500).json({ status: 500, msg: 'Internal server error', image: "Image hasn't been uploaded!", error: err });
                }
            });
    
            const image_stories = await ImageStories.create({
                url_stories: url,
                name_image: name_img,
                text_stories,
                stories_id: stories.id
            });
            
            return res.status(200).json({ status: 200, msg: "Story uploaded successfully!", datas_story: {image_stories, stories} });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 500, msg: error.message });
        }
    },
    handleTextUpload: async function (text_stories, stories, background_id, font_id, res){
        try {
            const text_story = await TextStories.create({
                text_stories,
                background_id,
                font_id,
                stories_id: stories.id
            })

            res.status(200).json({status: 200, text_story})
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 500, msg: error.message });
        }
    },
    uploadStories: async function(req, res) {
        const { userId, files } = req;
        const { category_stories_id, text_stories, background_id, font_id } = req.body;

        try {
            const category_stories = await CategoryStories.findOne({
                where: { id: category_stories_id },
                attributes: attributesCategoryStory
            });

            const stories = await Stories.create({
                category_stories_id,
                userId,
                viewers_count: 0
            });

            if (category_stories['category_story'] === "IMAGE") {
                module.exports.handleImageUpload(files, text_stories, stories, res);
            } else if (category_stories['category_story'] === "TEXT") {
                module.exports.handleTextUpload(text_stories, stories, background_id, font_id, res);
            } else {
                res.status(404).json({ status: 404, msg: "Category story does not exist!" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 500, msg: error.message });
        }
    },
}