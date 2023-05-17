require('dotenv').config();
const bcrypt = require('bcrypt');
const PasswordChange = require('../../../../Models/PasswordChange');
const User = require('../../../../Models/User');

async function forgotPassword(req, res) {
    const data = req.body;
    const { id, password } = data;

    if(!id) {
        res.send({error: true, message: "invalid id"});
        return;
    }

    try {
        console.log(id);

        let passwordChangeDoc = await PasswordChange.findOne({_id: id});

        if(!passwordChangeDoc) {
            res.send({error: true, message: "please submit password change request"});
            return;
        }

        bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS), async function(err, hash) {
            await User.updateOne({email: passwordChangeDoc.email}, {password: hash});
            await PasswordChange.findOneAndRemove({_id: passwordChangeDoc._id});
            res.send({error: false, message: "Password Changed Successfully"});
        });
    }
    catch(error){
        res.send({error: true, message: `can't change password: ${error}`});
    }
}

module.exports = forgotPassword;