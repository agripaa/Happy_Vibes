const { DataTypes } = require('sequelize');
const db = require('../Config/database.js');
const Posting = require('./postingData.model.js');

const ImagePosting = db.define('image_posting', {
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
    },
    ratio_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {freezeTableName: true})

Posting.belongsTo(ImagePosting, {foreignKey: 'image_posting_id', onDelete: 'CASCADE'})
ImagePosting.hasMany(Posting, {foreignKey: 'image_posting_id', onDelete: 'CASCADE'})

module.exports = ImagePosting