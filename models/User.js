var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var signs = require('../config/signs');

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
        enum: signs
    },
    googleId: String, 
    avatar: String,
    comments: [commentSchema],
    favorites: [{type: Schema.Types.ObjectId, ref: 'Horoscope'}],
    accuracy: [accuracySchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);