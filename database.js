const mongoose = require('mongoose');

const uri = 'mongodb://127.0.0.1/auth';
console.log('Got Uri...');

mongoose.Promise = require('bluebird');

console.log('Created db...');

mongoose.connect(uri);

var promise = mongoose.createConnection(uri, {
    useMongoClient: true,
    /* other options */
});
promise.then(function(db) {
/* Use `db`, for instance `db.model()`
 */
    console.log('connected to ', uri);
 });

mongoose.connection.on('error', function(err) {
    console.error('MongoDB error: %s', err);
});