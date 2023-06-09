const { DataTypes } = require('sequelize');
const db = require('../Config/database.js');

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
});

module.exports = Follows;