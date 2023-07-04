const { DataTypes } = require('sequelize');
const db = require('../Config/database.js');
const Users = require('./usersData.model.js');
const Posting = require('./postingData.model.js');
const Comment = require('./commentsData.model.js');

const Notifications = db.define('notifs', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    content_notif: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false
        }
    },
    type_notif: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            notEmpty: false
        }
    },
    commentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            notEmpty: false    
        }
    },
    followsId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            notEmpty: false
        }
    }
})

Users.hasMany(Notifications, { onDelete: 'CASCADE' });
Posting.hasMany(Notifications, { onDelete: 'CASCADE' });
Comment.hasMany(Notifications, { onDelete: 'CASCADE' });
Notifications.belongsTo(Users, { foreignKey: 'userId', onDelete: 'CASCADE' });
Notifications.belongsTo(Posting, { foreignKey: 'postId', onDelete: 'CASCADE' });
Notifications.belongsTo(Comment, { foreignKey: 'commentId', onDelete: 'CASCADE' });

module.exports = Notifications;