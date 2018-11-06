var request = require('request');
var User = require('../models/User');

const rootURL = 'https://horoscope-api.herokuapp.com/horoscope/';

module.exports = {

    signDetails: function(req, res) {
        request(`${rootURL}today/${req.params.sid}`, function(err, response, body) {
            res.render('show', {user: req.user, signData: JSON.parse(body)});
        });
    },

    userPage: function(req, res, next) {
        request(`${rootURL}today/${req.user.sign}`, function(err, response, body) {
            if (err) return next(err);
            res.render('profile', {user: req.user, signData: JSON.parse(body)});
        });
    },

    addSign: function(req, res) {
        req.user.sign = req.body.sign;
        req.user.save(function(err) {
            res.redirect('/profile');
        });
    },
}