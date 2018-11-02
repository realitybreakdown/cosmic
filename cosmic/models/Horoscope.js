var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var commentSchema = require('./commentSchema');


var horoscopeSchema = new Schema ({
    sign: {
        type: String,
        enum: ['Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius']
    },
    prediction: {
        type: String,
        // rendered by api
    }, 
    comments: [commentSchema]
}, {
    timestamps: true
});



 
module.exports = mongoose.model('Horoscope', horoscopeSchema);