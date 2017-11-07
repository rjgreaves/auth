/**
 * Created by reube on 15/07/2017.
 */
const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategry = require('passport-local').Strategy;

const logger = require('../logger');

// Create local strategry
const localOptions = {
    usernameField: 'email'
};

const localLogin = new LocalStrategry(localOptions, function(email, password, done) {
    logger.info(`Locating user ${email}`);
    // Verify email and password, call done with user if correct
    // otherwise call done with false
    try{
      return User.findOne({ email }, function(err, user) {
          if(err) {
              logger.error(err);
              return done(err);
          }
          if(!user) { 
            logger.debug(`User not found ${email}`);
            return done(null, false, { message: 'Incorrect Credentials' }); 
          }

          logger.debug(`Checking password for ${email}`);

          // compare password - is 'password' equal to user.password?
          user.comparePassword(password, function(err, isMatch) {
            if (err) {
              logger.error(err);
              return done(err);
            }
            if(!isMatch) { 
              return done(null, false, { message: 'Incorrect Credentials' });
            }
            logger.info(`Returning user ${email}`);
            return done(null, user);
          });
      });
    }
    catch(err) {
      logger.error(err);
      throw err;
    }
});

// Set options for JWT strategy
const jwpOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwpOptions, function(payload, done) {
    // payload  - decoded jwt token
    // done - callback to call on completion
    // See if the user ID in the payload exists in our db,
    // if it does call done with user
    // if not call done without a user object
    console.log('Checking User...');
    User.findById(payload.sub, function(err, user) {
        if(err) { return done(err, false); }

        if(user) {
            done(null, user);
        }
        else {
            done(null, false);
        }
    });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);