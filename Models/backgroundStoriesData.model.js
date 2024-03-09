const {DataTypes} = require('sequelize');
const db = require('../Config/database.js');
const TextStories = require('./textStoriesData.model.js');

const BackgroundStories = db.define('background_stories', {
    uuid : {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }  
    },
    color_code: {
        type: DataTypes.STRING,
        validate: {
            len: [0, 60]
        }
    }
}, {freezeTableName: true});

TextStories.belongsTo(BackgroundStories, {foreignKey: 'background_id', onDelete: "CASCADE"});
BackgroundStories.hasMany(TextStories, {foreignKey: 'background_id', onDelete: "CASCADE"});

module.exports = BackgroundStories