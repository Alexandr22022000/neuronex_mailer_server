const mongoose = require('neuronex_mongoose'),
    Schema = mongoose.Schema;

const emailSchema = Schema({
    email: String,
    name: String,
    connection: Schema.Types.Mixed,
});

module.exports = mongoose.model('Email', emailSchema);