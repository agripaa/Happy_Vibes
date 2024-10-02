const BookmarkPosting = require("../Models/bookmarkPostingData.model");
const ImagePosting = require("../Models/imagePostingData.model");
const Posting = require("../Models/postingData.model");
const Users = require("../Models/usersData.model");
const { attributesPostingsBookmark, attributesImagePosting, attributesUser } = require("../utils/attributes.utils");

module.exports = {
    getAll: async function (req, res) {
        const { bookmark_coll_id } = req.params;
        try {
            const bookmark_posting = await BookmarkPosting.findAll({
                where: { bookmark_coll_id },
                include: [{
                    model: Posting,
                    attributes: attributesPostingsBookmark,
                    include: [{
                        model: ImagePosting,
                        attributes: attributesImagePosting,
                    }, {
                        model: Users,
                        attributes: attributesUser,
                    }]
                }]
            })

            if (!bookmark_posting.length) return res.status(404).json({ status: 404, msg: "Bookmark posting is not found" });
            res.status(200).json({ status: 200, bookmark_posting })
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 500, error_msg: error.message, data: null })
        }
    },
    handleBookmarkPosting: async function (req, res) {
        const { postId, bookmark_coll_id } = req.body;

        const bookmark_post = await BookmarkPosting.findOne({ where: { bookmark_coll_id: bookmark_coll_id } })

        const postExists = await Posting.findOne({ where: { id: postId } });
        if (!postExists) return res.status(400).json({ status: 400, msg: "Invalid postId, post does not exist" });
        try {
            if (!bookmark_post) {
                try {
                    const bookmark_posting = await BookmarkPosting.create({postId, bookmark_coll_id});
                    return res.status(200).json({ status: 200, msg: "Bookmark post add to collection successfully", bookmark_data: {bookmark_posting}});
                } catch (error) {
                    console.error(error);
                    res.status(500).json({ status: 500, error_msg: error.message, data: null })
                }
            } 
            
            if (bookmark_post.bookmark_coll_id == bookmark_coll_id){
                try {
                    await BookmarkPosting.destroy({where: {bookmark_coll_id: bookmark_coll_id}})
                    return res.status(200).json({ status: 200, msg: "Bookmark post remove to collection successfully"});
                } catch (error) {
                    console.error(error);
                    res.status(500).json({ status: 500, error_msg: error.message, data: null })
                }
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 500, error_msg: error.message, data: null })
        }
    }
}