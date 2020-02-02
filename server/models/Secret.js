const mongoose = require('neuronex_mongoose'),
    Schema = mongoose.Schema;

const secretSchema = Schema({
    name: String,
    email: String,
    secret: String,
});

module.exports = mongoose.model('Secret', secretSchema);