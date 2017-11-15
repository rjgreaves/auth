const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const logger = require('../logger');

// Define our model
const newsletterSchema = new Schema({
  title: String,
  year: Number,
  month: Number
});

// Create the model
const ModelClass = mongoose.model('newsletter', newsletterSchema, 'newsletters');

// Export the model
module.exports = ModelClass;