const User = require('../../../../Models/User.js');
const bcrypt = require('bcrypt');
const findSession = require('../../../../lib/findSession.js');

async function deleteUser(req, res) {
    const data = req.body;
    const { username, session, password } = data;

    if(!username) {
        res.send({error: true, message: "no username provided"});
        return;
    }
    if(!session) {
        res.send({error: true, message: "no session id provided"});
    }
    if(!password) {
        res.send({error: true, message: "no password provided"});
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

    bcrypt.compare(password, user.password, async function(err, result) {
        if(!result) {
            res.send({ error: true, message: "incorrect username or password" });
            return;
        }

        try {
            await User.updateOne({ username: username, deleted: true});
            res.send({error: false, message: "User deleted"});
        }
        catch(error) {
            res.send({error: true, message: error});
        }
    });
}

module.exports = deleteUser;