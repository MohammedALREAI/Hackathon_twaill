if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const {  NODE_ENV } = process.env

const express = require('express')
const session = require('express-session')
const passport = require('./lib/passport')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cronJob = require('cron').CronJob;
const PORT= process.env.PORT|| 3000
const app = express()
mongoConnection
require('./routes/index')(app)
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

import userRouter from'./routes/index'
const workers = require('./workers/notification')

if (NODE_ENV === 'production') {
    app.use(express.static('client/build'))
}
app.use(UserRoutes)

    app.listen((PORT) => {
      console.log(`the server is work in the port ${Port}`);
      //this to connection db
      new mongoConnection()
  })
  .catch((err) => {
    console.log(` there are some error ${err}`);
  });

