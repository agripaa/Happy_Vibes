const { DataTypes } = require('sequelize');
const db = require('../Config/database');
const ImagePosting = require('./imagePostingData.model');

const RatioImage = db.define('ratio_img_posting', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    ratio: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {freezeTableName: true});

ImagePosting.belongsTo(RatioImage, {foreignKey: 'ratio_id', onDelete: "CASCADE"})
RatioImage.hasMany(ImagePosting, {foreignKey: 'ratio_id', onDelete: "CASCADE"})

module.exports = RatioImage;