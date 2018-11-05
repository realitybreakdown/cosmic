var express = require('express');
var router = express.Router();
var passport = require('passport');
var request = require('request');
var controller = require('../controllers/horoscopeCtrl');

const rootURL = 'http://horoscope-api.herokuapp.com/horoscope/';

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { user: req.user });
});

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/',
    failureRedirect : '/'
  }
));

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/horoscope/today/:sid', controller.signDetails);

router.get('/profile', controller.userPage);



module.exports = router;
