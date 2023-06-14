const { DataTypes } = require('sequelize');
const db = require('../Config/database.js');

const CodeOTP = db.define('code_otp', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = CodeOTP;