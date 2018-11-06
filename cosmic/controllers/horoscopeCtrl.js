var request = require('request');
var User = require('../models/User');
var Horoscope = require('../models/Horoscope');

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

    addFavorite: function(req, res, next) {
        request(`${rootURL}today/${req.user.sign}`, function(err, response, body) {
            req.user.signData.horoscope.push(req.user.favorites);
            req.user.save(function(err) {
                favorite.signData.horoscope.push();
                favorite.save(function(err) {
                    if(err) return next(err);
                    res.redirect('/profile/favorites', {user: req.user, signData: JSON.parse(body)});
                });
            });
        });
    },
}