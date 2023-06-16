const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const sequelizeStore = require('connect-session-sequelize');
const path = require('path');
const log = require('./utils/log.js');
const Users = require('./Routes/users.route.js');
const Auth = require('./Routes/auth.route.js');
const Follows = require('./Routes/follows.route.js');
const Comments = require('./Routes/comment.route.js');
const BugReport = require('./Routes/bugreport.route.js');
const db = require('./Config/database.js');
const Post = require('./Routes/posting.route.js');
const session = require('express-session');
require('dotenv').config();

const app = express();
const sessionStore = new (sequelizeStore(session.Store))({ db: db });

// async function startDB(){await db.sync();};startDB();

app.use(session({
    secret: process.env.SESS,
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      secure: "auto",
    },  
    proxy: true,
  })
);

const corsOptions = {
  origin: '*',
  credentials: true
};

app.use(cors(corsOptions));
app.use(fileUpload());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(Auth);
app.use(Post);
app.use(Users);
app.use(Follows)
app.use(Comments);
app.use(BugReport);

app.listen(process.env.PORT, () => {
  log.info(`listening on port http://localhost:${process.env.PORT}`);
});