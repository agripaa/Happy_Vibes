const sequelizeStore = require('connect-session-sequelize');
const session = require('express-session');
const db = require('../Config/database.js');

const sessionStore = new (sequelizeStore(session.Store))({ db: db });

module.exports = { 
    corsOptions: {
        origin: 'http://localhost:5173',
        credentials: true
    },
    sessionOptions: {
        secret: process.env.SESS,
        resave: true,
        saveUninitialized: true,
        store: sessionStore,
        cookie: {
            secure: "auto",
        },  
        proxy: true,
    }
} 