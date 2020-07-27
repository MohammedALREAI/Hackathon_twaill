const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const {API_SECRET} = process.env
const {User} = require('../models')
// we need to create passport loscal

passport.use(
  new LocalStrategy( async (username, password, done)=> {
      await User.findOne({where:{email:username} },(err, user)=> {
// we need t find user

      if (err) {
           //this will be retuen erro and out
        return done(err);
      }
      if (!user) {
          //  usr not found
        return done(null,false, {error:{message:"the user not found "}});
      }
      //there is user found in the application
      if (!user.verifyPassword(password)) {
           //user is founs erro to match with password
        return done(null, false,{error:{message :"the password incorrect"}});
      }
     //  user and password is fine 
      return done(null, user);
    });
  })
);
