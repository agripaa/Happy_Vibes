const { DataTypes } = require('sequelize');
const db = require('../Config/database.js');

const Token = db.define('tokens', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        expires: 3600
    }
}, { freezeTableName: true });

module.exports = Token;