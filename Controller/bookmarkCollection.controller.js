const BookmarkCollection = require("../Models/bookmarkCollection.model");

module.exports = {
    getAll: async function(req, res) {
        try {
            const bookmark_collection    = await BookmarkCollection.findAll()
            res.status(200).json({status: "success", bookmark_collection})
        } catch (error) {
            console.error(error);
            res.status(500).json({status: "error", error, msg: error.message, data: null});
        }
    }
}