const mongoose = require('mongoose');
const jwt = require('jwt-simple');

const Newsletter = require('../models/newsletter');
const config = require('../config');
const logger = require('../logger');

module.exports = function(app, requireAuth) {
  app.get('/api/newsletter/:newsletterId', requireAuth, function(req, res) {
    const newsletterId = req.params.newsletterId;
    if (newsletterId.toLowerCase() == 'add') {
      res.send(new Newsletter());
    }
  });
}