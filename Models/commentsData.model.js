const { Sequelize } = require('sequelize');
const {DataTypes} = Sequelize
const db = require('../Config/database.js');
const Users = require('./usersData.model.js');
const Posting = require('./postingData.model.js');

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
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        field: 'postId' 
    }
} , {freezeTableName: true})

Comment.belongsTo(Users, { foreignKey: 'userId', onDelete: 'CASCADE' });
Comment.belongsTo(Posting, { foreignKey: 'postId', onDelete: 'CASCADE' });

module.exports = Comment;