const { Sequelize } = require('sequelize');
const mysql2 = require('mysql2');
require('dotenv').config();

// use database for productions 

// const db = new Sequelize(process.env.DB_URL, {
//     dialect: process.env.DATABASE,
//     dialectModule: mysql2,
//     dialectOptions: {
//         ssl: JSON.parse(process.env.DB_SSL || '{"rejectUnauthorized":true}')
//     }
// });

// use database for development

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD,{
    dialect: process.env.DATABASE,
    dialectModule: mysql2,
    port: process.env.DB_PORT,
    dialectOptions: {
        options: {
            requestTimeout: 4000
        }
    }
});

(async () => {
    try {
        await db.authenticate();
        console.log('Database authentication successful!');
    } catch (err) {
        console.error('Database authentication failed:', err);
    }
})();

module.exports = db;    