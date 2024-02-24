const CategoryReportUser = require('../Models/categoryReportUserData.model.js');

module.exports = {
    getAll: async function(req, res) {
        try {
            const category_report = await CategoryReportUser.findAll();
            res.status(200).json({ status: 200, data: category_report });
        } catch (error) {
            console.error(error);
            res.status(500).json({status: 500, msg: error.message});
        }
    }
}                                                                                                                                                                                                                       