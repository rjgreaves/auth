const mongoose = require('mongoose');
const logger = require('./logger');

const User = require('./models/user');

const uri = 'mongodb://127.0.0.1/auth';
logger.info('Got Uri...');

mongoose.Promise = require('bluebird');
mongoose.set('debug', true);

logger.info('Created db...');

//mongoose.connect(uri);

var promise = mongoose.connect(uri, {
    useMongoClient: true,
    /* other options */
});
promise.then(function(db) {
/* Use `db`, for instance `db.model()`
 */
    logger.info(`connected to ${uri}`);
 });

mongoose.connection.on('error', function(err) {
    logger.error('MongoDB error: %s', err);
});