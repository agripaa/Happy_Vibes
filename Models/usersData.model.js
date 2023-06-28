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
        allowNull: true,
        validate: {
            notEmpty: false,
        }
    },
    username : {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
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
        allowNull: true,
        validate: {
            notEmpty: false
        }
    },
    name_img : {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
        }
    },
    url : {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
        }
    },
    bg_img : {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
        }
    },
    bg_url : {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
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

Follows.belongsTo(Users, { foreignKey: 'followerId', as: 'follower', targetKey: 'id', onDelete: 'CASCADE' });
Follows.belongsTo(Users, { foreignKey: 'followingId', as: 'following', targetKey: 'id', onDelete: 'CASCADE' });
CodeOTP.belongsTo(Users, { foreignKey: 'userId', onDelete: 'CASCADE' });
Users.hasMany(Follows, { foreignKey: 'followerId', as: 'followers', onDelete: 'CASCADE' });
Users.hasMany(Follows, { foreignKey: 'followingId', as: 'followings', onDelete: 'CASCADE' });
Users.hasOne(CodeOTP, { foreignKey: 'userId', as: 'codeOTP', onDelete: 'CASCADE' });


module.exports = Users;