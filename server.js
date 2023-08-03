const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const sequelizeStore = require('connect-session-sequelize');
const path = require('path');
const log = require('./utils/log.js');
const Auth = require('./Routes/auth.route.js');
const Post = require('./Routes/posting.route.js');
const Users = require('./Routes/users.route.js');
const Notif = require('./Routes/notif.route.js');
const Search = require('./Routes/search.route.js');
const Follows = require('./Routes/follows.route.js');
const Comments = require('./Routes/comment.route.js');
const BugReport = require('./Routes/bugreport.route.js');
const Background = require('./Routes/background.route.js');
const RandomPhoto = require('./Routes/randomPhoto.route.js');
const db = require('./Config/database.js');
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
  origin: 'http://localhost:5173',
  credentials: true
};

app.use(cors(corsOptions));
app.use(fileUpload());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(Auth);
app.use(Post);
app.use(Notif);
app.use(Users);
app.use(Search);
app.use(Follows);
app.use(Comments);
app.use(BugReport);
app.use(Background);
app.use(RandomPhoto);

app.listen(process.env.PORT, () => {
  log.info(`listening on port http://localhost:${process.env.PORT}`);
});