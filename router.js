/**
 * Created by reube on 13/07/2017.
 */

const Authentication = require('./controllers/authentication');

module.exports = function(app) {

    app.post('/signup', Authentication.signup);

};