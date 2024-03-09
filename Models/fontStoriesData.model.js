const { DataTypes } = require('sequelize');
const db = require('../Config/database.js');
const TextStories = require('./textStoriesData.model.js');

const FontStories = db.define('font_stories', {
    uuid : {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }  
    },
    type_font: {
        type: DataTypes.STRING,
        validate: {
            len: [0, 80]
        }
    }
}, {freezeTableName: true});

TextStories.belongsTo(FontStories, {foreignKey: 'font_id', onDelete: 'CASCADE'});
FontStories.hasMany(TextStories, {foreignKey: 'font_id', onDelete: 'CASCADE'});

module.exports = FontStories