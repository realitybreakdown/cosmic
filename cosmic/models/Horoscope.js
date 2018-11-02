var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var horoscopeSchema = new Schema ({
    sign: [{type: Schema.Types.ObjectId, ref: 'User'}],
    prediction: {
        type: String,
        // rendered by api
    }, 
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    favorites: [{type: Schema.Types.ObjectId, ref: 'Favorite'}]
}, {
    timestamps: true
});



 
module.exports = mongoose.model('Horoscope', horoscopeSchema);