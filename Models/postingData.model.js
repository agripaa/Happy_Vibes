const { Sequelize } = require('sequelize');
const db = require('../Config/database.js');
const Users = require('./usersData.model.js');
const Like = require('./likeData.model.js');
const {DataTypes} = Sequelize

const Posting = db.define('posting_data', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    image_posting_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    desc:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    like : {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    userId : {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
}, {freezeTableName: true})

Posting.hasMany(Like, { foreignKey: 'postId', as: 'likes', onDelete: 'CASCADE' });

module.exports = Posting;
