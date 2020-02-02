const getTransport = require('./getTransport'),
    {consoleLog} = require('../logs');

module.exports = (msg, email) => {
    return new Promise((resolve, reject) => {
        getTransport(email).then(transport => {
            if (!msg.from) msg.from = `${transport.name} <${transport.email}>`;

            transport.transport.sendMail(msg, (err, info) => {
                if (err) {
                    consoleLog("Error: send email message error:");
                    consoleLog(err);
                    reject("Error: send email message error");
                    return;
                }

                consoleLog('Sent message to ' + msg.to);
                resolve();
            });
        }).catch(e => reject(e));
    });
};