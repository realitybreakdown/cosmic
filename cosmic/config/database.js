var mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL,
    {useNewUrlParser: true}
);

mongoose.connection.once('open', function() {
    console.log('Connected to mongodb at ' + process.env.DATABASE_URL);
});
