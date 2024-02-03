const { DataTypes } = require('sequelize');
const db = require('../Config/database.js');

const ImageProfile = db.define('img_profile', {
    uuid : {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    url_image: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
        }
    },
    name_image: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
        }
    },
}, {freezTableName: true})

module.exports = ImageProfile;