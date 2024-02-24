const { DataTypes } = require('sequelize');
const User = require('./usersData.model.js');
const db = require('../Config/database.js');

const ReportUser = db.define('report_account', {
    uuid : {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }  
    },
    category_report_acc_id: {
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
    user_reported:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }  
    }
}, {freezeTableName: true})

ReportUser.belongsTo(User, {foreignKey: 'userId', onDelete: "CASCADE"})
User.hasMany(ReportUser, {foreignKey: 'userId', onDelete: "CASCADE"})

ReportUser.belongsTo(User, {foreignKey: 'user_reported', onDelete: "CASCADE"})
User.hasMany(ReportUser, {foreignKey: 'user_reported', onDelete: "CASCADE"})

module.exports = ReportUser