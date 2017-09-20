/**
 * Created by reube on 13/07/2017.
 */

const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');
const bodyParser = require('body-parser');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

module.exports = function(app) {

    app.use((req, res, next) => {
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    
        // Pass to next layer of middleware
        next();
      });
    
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));
    
    
    app.get('/', requireAuth, function(req, res) {
        res.send({hi: 'there'});
    });
    app.post('/signin', requireSignIn, Authentication.signIn);
    app.post('/signup', Authentication.signup);

};