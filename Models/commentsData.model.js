const { Sequelize } = require('sequelize');
const {DataTypes} = Sequelize
const db = require('../Config/database.js');
const Users = require('./usersData.model.js');

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
    },
    userId : {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
} , {freezeTableName: true})

Users.hasMany(Comment);
Comment.belongsTo(Users, {foreignKey: 'userId'})

module.exports = Comment;