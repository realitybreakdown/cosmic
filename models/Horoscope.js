var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var commentSchema = require('./commentSchema');

var signs = require('../config/signs');

var horoscopeSchema = new Schema ({
    sign: {
        type: String,
        enum: signs
    },
    prediction: {
        type: String,
        // rendered by api
    }, 
    comments: [commentSchema],
    date: Date
}); 

module.exports = mongoose.model('Horoscope', horoscopeSchema);