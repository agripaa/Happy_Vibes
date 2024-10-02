const { DataTypes } = require('sequelize');
const db = require('../Config/database.js');
const User = require('./usersData.model.js');
const Posting = require('./postingData.model.js');

const ReportPosting = db.define('report_posting', {
    uuid : {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }  
    },
    category_report_post: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }  
    },
    userId : {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }  
    },
    postId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }  
    }
}, {freezeTableName: true});

ReportPosting.belongsTo(User, {foreignKey: 'userId', onDelete: "CASCADE"})
User.hasMany(ReportPosting, {foreignKey: 'userId', onDelete: "CASCADE"})

ReportPosting.belongsTo(Posting, {foreignKey: 'postId', onDelete: "CASCADE"})
Posting.hasMany(ReportPosting, {foreignKey: 'postId', onDelete: "CASCADE"})

module.exports = ReportPosting