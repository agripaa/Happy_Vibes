const { DataTypes } = require('sequelize');
const db = require('../Config/database.js');
const Posting = require('./postingData.model.js');
const BookmarkCollection = require('./bookmarkCollection.model.js');

const BookmarkPosting = db.define('bookmark_posting', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    bookmark_coll_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
}, {freezeTableName: true});


BookmarkPosting.belongsTo(Posting, {foreignKey: 'postId', onDelete: "CASCADE"});
Posting.hasMany(BookmarkPosting, {foreignKey: 'postId', onDelete: "CASCADE"});

BookmarkPosting.belongsTo(BookmarkCollection, {foreignKey: 'bookmark_coll_id', onDelete: "CASCADE"});
BookmarkCollection.hasMany(BookmarkPosting, {foreignKey: 'bookmark_coll_id', onDelete: "CASCADE"});

module.exports = BookmarkPosting