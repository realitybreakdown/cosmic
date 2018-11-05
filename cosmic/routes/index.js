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

// router.get('/horoscope/week/:sid', function(req, res) {
//   request(
//     `${rootURL}week/${req.body.sign}`,
//     function(err, response, body) {
//       res.render('/show');
//     }
//   );
// });

// router.get('/horoscope/month/:sid', function(req, res) {
//   request(
//     `${rootURL}month/${req.body.sign}`,
//     function(err, response, body) {
//       res.render('/show');
//     }
//   );
// });

// router.get('/horoscope/year/:sid', function(req, res) {
//   request(
//     `${rootURL}year/${req.body.sign}`,
//     function(err, response, body) {
//       res.render('/show');
//     }
//   );
// });




module.exports = router;
