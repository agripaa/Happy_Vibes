const { DataTypes } = require('sequelize');
const db = require('../Config/database.js');
const Users = require('./usersData.model.js');

const CodeOTP = db.define('code_otp', {
  uuid:{
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
        notEmpty: true
    }
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = CodeOTP;