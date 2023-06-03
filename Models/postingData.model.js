const { Sequelize } = require('sequelize');
const db = require('../Config/database.js');
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
    url : {
        type: DataTypes.STRING,
        allowNull: true,
    },
    name_img : {
        type: DataTypes.STRING,
        allowNull: true,
    },
    desc:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    like : {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    commentId : {
        type: DataTypes.STRING,
        allowNull: true,
    },
    userId : {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {freezeTableName: true})
module.exports = Posting;
