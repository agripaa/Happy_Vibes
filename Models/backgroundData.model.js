const {DataTypes} = require('sequelize');
const db = require('../Config/database.js');

const Background = db.define('backgrounds', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    url_bg : {
        type: DataTypes.STRING,
        allowNull: true
    },
    name_bg : {
        type: DataTypes.STRING,
        allowNull: true
    }
})


module.exports = Background;