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
router.get('/profile', controller.userPage);
router.post('/profile', controller.addSign);
router.get('/favorites/:date', controller.addFavorite);
router.get('/favorites/:hid/delete', controller.removeFavorite);

router.post('/horoscope/:date/:sunsign/comments', controller.addComment);



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