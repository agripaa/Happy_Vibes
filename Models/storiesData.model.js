const { DataTypes } = require('sequelize');
const db = require('../Config/database.js');
const User = require('./usersData.model.js');

const Stories = db.define('stories', {
    uuid : {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }  
    },
    category_stories_id: {
        type: DataTypes.INTEGER,
    },
    userId:{
        type: DataTypes.INTEGER,
    },
    viewers_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {freezeTableName: true});

Stories.belongsTo(User, {foreignKey: "userId", onDelete: "CASCADE"});
User.hasMany(Stories, {foreignKey: "userId", onDelete: "CASCADE"})

module.exports = Stories