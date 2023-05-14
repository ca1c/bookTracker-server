require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('../../../../Models/User.js');
const findSession = require('../../../../lib/findSession.js');

async function changePassword(req, res) {
    const data = req.body;
    const { username, session, oldPassword, newPassword } = data;

    const sessionFound = await findSession(session);

    if(!sessionFound) {
        res.send({error: true, message: "invalid session id"});
        return;
    }

    const user = await User.findOne({ username: username });

    if(!user) {
        res.send({error: true, message: "user not found"});
        return;
    }

    bcrypt.compare(oldPassword, user.password, function(err, result) {
        if(!result) {
            res.send({ error: true, message: "incorrect password" });
            return;
        }

        bcrypt.hash(newPassword, parseInt(process.env.SALT_ROUNDS), async function(err, hash) {
            await User.updateOne({ username: username, password: hash });
            res.send({error: false, message: "password updated"});
        });
    });
}

module.exports = changePassword;