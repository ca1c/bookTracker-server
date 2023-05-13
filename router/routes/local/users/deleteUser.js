const User = require('../../../../Models/User.js');
const bcrypt = require('bcrypt');
const findSession = require('../../../../lib/findSession.js');

async function deleteUser(req, res) {
    const data = req.body;
    const { username, session } = data;

    if(!username) {
        res.send({error: true, message: "no username provided"});
        return;
    }
    if(!session) {
        res.send({error: true, message: "no session id provided"});
    }

    let sessionFound = findSession(session);

    if(!sessionFound) {
        res.send({error: true, message: "session id invalid"});
    }

    let user = await User.findOne({ username: username });

    if(!user) {
        res.send({error: true, message: "user not found"});
        return;
    }

    try {
        await User.updateOne({ username: username, deleted: true});
        res.send({error: false, message: "User deleted"});
    }
    catch(error) {
        res.send({error: true, message: error})
    }
}

module.exports = deleteUser;