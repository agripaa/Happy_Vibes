const CategoryStories = require('../Models/categoryStoriesData.model.js');
const ImageStories = require('../Models/imageStoriesData.model.js');
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
    },
    uploadStories: async function(req, res) {
        const { userId, files } = req;
        const { category_stories_id, text_stories } = req.body;

        try {
            const category_stories = await CategoryStories.findOne({
                where: { id: category_stories_id },
                attributes: ['category_story']
            });

            const stories = await Stories.create({
                category_stories_id,
                userId,
                viewers_count: 0
            });

            if (category_stories['category_story'] === "IMAGE") {
                handleImageUpload(files, text_stories, stories, res);
            } else if (category_stories['category_story'] === "TEXT") {
                handleTextUpload(text_stories, stories, res);
            } else {
                res.status(404).json({ status: 404, msg: "Category story does not exist!" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 500, msg: error.message });
        }
    },
    handleImageUpload: async function(files, text_stories, stories, res){
        try {
            const file = files.file;
            const { data, name } = file;
            const size = data.length;
            const extend = path.extname(name);
            const name_img = file.md5 + extend;
            const url = `/stories/${name_img}`;
    
            if (size > 5000000) {
                return res.status(422).json({ status: 422, msg: "Images must be less than 5MB" });
            }
    
            file.mv(`./public/postings/${name_img}`, err => {
                if (err) {
                    return res.status(500).json({ status: 500, msg: 'Internal server error', image: "Image hasn't been uploaded!", error: err });
                }
            });
    
            const image_stories = await ImageStories.create({
                url_stories: url,
                name_image: name_img,
                text_stories,
                stories_id: stories.id
            });
    
            return res.status(200).json({ status: 200, msg: "Story uploaded successfully!", image_stories, stories });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 500, msg: error.message });
        }
    },
    handleTextUpload: async function (text_stories, stories, res){
        try {
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 500, msg: error.message });
        }
    }
}