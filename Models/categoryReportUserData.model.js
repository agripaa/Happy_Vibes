const { DataTypes } = require('sequelize');
const ReportUser = require('./reportUserData.model.js');
const db = require('../Config/database.js');


const CategoryReportUser = db.define('category_report_acc', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }   
    },
    category_report :{
        type: DataTypes.STRING,
    },
    desc_category_report :{
        type: DataTypes.TEXT
    },
},{freezeTableName: true})

ReportUser.belongsTo(CategoryReportUser, {foreignKey: "category_report_acc_id", onDelete: "CASCADE"})
CategoryReportUser.hasMany(ReportUser, {foreignKey: "category_report_acc_id", onDelete: "CASCADE"})

module.exports = CategoryReportUser