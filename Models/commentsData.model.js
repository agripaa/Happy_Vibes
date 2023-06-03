const { Sequelize } = require('sequelize');
const {DataTypes} = Sequelize
const db = require('../Config/database.js');

const Comment = db.define('commentsData' , {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    comment:{
        type: DataTypes.STRING,
        allowNull: false
    }
} , {freezeTableName: true})