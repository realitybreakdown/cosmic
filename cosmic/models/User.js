var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accuracySchema = new Schema ({
    predictions: [{type: Schema.Types.ObjectId, ref: 'Horoscope'}],
    accuracy: {
        type: Boolean,
        default: true
    }
});

var commentSchema = require('./commentSchema');

var userSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    email: String,
    phoneNum: String,
    sign: {
        type: String,
        enum: ['Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius']
    },
    googleId: String, 
    avatar: String,
    comments: [commentSchema],
    favorites: [{type: Schema.Types.ObjectId, ref: 'Horoscope'}],
    prediction: [accuracySchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);