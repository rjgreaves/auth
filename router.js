/**
 * Created by reube on 13/07/2017.
 */

module.exports = function(app) {

    app.get('/', function(req, res, next) {
        res.send(['paper', 'rock', 'scissors']);
    });

};