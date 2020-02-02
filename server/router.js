const msg = require('./api/msg');

module.exports = app => {
    app.post('/*', msg);
};