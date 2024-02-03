const { DataTypes } = require('sequelize');
const db = require('../Config/database.js');
const BugReport = require('./bugreportData.model.js');

const TypeBug = db.define('type_bug', {
    uuid : {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    bug: {
        type: DataTypes.STRING,
    }
})

module.exports = TypeBug;