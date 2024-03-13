const BackgroundStories = require('../Models/backgroundStoriesData.model.js');

module.exports = {
    getAll: async function (req, res) {
        try {
            const background_stories = await BackgroundStories.findAll({
                attributes: ['id', 'color_code']
            });
            // res.status(200).json({status: 200, data: background_stories});
        } catch (error) {
            console.error(error);
            res.status(500).json({status: 500, msg: error.message, data: null});
        }
    },
    createBackgorundStories: async function (req, res) {
        const { color_code } = req.body;

        try {            
            await BackgroundStories.create({color_code})
            res.status(200).json({status: 200, msg: "background stories created successfully"})
        } catch (error) {
            console.error(error);
            res.status(500).json({status: 500, message: error.message});
        }
    }
}