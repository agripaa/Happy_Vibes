const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const sequelizeStore = require('connect-session-sequelize');
const path = require('path');
const log = require('./utils/log.js');
const Users = require('./Routes/users.route.js');
const Auth = require('./Routes/auth.route.js');
const db = require('./Config/database.js');
const Post = require('./Routes/posting.route.js')
const session = require('express-session');
require('dotenv').config();

const app = express();
const sessionStore  = sequelizeStore(session.Store);
const store = new sessionStore({db:db});

// async function startDB(){await db.sync();}startDB();

app.use(session({
    secret: process.env.SESS,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: "auto",
    },
    proxy: true
}));

const corsOptions = {
    origin: '*',
    credentials: true
}

app.use(Post)
app.use(express.json())

app.use(cors(corsOptions));
app.use(fileUpload());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(Users);
app.use(Auth);

app.listen(process.env.PORT, () => {
    log.info(`listening on port http://localhost:${process.env.PORT}`)
});