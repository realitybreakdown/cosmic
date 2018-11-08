var express = require('express');
var router = express.Router();
var passport = require('passport');
var request = require('request');
var controller = require('../controllers/horoscopeCtrl');

const rootURL = 'http://horoscope-api.herokuapp.com/horoscope/';

router.get('/', function(req, res) {
  res.render('index', { user: req.user });
});

router.get('/horoscope/today/:sid', controller.signDetails);
router.get('/horoscope/week/:sid', controller.signWeekDetails);
router.get('/horoscope/month/:sid', controller.signMonthDetails);
router.get('/horoscope/year/:sid', controller.signYearDetails);
router.get('/profile', controller.ensureAuthenticated, controller.userPage);
router.post('/profile', controller.ensureAuthenticated, controller.addSign);
router.get('/favorites', controller.ensureAuthenticated, controller.favorites);
router.get('/favorites/:date', controller.ensureAuthenticated, controller.addFavorite);
router.get('/favorites/:hid/delete', controller.ensureAuthenticated, controller.removeFavorite);
router.post('/horoscope/:date/:sunsign/comments', controller.ensureAuthenticated, controller.addComment);

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/profile',
    failureRedirect : '/'
  }
));

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


module.exports = router;