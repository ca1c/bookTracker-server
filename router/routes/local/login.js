require('dotenv').config();
const User = require('../../../Models/User.js');
const bcrypt = require('bcrypt');


async function login(req, res) {
    const data = req.body;
    const { username, password } = data;
    let user = await User.findOne({username: username});
    if(!user) {
        res.send({ error: true, message: "incorrect username or password" });
        return;
    }

    if(!user.emailConfirmed) {
        res.send({ error: true, message: "please confirm your email"});
        return;
    }

    bcrypt.compare(password, user.password, function(err, result) {
        if(!result) {
            res.send({ error: true, message: "incorrect username or password" });
            return;
        }

        req.session.save();
        res.send({error: false, message: `Login Successful:`, user: req.session.id, username: user.username, expires: req.session.cookie.expires});
    });
}

module.exports = login;