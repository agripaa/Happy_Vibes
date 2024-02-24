const BookmarkCollection = require("../Models/bookmarkCollection.model");

module.exports = {
    getAll: async function(req, res) {
        try {
            const bookmark_collection = await BookmarkCollection.findAll()
            res.status(200).json({status: "success", bookmark_collection})
        } catch (error) {
            console.error(error);
        }
    }
}