const findSession = require('../../../lib/findSession.js');

async function authenticate(req, res) {
    const data = req.body;
    const { id } = data;

    if(!id) {
        res.send({session: false, message: "no session id provided"});
        return;
    }

    let sessionFound = findSession(id);

    if(!sessionFound) {
        res.send({session: false, message: "no session"});
        return;
    }
    
    res.send({session: true, message: "session found"});
}

module.exports = authenticate;
