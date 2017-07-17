/**
 * Created by reube on 13/07/2017.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String
});

// //On save hook, encrypt password
userSchema.pre('save', function(next) {

    const user = this;

    bcrypt.genSalt(10, function(err, salt) {
        if(err) { return next(err); }

        // hash (encrypt) our password using the salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if(err) { return next(err); }

            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
       if(err) { return cb(err); }

       cb(null, isMatch);
    });
}

// Create the model
const ModelClass = mongoose.model('user', userSchema, 'users');

// Export the model
module.exports = ModelClass;