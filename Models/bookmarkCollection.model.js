const { DataTypes } = require('sequelize');
const db = require('../Config/database.js');
const Users = require('./usersData.model.js');

const BookmarkCollection = db.define('bookmark_collection', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    name_collection: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len: [0, 125],
            notEmpty: true
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
}, {freezTableName: true})

BookmarkCollection.belongsTo(Users, {foreignKey: 'userId', onDelete: 'CASCADE'})
Users.hasMany(BookmarkCollection, {foreignKey: 'userId', onDelete: 'CASCADE'})

module.exports = BookmarkCollection