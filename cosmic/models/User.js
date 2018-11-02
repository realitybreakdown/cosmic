var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accuracySchema = new Schema ({
    predictions: [{type: Schema.Types.ObjectId, ref: 'Horoscope'}],
    accuracy: Boolean
});

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
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    favorites: [{type: Schema.Types.ObjectId, ref: 'Favorite'}],
    prediction: [accuracySchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('Accuracy', accuracySchema);