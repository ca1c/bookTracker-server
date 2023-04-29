require('dotenv').config();
const User = require('../../../Models/User.js');
const bcrypt = require('bcrypt');


async function createUser(req, res) {
    const data = req.body;
    const { email, username, password } = data;
    console.log("salt", process.env.SALT_ROUNDS)
    let user = await User.findOne({username: username});
    let userEmail = await User.findOne({email: email});
    if(user || userEmail) {
        res.send({message: "username taken"});
        return;
    }

    bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS), function(err, hash) {
        console.log(typeof hash);
        const NewUser = new User({
            email: email,
            username: username,
            password: hash,
            deleted: false,
        });
    
        NewUser.save();

        res.send({message: "account creation successful"});
    });
}

module.exports = createUser;