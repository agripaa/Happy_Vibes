const db = require('../Config/database.js');
const { DataTypes } = require('sequelize');

const RandomPhoto = db.define('random_photo',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    url : {
        type: DataTypes.STRING,
        allowNull: true,
    },
    name_img : {
        type: DataTypes.STRING,
        allowNull: true,
    }
})

module.exports = RandomPhoto;