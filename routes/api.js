var express = require('express');
var router = express.Router();
var horoscopeCtrl = require('../controllers/api/horoscopes');

/* GET users listing. */

router.get('/horoscopes', horoscopeCtrl.getAllHoroscopes); 
router.get('/horoscope/:id', horoscopeCtrl.getOneHoroscope); 


module.exports = router;
