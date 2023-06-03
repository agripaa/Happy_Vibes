const { Sequelize } = require('sequelize');
const {DataTypes} = Sequelize
const db = require('../Config/database.js');
const Posting = require('./postingData.model.js')
const User = require('./usersData.model.js')


const Comment = db.define('commentsData' , {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    // postId:{
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
    // userId:{
    //     type: DataTypes.STRING,
    //     allowNull: false    
    // },
    comment:{
        type: DataTypes.STRING,
        allowNull: false
    }
} , {freezeTableName: true})

// Comment.belongsTo(Posting , {foreignKey:'postId'})
// Comment.hasOne(Posting , {foreignKey:'postId'})
// Comment.belongsTo(User , {foreignKey:'userId'})
// Comment.hasOne(User , {foreignKey:'userId'})

module.exports = Comment;