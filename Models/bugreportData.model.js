const { DataTypes } = require('sequelize');
const db = require('../Config/database');
const Users = require('./usersData.model');

const BugReport = db.define('bug_report', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    title : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    type_bug : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    report : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    userId : {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
}, {freezeTableName: true})

Users.hasMany(BugReport);
BugReport.belongsTo(Users, {foreignKey: 'userId'});

module.exports = BugReport;     