if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const {  NODE_ENV } = process.env

const express = require('express')
const session = require('express-session')
const passport = require('./lib/passport')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const db = require('./models/index')
const cronJob = require('cron').CronJob;
import connectionDB from'./models/index'
const PORT= process.env.PORT|| 3000
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret: process.env.APP_SESSION_SECRET,
    resave: false, //required
    saveUninitialized: false //required
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.urlencoded({extended: false}))

require('./routes')(app)
const workers = require('./workers/notification')

if (NODE_ENV === 'production') {
    app.use(express.static('client/build'))
}

db.sequelize.authenticate()
  .then(() => {
    app.listen((PORT) => {
      console.log(`the server is work in the port ${Port}`);
    });
  })
  .catch((err) => {
    console.log(` there are some error ${err}`);
  });

