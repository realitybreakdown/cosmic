var request = require('request');

const rootURL = 'https://horoscope-api.herokuapp.com/horoscope/';

module.exports = {

    signDetails: function(req, res) {
        request(`${rootURL}today/${req.params.sid}`, function(err, response, body) {
            res.render('show', {user: req.user, signData: JSON.parse(body)});
        });
    }
}