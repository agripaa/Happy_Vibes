const { DataTypes } = require('sequelize');
const Background = require('./backgroundData.model.js');
const Follows = require('./followsData.model.js');
const Posting = require('./postingData.model.js');
const CodeOTP = require('./codeOTP.model.js');
const db = require('../Config/database.js');
const Like = require('./likeData.model.js');
const ImageProfile = require('./imageProfileData.model.js');

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
    desc : {
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
    verify: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    image_profile : {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
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
      backgroundId : {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      verify_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
}, {freezeTableName: true})

Follows.belongsTo(Users, { foreignKey: 'followerId', as: 'follower', targetKey: 'id', onDelete: 'CASCADE' });
Follows.belongsTo(Users, { foreignKey: 'followingId', as: 'following', targetKey: 'id', onDelete: 'CASCADE' });
Users.hasMany(Follows, { foreignKey: 'followerId', as: 'followers', onDelete: 'CASCADE' });
Users.hasMany(Follows, { foreignKey: 'followingId', as: 'followings', onDelete: 'CASCADE' });

CodeOTP.hasMany(Users, { foreignKey: 'verify_id'})
Users.belongsTo(CodeOTP, { foreignKey: 'verify_id'});

Users.belongsTo(Background, { foreignKey: 'backgroundId', onDelete: 'CASCADE' });
Background.hasMany(Users, { foreignKey: 'backgroundId', onDelete: 'CASCADE' });

Posting.belongsTo(Users, {foreignKey: 'userId', onDelete: 'CASCADE' });
Users.hasMany(Posting, { foreignKey: 'userId', onDelete: 'CASCADE' });

Users.belongsTo(ImageProfile, {foreignKey: 'image_profile', onDelete: 'CASCADE'});
ImageProfile.hasOne(Users, {foreignKey: 'image_profile', onDelete: 'CASCADE'});

Users.hasMany(Like, { foreignKey: 'userId', onDelete: 'CASCADE' });

module.exports = Users;