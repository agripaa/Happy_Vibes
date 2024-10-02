const ReportUser = require('../Models/reportUserData.model.js');

module.exports = {
    getAll: async function(req, res){
        try {
            const reportData = await ReportUser.findAll();
            res.status(200).json({status: 200, data: reportData});
        } catch (error) {
            console.error(error);
            res.status(500).json({status: 500, msg: error.message});
        }
    },
    uploadReportUser: async function(req, res) {
        const { category_report_acc_id, user_reported } = req.body;
        const { userId } = req;

        try {
            await ReportUser.create({category_report_acc_id, userId, user_reported});
            res.status(201).json({status: 200, msg: "created report user successfully!"});
        } catch (error) {
            console.error(error);
            res.status(500).json({status: 500, msg: error.message});
        }
    }
}