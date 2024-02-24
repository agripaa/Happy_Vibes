const CategoryStories = require('../Models/categoryStoriesData.model.js');

module.exports = {
    getAll: async function(req, res) {
        try {
            const category_stories = await CategoryStories.findAll();

            res.status(200).json({status: 200, data: category_stories});
        } catch (error) {
            console.error(error);
            res.status(500).json({status: 500, msg: error.message});
        }
    }
}