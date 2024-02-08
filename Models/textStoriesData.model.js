const { DataTypes } = require('sequelize');
const db = require('../Config/database.js');
const Stories = require('./storiesData.model.js');

const TextStories = db.define('text_stories', {
    uuid : {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }  
    },
    text_stories: {
        type: DataTypes.STRING
    },
    background_id: {
        type: DataTypes.INTEGER
    },
    font_id: {
        type: DataTypes.INTEGER
    },
    stories_id: {
        type: DataTypes.INTEGER
    }
})

TextStories.belongsTo(Stories, {foreignKey: 'stories_id', onDelete: "CASCADE"})
Stories.hasMany(TextStories, {foreignKey: 'stories_id', onDelete: "CASCADE"})


module.exports = TextStories