const CategoryStories = require('../Models/categoryStoriesData.model.js');
const ImageStories = require('../Models/imageStoriesData.model.js');
const Stories = require('../Models/storiesData.model.js');
const path = require('path');
const TextStories = require('../Models/textStoriesData.model.js');
const Follows = require('../Models/followsData.model.js');
const { attributesCategoryStory, attributesUserImageProfileId, attributesImageProfile, attributesImageStories, attributesTextStories, attributesUserIdToFollowing } = require('../utils/attributes.utils.js');
const cron = require('node-cron');
const {Op} = require('sequelize');
const FontStories = require('../Models/fontStoriesData.model.js');
const BackgroundStories = require('../Models/backgroundStoriesData.model.js');
const Users = require('../Models/usersData.model.js');
const ImageProfile = require('../Models/imageProfileData.model.js');

async function deleteOldStories() {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000); 

    try {
        const oldStories = await Stories.findAll({
            where: {
                createdAt: {
                    [Op.lte]: twentyFourHoursAgo
                }
            }
        });

        if (oldStories.length > 0) {
            await Stories.destroy({
                where: {
                    createdAt: {
                        [Op.lte]: twentyFourHoursAgo
                    }
                }
            });
            console.log(`${oldStories.length} stories deleted`);
        } else {
            console.log('No old stories to delete');
        }
    } catch (error) {
        console.error('Error deleting old stories:', error.message);
    }
}

cron.schedule('* * * * *', deleteOldStories);

module.exports = {
    getAll: async function (req, res) {
        try {
            const stories = await Stories.findAll();
            res.status(200).json({ status: 200, data: stories });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 500, msg: error.message });
        }
    },
    handleImageUpload: async function (files, text_stories, stories, res) {
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

            return res.status(200).json({ status: 200, msg: "Story uploaded successfully!", datas_story: { image_stories, stories } });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 500, msg: error.message });
        }
    },
    handleTextUpload: async function (text_stories, stories, background_id, font_id, res) {
        try {
            const text_story = await TextStories.create({
                text_stories,
                background_id,
                font_id,
                stories_id: stories.id
            })

            res.status(200).json({ status: 200, text_story })
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 500, msg: error.message });
        }
    },
    uploadStories: async function (req, res) {
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
    getStoryUser: async function (req, res) {
        const { userId } = req;
        
        try {
            const stories = await Stories.findAll({
                where: { 
                    userId,
                    createdAt: {
                        [Op.gt]: new Date(Date.now() - 24 * 60 * 60 * 1000) 
                    }
                },
                include: [
                    {
                        model: CategoryStories,
                        attributes: ['category_story']
                    },
                    {
                        model: ImageStories,
                        attributes: attributesImageStories,
                        required: false
                    },
                    {
                        model: TextStories,
                        attributes: attributesTextStories,
                        required: false, 
                        include: [
                            FontStories,
                            BackgroundStories
                        ]
                    },
                    {
                        model: Users,
                        attributes: attributesUserImageProfileId,
                        include: [{ model: ImageProfile, attributes: attributesImageProfile }]
                    }
                ]
            });
    
            if (!stories.length) return res.status(404).json({ status: 404, msg: "Stories user is not defined" });
    
            const formattedStories = stories.map(story => {
                if (story['category_story'].category_story === "IMAGE") {
                    return {
                        ...story.get({ plain: true }),
                        imageStories: story.ImageStories
                    };
                } else if (story['category_story'].category_story === "TEXT") {
                    return {
                        ...story.get({ plain: true }),
                        textStories: story.TextStories,
                        user: story.User
                    };
                }
                return story;
            });
    
            res.status(200).json({ status: 200, result: formattedStories });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 500, msg: error.message });
        }
    },
    
    getFollowingStoriesIds: async function (req, res) {
        const { userId } = req;

        try {
            const followingUsers = await Follows.findAll({
                where: { followingId: userId }, 
                attributes: attributesUserIdToFollowing, 
            });

            const followerIds = followingUsers.map(follow => follow.followerId);
            if (!followerIds || followerIds.length === 0) return res.status(404).json({ status: 404, msg: "You are not following anyone with stories" });

            res.status(200).json({ status: 200, result: followerIds });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 500, msg: error.message });
        }
    },
    getFollowingStories: async function (req, res) {
        const { userId } = req;

        try {
            const followingUsers = await Follows.findAll({
                where: { followingId: userId }, 
                attributes: attributesUserIdToFollowing, 
            });
            
            const followerIds = followingUsers.map(follow => follow.followerId);

            if (!followerIds || followerIds.length === 0) {
                return res.status(404).json({ status: 404, msg: "You are not following anyone with stories" });
            }

            const stories = await Stories.findAll({
                where: {
                    userId: { [Op.in]: followerIds },
                    createdAt: {
                        [Op.gt]: new Date(Date.now() - 24 * 60 * 60 * 1000) 
                    }
                },
                include: [
                    {
                        model: CategoryStories,
                        attributes: ['category_story']
                    },
                    {
                        model: ImageStories,
                        attributes: attributesImageStories,
                        required: false
                    },
                    {
                        model: TextStories,
                        attributes: attributesTextStories,
                        required: false, 
                        include: [
                            FontStories,
                            BackgroundStories
                        ]
                    },
                    {
                        model: Users,
                        attributes: attributesUserImageProfileId,
                        include: [{ model: ImageProfile, attributes: attributesImageProfile }]
                    }
                ]
            });

            if (!stories.length) return res.status(404).json({ status: 404, msg: "Stories user is not defined" });
    
            const formattedStories = stories.map(story => {
                if (story['category_story'].category_story === "IMAGE") {
                    return {
                        ...story.get({ plain: true }),
                        imageStories: story.ImageStories
                    };
                } else if (story['category_story'].category_story === "TEXT") {
                    return {
                        ...story.get({ plain: true }),
                        textStories: story.TextStories,
                        user: story.User
                    };
                }
                return story;
            });

            res.status(200).json({ status: 200, result: formattedStories });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 500, msg: error.message });
        }
    },
    seeStoryFollowing: async function(req, res) {
        const { followerId } = req.params;
        const { userId } = req;

        if (followerId === userId) return res.status(400).json({ status: 400, msh: "you can't request you're id in followerId"});

        const followsExist = await Follows.findOne({where: {[Op.and]: [{followerId}, {followingId: userId}]}});
        if(!followsExist) return res.status(404).json({status: 404, msg: "following is not exist!"})

        try {
            const stories = await Stories.findOne({
                where: {userId: followingId,}, 
                include: [
                    {
                        model: CategoryStories,
                        attributes: ['category_story']
                    },
                    {
                        model: ImageStories,
                        attributes: attributesImageStories,
                        required: false
                    },
                    {
                        model: TextStories,
                        attributes: attributesTextStories,
                        required: false, 
                        include: [
                            FontStories,
                            BackgroundStories
                        ]
                    },
                    {
                        model: Users,
                        attributes: attributesUserImageProfileId,
                        include: [{ model: ImageProfile, attributes: attributesImageProfile }]
                    }
                ]
            });
            if(!stories) return res.status(404).json({ status: 404, msg: "story is not defined!"});

            res.status(200).json({status: 200, result: stories});
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 500, msg: error.message });
        }
    }
}
