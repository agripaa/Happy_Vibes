const { DataTypes } = require('sequelize');
const ReportPosting = require('./reportPostingData.model.js');
const db = require('../Config/database.js');


const CategoryReportPosting = db.define('category_report_posting', {
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

ReportPosting.belongsTo(CategoryReportPosting, {foreignKey: "category_report_post", onDelete: "CASCADE"})
CategoryReportPosting.hasMany(ReportPosting, {foreignKey: "category_report_post", onDelete: "CASCADE"})

module.exports = CategoryReportPosting;