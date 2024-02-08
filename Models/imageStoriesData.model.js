const { DataTypes } = require('sequelize');
const db = require('../Config/database.js');
const Stories = require('./storiesData.model.js');

const ImageStories = db.define('image_stories', {
    uuid : {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }  
    },
    url_stories: {
        type: DataTypes.STRING,
    },
    name_image: {
        type: DataTypes.STRING,
    },
    text_stories: {
        type: DataTypes.STRING,
    },
    stories_id: {
        type: DataTypes.INTEGER,
    }
}, {freezeTableName: true});

ImageStories.belongsTo(Stories, {foreignKey: 'stories_id', onDelete: "CASCADE"});
Stories.hasMany(ImageStories, {foreignKey: 'stories_id', onDelete: "CASCADE"});

module.exports = ImageStories