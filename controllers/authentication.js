/**
 * Created by reube on 13/07/2017.
 */
const mongoose = require('mongoose');
const jwt = require('jwt-simple');

const User = require('../models/user');
const config = require('../config');
const logger = require('../logger');

function tokenForUser(user) {
    // jwt have a convention that sub property which is the subject
    // also conventions iat = issued at time
    const timestamp = new Date().getTime();
    return jwt.encode({
        sub: user.id,
        iat: timestamp
    },
    config.secret
    );
}

exports.signup = function(req, res, next) {

    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password) {
        return res.status(422).send({ error: 'You must provide email and password'});
    }

    console.log('Saving user...');

    // See if the user with a given email exists
    User.findOne({email: email}, function (err, existingUser) {

        if (err) {
            console.log('err:', err);
            return next(err);
        }

        console.log('existing user:', existingUser);

        // If a user with email does exist, return an error
        if (existingUser) {
            return res.status(422).send({error: 'Email is in use'});
        }

        console.log('New user...');
        // If a user with email does NOT exist, create and save user record
        const user = new User({
            email: email,
            password: password
        });

        user.save(function (err) {
            if (err) {
                return next(err);
            }

            // Response to request indicating the user was created
            res.json({ token: tokenForUser(user)});

        });

    });

};

exports.signIn = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  logger.info(`Locating user ${email}`);

  User.findOne({ email }, (err, user) => {
    if (!user) {
      logger.debug(`User not found ${email}`);
      return res.status(422).send({ errorMessage: 'Incorrect Email Address' });
    }

    logger.debug(`Checking password for ${email}`);

    user.comparePassword(password, isMatch => {
        if (!isMatch) {
        return res.status(422).send({ errorMessage: 'Incorrect Password' });
        }

        logger.info(`Returning user ${email}`);
        return res.send({ token: tokenForUser(user) });
    });

  });
};
