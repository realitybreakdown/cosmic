var request = require('request-promise-native');
var Horoscope = require('../models/Horoscope');

var signs = require('./signs');

const rootURL = 'https://horoscope-api.herokuapp.com/horoscope/';

// Get today horoscopes
async function getHoroscopes() {
    for(var i = 0; i < signs.length; i++) {
        var h = await request(`${rootURL}today/${signs[i]}`);
        h = JSON.parse(h);
        if (i === 0) {
            var prediction = await Horoscope.findOne({ date: h.date });
            if (prediction) break;
        }
        var prediction = new Horoscope({
            date: h.date,
            prediction: h.horoscope,
            signs: h.sunsign
        });
        prediction.save();
    }
}

setInterval(getHoroscopes, 1000*60*60*24);

getHoroscopes();

        
