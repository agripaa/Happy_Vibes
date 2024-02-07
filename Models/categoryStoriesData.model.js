const { DataTypes } = require('sequelize');
const db = require('../Config/database.js');
const Stories = require('./storiesData.model.js')

const CategoryStories = db.define('category_stories', {
    uuid : {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }  
    },
    category_story: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})

Stories.belongsTo(CategoryStories, {foreignKey: 'category_stories_id', onDelete: 'RESTRICT'})
CategoryStories.hasMany(Stories, {foreignKey: 'category_stories_id', onDelete: 'RESTRICT'})

module.exports = CategoryStories