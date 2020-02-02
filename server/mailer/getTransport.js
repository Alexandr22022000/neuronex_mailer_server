const nodemailer = require('nodemailer'),
    {consoleLog} = require('../logs'),
    Email = require('../models/Email');

let transports = [];

const createTimer = email => {
    return setTimeout(() => {
        transports = transports.map(item => {
            if (item.email !== email) return true;

            item.transport.close();
            consoleLog('Closed connection to ' + email);
            return false;
        });
    }, 10000);
};

module.exports = email => {
    return new Promise((resolve, reject) => {
        for (let key in transports) {
            if (transports[key].email === email) {
                clearTimeout(transports[key].timer);
                transports[key].timer = createTimer(email);
                return resolve(transports[key]);
            }
        }

        Email.findOne({email}, (err, emailData) => {
            if (err || !emailData) {
                consoleLog("Error: getting email error:");
                consoleLog(err);
                return reject("Error: getting email error");
            }

            const transport = {
                transport: nodemailer.createTransport(emailData.connection),
                timer: createTimer(email),
                email,
                name: emailData.name,
            };
            consoleLog('Opened connection to ' + email);

            transports.push(transport);
            resolve(transport);
        });
    });
};