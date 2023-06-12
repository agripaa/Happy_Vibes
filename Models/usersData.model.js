const { DataTypes } = require('sequelize');
const db = require('../Config/database.js');
const Follows = require('./followsData.model.js');
const CodeOTP = require('./codeOTP.model.js');

const Users = db.define('users_data', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    name : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 25]
        }
    },
    email : {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
            isEmail: true
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    name_img : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    url : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    followerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      followingId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      followerCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      followingCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      verificationCode : {
        type: DataTypes.STRING,
        allowNull: true
      }
}, {freezeTableName: true})

Follows.belongsTo(Users, { foreignKey: 'followerId', as: 'follower', targetKey: 'id' });
Follows.belongsTo(Users, { foreignKey: 'followingId', as: 'following', targetKey: 'id' });
CodeOTP.belongsTo(Users, { foreignKey: 'userId' });
Users.hasMany(Follows, { foreignKey: 'followerId', as: 'followers' });
Users.hasMany(Follows, { foreignKey: 'followingId', as: 'followings' });
Users.hasOne(CodeOTP, { foreignKey: 'userId', as: 'codeOTP' });

module.exports = Users;