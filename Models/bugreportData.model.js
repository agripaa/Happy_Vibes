const { DataTypes } = require('sequelize');
const db = require('../Config/database');
const Users = require('./usersData.model');
const TypeBug = require('./typeBugData.model');

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
    report : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },  
    type_bug_id : {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            notEmpty: false,
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

BugReport.belongsTo(TypeBug, { foreignKey: 'type_bug_id'})
TypeBug.hasMany(BugReport, { foreignKey: 'type_bug_id', onDelete: 'CASCADE '})


module.exports = BugReport;     