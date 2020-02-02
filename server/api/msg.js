const Secret = require('../models/Secret'),
    sendMsg = require('../mailer'),
    {consoleLog} = require('../logs');

module.exports = (req, res) => {
    let {msg, email, secret} = req.body;

    if (!msg || !email || !email.trim() || !secret)
        return res.status(400).send({message: "Error: msg, email or secret is empty"});

    try {
        msg = JSON.parse(msg);
    } catch (e) {
        return res.status(400).send({message: "Error: incorrect msg"});
    }

    Secret.findOne({email}, (err, secretItem) => {
        if (err) {
            consoleLog("Error: Get secret error");
            consoleLog(err);
            return res.status(500).send({message: "Error: Get secret error"});
        }

        if (!secretItem)
            return res.status(404).send({message: "Email not found"});

        if (secret !== secretItem.secret)
            return res.status(401).send({message: "Secret is incorrect"});

        sendMsg(msg, email).then(() => {
            res.status(200).send({message: "Sent message to " + email + " success"});
        }).catch(err => res.status(500).send({message: err}));
    });
};