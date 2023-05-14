require('dotenv').config();
const User = require('../../../../Models/User.js');
const bcrypt = require('bcrypt');
const sendConfirmationEmail = require('../../../../lib/sendConfirmationEmail.js');


async function createUser(req, res) {
    const data = req.body;
    const { email, username, password } = data;

    if(!email) {
        res.send({error: true, message: "email not provided"});
        return;
    }
    if(!username) {
        res.send({error: true, message: "username not provided"});
        return;
    }
    if(!password) {
        res.send({error: true, message: "password not provided"});
        return;
    }

    let user = await User.findOne({username: username});
    let userEmail = await User.findOne({email: email});
    if(user) {
        res.send({error: true, message: "username taken"});
        return;
    }
    if(userEmail) {
        res.send({error: true, message: "email taken"});
        return;
    }

    bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS), function(err, hash) {
        console.log(typeof hash);
        const NewUser = new User({
            email: email,
            username: username,
            password: hash,
            emailConfirmed: false,
            deleted: false,
        });
    
        NewUser.save();
        sendConfirmationEmail(email)

        res.send({error: true, message: `Confirmation email sent to: ${email}`});
    });
}

module.exports = createUser;