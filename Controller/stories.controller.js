const Stories = require('../Models/storiesData.model.js');

module.exports = {
    getAll: async function(req, res) {
        try {
            const stories = await Stories.findAll();

            res.status(200).json({status: 200, data: stories});
        } catch (error) {
            console.error(error);
            res.status(500).json({status: 500, msg: error.message});
        }
    }
}