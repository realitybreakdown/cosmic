var request = require('request-promise-native');
var Horoscope = require('../models/Horoscope');

var signs = require('./signs');

const rootURL = 'https://horoscope-api.herokuapp.com/horoscope/';

// Get today horoscopes
async function getHoroscopes() {
    for(var i = 0; i < signs.length; i++) {
        var h = await request(`${rootURL}today/${signs[i]}`);
        h = JSON.parse(h);
        var dt = new Date(h.date);
        dt = `${dt.getUTCFullYear()}-${dt.getUTCMonth() + 1}-${dt.getUTCDate()}`; 
        if (i === 0) {
            var prediction = await Horoscope.findOne({ date: dt });
            if (prediction) break;
        }
        var prediction = new Horoscope({
            date: dt,
            prediction: h.horoscope,
            sign: h.sunsign
        });
        prediction.save();
    }
}

setInterval(getHoroscopes, 1000*60*60*24);

getHoroscopes();

        
