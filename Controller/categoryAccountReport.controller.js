const CategoryReportUser = require('../Models/categoryReportUserData.model.js');

module.exports = {
    getAll: async function(req, res) {
        try {
            const category_report = await CategoryReportUser.findAll();
            if(category_report.length === 0) return res.status(200).json({status: 200, msg: "data category user report is null"})

            res.status(200).json({ status: 200, data: category_report });
        } catch (error) {
            console.error(error);
            res.status(500).json({status: 500, msg: error.message});
        }
    },
    getOneCategoryAccount: async function(req, res) {
        const { id } = req.params;
        
        try {
            const category_report = await CategoryReportUser.findOne({where: {id}})
            if(!category_report) return res.status(200).json({status: 200, msg: "data category user report is null"})

            res.status(200).json({status:200, result: category_report});
        } catch (error) {
            console.error(error);
            res.status(500).json({status: 500, msg: error.message});
        }
    },
    createCategoryAccount: async function(req, res) {
        const { category_report, desc_category_report } = req.body;

        try {
            await CategoryReportUser.create({category_report, desc_category_report});
            res.status(200).json({status: 201, msg: "create category report successfully!"});
        } catch (error) {
            console.error(error);
            res.status(500).json({status: 500, msg: error.message});
        }
    },
    updateCategoryAccount: async function(req, res) {
        const { category_report, desc_category_report } = req.body;
        const { id } = req.params;
        
        const reportUserData = await CategoryReportUser.findOne({where: {id}});
        if(!reportUserData) return res.status(404).json({status: 404, msg: "report user data is not found!"});

        try {
            await CategoryReportUser.update({
                category_report, desc_category_report
            }, {where: {id: reportUserData['id']}});

            res.status(200).json({status: 200, msg: "updated category resport user successfully!"});
        } catch (error) {
            console.error(error);
            res.status(500).json({status: 500, msg: error.message});
        }
    },
    deleteCategoryAccount: async function(req, res) {
        const { id } = req.params;
        
        const reportUserData = await CategoryReportUser.findOne({where: {id}});
        if(!reportUserData) return res.status(404).json({status: 404, msg: "report user data is not found!"});

        try {
            await CategoryReportUser.destroy({where: {id: reportUserData['id']}})
            res.status(200).json({status: 200, msg: "deleted category user successfully!"})
        } catch (error) {
            console.error(error);
            res.status(500).json({status: 500, msg: error.message});
        }
    }
}                                                                                                                                                                                                                       