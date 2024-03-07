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
    },
    createCategoryStory: async function(req, res) { 
        const { category_story } = req.body;
        
        try {
            await CategoryStories.create({category_story});
            res.status(200).json({status: 200, msg: "CategoryStory created successfully"})
        } catch (error) {
            console.error(error);
            res.status(500).json({status: 500, msg: error.message});
        }
    },
    deleteCategoryStory: async function(req, res){
        const { id } = req.params;

        try {
            await CategoryStories.destroy({where: { id }})      
            res.status(200).json({status: 200, msg: "caategory story deleted successfully"})
        } catch (error) {
            console.error(error);
            res.status(500).json({status: 500, msg: error.message});
        }
    }
}