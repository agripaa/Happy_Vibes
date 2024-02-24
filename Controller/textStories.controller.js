const TextStories = require('../Models/textStoriesData.model.js');

module.exports = {
    getAll: async function (req, res) {
        try {
            const text_stories = await TextStories.findAll();
            res.status(200).json({status: 200, data: text_stories});
        } catch (error) {
            console.error(error);
            res.status(500).json({status: 500, msg: error.message, data: null});
        }
    }
}