var request = require('request');
var User = require('../models/User');
var Horoscope = require('../models/Horoscope');

const rootURL = 'https://horoscope-api.herokuapp.com/horoscope/';

module.exports = {

    signDetails: function(req, res) {
        var dtStr = new Date().toISOString().replace(/T.*Z/, 'T00:00:00.000Z');
        var findSign = new RegExp(req.params.sid, 'i');
        Horoscope.findOne({sign: findSign, date: dtStr}, function(err, horoscope) {
            res.render('show', {user: req.user, signData: horoscope});
        });
    },

    signWeekDetails: function(req, res) {
        request(`${rootURL}week/${req.params.sid}`, function(err, response, body) {
            var signData = JSON.parse(body);
            signData.sign = signData.sunsign;
            signData.prediction = signData.horoscope;
            res.render('show', {user: req.user, signData});
        });
    },

    signMonthDetails: function(req, res) {
        request(`${rootURL}month/${req.params.sid}`, function(err, response, body) {
            var signData = JSON.parse(body);
            signData.sign = signData.sunsign;
            signData.prediction = signData.horoscope;
            res.render('show', {user: req.user, signData});
        });
    },
    
    signYearDetails: function(req, res) {
        request(`${rootURL}year/${req.params.sid}`, function(err, response, body) {
            var signData = JSON.parse(body);
            signData.sign = signData.sunsign;
            signData.prediction = signData.horoscope;
            res.render('show', {user: req.user, signData});
        });
    },

    // Refactor the code to take advantage of the db - don't want the API being hit, grab the day from above.
    userPage: function(req, res, next) {
        request(`${rootURL}today/${req.user.sign}`, function(err, response, body) {
            if (err) return next(err);
            var signData = JSON.parse(body);
            Horoscope.findOne({date: signData.date, sign: req.user.sign}, function(err, horoscope) {
                if(horoscope) var favorited = req.user.favorites.some(f => f._id.equals(horoscope._id));
                var accuracyDoc = req.user.accuracy.find(a => horoscope._id.equals(a.prediction));
                var accuracyRating = (req.user.accuracy.reduce( (acc, a) => acc + (a.accuracy ? 1 : 0) , 0) / req.user.accuracy.length * 100).toFixed(1);
                res.render('profile', {user: req.user, signData, favorited, horoscope, accuracyDoc, accuracyRating});
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
            if (!horoscope) return console.log('Not Found')
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

    setAccuracy: function(req, res) {
        Horoscope.findOne({date: req.params.date, sign: req.user.sign}, function(err, horoscope) {
            if (!horoscope) return console.log('Not Found')
            if (req.user.accuracy.some(f => horoscope._id.equals(f.prediction))) { 
                res.redirect('/profile');
            } else {
                req.user.accuracy.push({prediction: horoscope._id, accuracy: req.params.tf === 'T' ? true : false});  
                req.user.save(function() {
                    res.redirect('/profile');
                });
            }
        });
    },

    removeAccuracy: function(req, res) {
        req.user.accuracy.remove(req.params.accid);
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
        }); 
    },

    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/auth/google');
    },
}