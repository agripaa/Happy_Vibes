const ImageStories = require('../Models/imageStoriesData.model.js');

module.exports = {
    getAll: async function (req, res) {
        try {
            const image_stories = await ImageStories.findAll();
            res.status(200).json({status: 200, data: image_stories});
        } catch (error) {
            console.error(error);
            res.status(500).json({status: 500, msg: error.message, data: null});
        }
    }
}