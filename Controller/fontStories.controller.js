const FontStories = require('../Models/fontStoriesData.model.js');

module.exports = {
    getAll: async function (req, res) {
        try {
            const font_stories = await FontStories.findAll();
            res.status(200).json({status: 200, data: font_stories});
        } catch (error) {
            console.error(error);
            res.status(500).json({status: 500, msg: error.message, data: null});
        }
    }
}