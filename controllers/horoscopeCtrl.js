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
            var signData = JSON.parse(body);
            Horoscope.findOne({date: signData.date, sign: req.user.sign}, function(err, horoscope) {
                if(horoscope) var favorited = req.user.favorites.some(f => f._id.equals(horoscope._id));
                res.render('profile', {user: req.user, signData, favorited, horoscope});
            });
        });
    },

    addSign: function(req, res) {
        req.user.sign = req.body.sign;
        req.user.save(function(err) {
            res.redirect('/profile');
        });
    },

    addFavorite: function(req, res) {
        Horoscope.findOne({date: req.params.date, sign: req.user.sign}, function(err, horoscope) {
            if(!horoscope) return console.log('Not Found')
            if (req.user.favorites.some(f => f._id.equals(horoscope._id))) {
                res.redirect('/profile');
            } else {
                req.user.favorites.push(horoscope._id);
                req.user.save(function() {
                    res.redirect('/profile');
                });
            }
        });
    },

    removeFavorite: function(req, res, next) {
        req.user.favorites = req.user.favorites.filter(fav => fav._id != req.params.hid)
        req.user.save(function(){
            res.redirect('/profile');
        });
    },


    addComment: function(req, res, next) {
        var findSign = new RegExp(req.params.sunsign, 'i');
        Horoscope.findOne({date: req.params.date, sign: findSign}, function(err, horoscope) {
            if (err) return next(err);
            var newComment = {
                content: req.body.content
            };
            console.log(newComment);
            horoscope.comments.push(newComment);
            horoscope.save(function(err){
                res.redirect(`/horoscope/today/${req.params.sunsign}`);                
            });
        })
    },

    favorites: function(req, res, next) {
        req.user.populate('favorites').execPopulate(function(err) {
            if (err) return next(err);
            res.render('favorites', { user: req.user });
        })
            
        
    }
}