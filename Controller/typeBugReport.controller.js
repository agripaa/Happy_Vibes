const TypeBug = require('../Models/typeBugData.model');


module.exports = {
    async getTypeBugReport(req, res) {
        try {
            const typeBugData = await TypeBug.findAll();
            if(!typeBugData) return res.status(404).json({status:404, msg: "type bug data is not found!"});

            res.status(200).json({status: 200, result: typeBugData});
        } catch (error) {
            console.error(error);
            res.status(500).json({status: 500, msg: "Internal server error"})
        }
    },
    async createTypeBugReport(req, res) {
        const { bug } = req.body;

        try {   
            await TypeBug.create({bug});
            res.status(200).json({status: 200, msg: "create type bug successfully!"});
        } catch (error) {
            console.error(error)
            res.status(500).json({status: 500, msg: "Internal server error"});
        }
    },
    async updateTypeBugReport(req, res) {
        const { bug } = req.body;
        const { id } = req.params;

        try {
            const typeBugData = await TypeBug.update({bug},{where: {id}});
            if(!typeBugData) return res.status(404).json({status:404, msg: "type bug data is not found!"});

            res.status(200).json({status: 200, msg: "update type bvug successfully!"})
        } catch (error) {
            console.error(error)
            res.status(500).json({status: 500, msg: "Internal server error"}); 
        }
    },
    async deleteTypeBugReport(req, res) {
        const { id } = req.params;

        try {
            const typeBugData = await TypeBug.destroy({where: {id}});
            if(!typeBugData) return res.status(404).json({status:404, msg: "type bug data is not found!"});

            res.status(200).json({status: 200, msg: "deleted type bug successfully!"});
        } catch (error) {
            console.error(error)
            res.status(500).json({status: 500, msg: "Internal server error"});
        }
    }
}