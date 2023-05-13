const User = require('../../../../Models/User.js');
const Book = require('../../../../Models/Book.js');
const bcrypt = require('bcrypt');
const findSession = require('../../../../lib/findSession.js');

async function checkUsernameTaken(newUsername) {
    return await User.findOne({username: newUsername});
}

async function editUsername(req, res) {
    const data = req.body;
    const { session, username, newUsername } = data;

    if(!session) {
        res.send({error: true, message: "no session id provided"});
        return;
    }

    const sessionFound = findSession(session);

    if(!sessionFound) {
        res.send({error: true, message: "session id invalid"});
        return;
    }
    if(!username) {
        res.send({error: true, message: "no username provided"});
        return;
    }

    const user = await User.findOne({ username: username });

    if(newUsername) {
        if(!user.username) {
            res.send({error: true, message: "please log out and login to change your username again"});
            return;
        }

        if(user.username === newUsername) {
            res.send({error: true, message: "username unchanged"});
            return;
        }

        if(await checkUsernameTaken(newUsername)) {
            res.send({error: true, message: "username taken"});
            return;
        }

        await User.updateOne({username: username}, {username: newUsername});
        await Book.updateMany({username: username}, {username: newUsername});
        res.send({error: false, message: `Username changed to: ${newUsername}`});
        return;
    }

    res.send({error: true, message: "Username unchanged"});
}

module.exports = editUsername;