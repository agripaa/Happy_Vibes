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
    }
}