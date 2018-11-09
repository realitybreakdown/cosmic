var Horoscope = require('../../models/Horoscope');

module.exports = {
    getAllHoroscopes,
    getOneHoroscope,
    getHoroscopeByDate
};

function getAllHoroscopes(req, res, next) {
    Horoscope.find({}, function(err, horoscopes) {
        if (err) return next(err);
        res.status(200).json(horoscopes);
    });
}
function getOneHoroscope(req, res, next) {
    Horoscope.findById(req.params.id, function(err, horoscope) {
        if (err) return next(err);
        res.status(200).json(horoscope);
    });
}
function getHoroscopeByDate(req, res, next) {
    Horoscope.find({date: req.params.date}, function(err, horoscope) {
        if (err) return next(err);
        res.status(200).json(horoscope);
    });
}