const CategoryReportPosting = require("../Models/categoryReportPostingData.model");

module.exports = {
    getCategoryPostingData: async function (req, res) {
        try {
            const category_posting = await CategoryReportPosting.findAll();
            if(category_posting.length === 0) return res.status(404).json({status: 404, msg: "report data posting is null!"});
            
            res.status(200).json({status: 200, result: category_posting});
        } catch (error) {
            console.error(error);
            res.status(500).json({status: 500, msg: error.message});
        }
    },
    getOneCategoryPostingData: async function(req, res) {
        const {id} = req.params;

        try {
            const category_posting = await CategoryReportPosting.findOne({where: {id}});
            if(!category_posting) return res.status(404).json({status: 404, msg: "report data posting is not found!"});

            res.status(200).json({status: 200, result: category_posting});
        } catch (error) {
            console.error(error);
            res.status(500).json({status: 500, msg: error.message});
        }
    },
    createCategoryPostingData: async function(req, res) {
        const { category_report, desc_category_report } = req.body;

        try {
            await CategoryReportPosting.create({category_report, desc_category_report});
            res.status(201).json({status: 201, msg: "created data category posting report successfully!"})
        } catch (error) {
            console.error(error);
            res.status(500).json({status: 500, msg: error.message});
        }
    },
    updateCategoryPostingData: async function(req, res) {
        const { category_report, desc_category_report } = req.body;
        const { id } = req.params;

        const category_posting = await CategoryReportPosting.findOne({where: {id}});
        if(!category_posting) return res.status(404).json({status: 404, msg: "report data posting is not found!"});

        try {
            await CategoryReportPosting.update({category_report, desc_category_report},{where: {id: category_posting['id']}});
            res.status(200).json({status: 200, msg: "updated category posting report successfully!"});
        } catch (error) {
            console.error(error);
            res.status(500).json({status: 500, msg: error.message});
        }
    },
    deleteCategoryPostingData: async function(req, res) {
        const { id } = req.params;

        const category_posting = await CategoryReportPosting.findOne({where: {id}});
        if(!category_posting) return res.status(404).json({status: 404, msg: "report data posting is not found!"});

        try {
            await CategoryReportPosting.destroy({where: {id: category_posting['id']}});
            res.status(200).json({status: 200, msg: "deleted category posting report successfully!"});
        } catch (error) {
            console.error(error);
            res.status(500).json({status: 500, msg: error.message});
        }
    }
}