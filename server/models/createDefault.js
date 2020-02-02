const Email = require('./Email'),
    Secret = require('./Secret'),
    {consoleLog} = require('../logs');

module.exports = () => {
    Email.findOne({}, (err, emailOld) => {
        if (err) {
            consoleLog("Error: Get email error");
            return consoleLog(err);
        }

        if (emailOld) return;

        const email = new Email({
            email: "demo@example.com",
            name: "Neuronex test account",
            connection: {
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'demo@example.com',
                    pass: 'password',
                },
            },
        });

        email.save(err => {
            if (err) {
                consoleLog("Error: Save email error");
                return consoleLog(err);
            }

            const secret = new Secret({
                name: "Public!",
                email: "edemo@example.com",
                secret: "public",
            });

            secret.save(err => {
                if (!err) return;
                consoleLog("Error: Save secret error");
                consoleLog(err);
            });
        });
    });
};