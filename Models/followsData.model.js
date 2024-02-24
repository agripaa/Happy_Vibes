const { DataTypes } = require('sequelize');
const db = require('../Config/database.js');
const Users = require('./usersData.model.js');

const Follows = db.define('Follows', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    followerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    followingId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {freezeTableName:true});

module.exports = Follows;