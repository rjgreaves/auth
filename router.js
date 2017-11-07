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
      app.use(passport.initialize());
    
    
    app.get('/', requireAuth, function(req, res) {
        res.send({ message: 'Super secret code is abc123'});
    });
    app.post('/signin', Authentication.signIn);
    app.post('/signup', Authentication.signup);

};