const RatioImage = require('../Models/ratioImagePostingData.model.js');

module.exports = {
    getAll: async function(req, res) {
        try {
            const ratio_image = await RatioImage.findAll();
            res.status(200).json({status: 200, ratio_image});
        } catch (error) {
            console.error(error);
            res.status(500).json({status: "error", error, msg: error.message, data: null});
        }
    },
    createRatio: async function (req, res) {
        const { ratio } = req.body
        try {
            await RatioImage.create({ratio});
            res.status(200).json({status: 200, ratio})
        } catch (error) {
            console.error(error);
            res.status(500).json({status: "error", error, msg: error.message, data: null});
        }
    }
}