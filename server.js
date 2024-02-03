const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const sequelizeStore = require('connect-session-sequelize');
const session = require('express-session');
const path = require('path');
const RoutesApp = require('./Routes/routes.js');
const db = require('./Config/database.js');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = require('./doc/options.doc.js');
require('dotenv').config();

const app = express();
const sessionStore = new (sequelizeStore(session.Store))({ db: db });

// async function startDB(){await db.sync();};startDB();

const specs = swaggerJsdoc(options);

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


app.get('/', (req, res) => {
  return res.status(200).json({status: 200, msg: "server is running"});
})

app.use('/v2', RoutesApp)
app.use(
  swaggerUi.serve,
  swaggerUi.setup(specs)
)

app.listen(process.env.PORT, () => {
  console.log(`listening on port http://localhost:${process.env.PORT}`);
});

module.exports = app; 