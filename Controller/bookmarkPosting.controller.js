const BookmarkPosting = require("../Models/bookmarkPostingData.model");

module.exports = {
    getAll: async function(req, res) {
        try {
            const bookmark_posting = await BookmarkPosting.findAll()
            res.status(200).json({status: "success", bookmark_posting})
        } catch (error) {
            console.error(error);
        }
    }
}