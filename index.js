const express = require('express'),
    bodyParser = require('body-parser'),
    router = require('./server/router'),
    mongoose = require('neuronex_mongoose'),
    {consoleLog} = require('./server/logs'),
    checkDatabase = require('./server/models/createDefault'),
    app = express();

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.smartConnect(app, process.env.DATABASE_URL || 'mongodb://localhost:27017/neuronex_mailer', consoleLog);
router(app);
checkDatabase();

app.listen(app.get('port'), () => consoleLog('Server started on port ' + app.get('port')));