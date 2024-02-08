const BackgroundStories = require('../Models/backgroundStoriesData.model.js');

module.exports = {
    getAll: async function (req, res) {
        try {
            const background_stories = await BackgroundStories.findAll();
            res.status(200).json({status: 200, data: background_stories});
        } catch (error) {
            console.error(error);
            res.status(500).json({status: 500, msg: error.message, data: null});
        }
    }
}