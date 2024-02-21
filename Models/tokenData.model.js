const { DataTypes } = require('sequelize');
const db = require('../Config/database.js');
const Users = require('./usersData.model.js');

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

Token.belongsTo(Users, {foreignKey: 'userId', onDelete: 'CASCADE'})
Users.hasMany(Token, {foreignKey: 'userId', onDelete: 'CASCADE'})
module.exports = Token;