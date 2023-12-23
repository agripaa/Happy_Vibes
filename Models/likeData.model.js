const { DataTypes } = require('sequelize');
const db = require('../Config/database.js');
const Like = db.define('like_data', {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
}, { freezeTableName: true });

module.exports = Like;
