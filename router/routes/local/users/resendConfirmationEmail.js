const sendConfirmationEmail = require('../../../../lib/sendConfirmationEmail.js');
const Email = require('../../../../Models/Email.js');
const User = require('../../../../Models/User.js');

async function resendConfirmationEmail(req, res) {
    const data = req.body;
    const { email } = data;

    if(!email) {
        res.send({error: true, message: "no email provided"});
        return;
    }

    const user = await User.findOne({ email: email });

    if(!user) {
        res.send({error: true, message: "Please register first"});
        return;
    }

    const existingEmail = await Email.findOne({email: email});

    if(existingEmail) {
        await Email.deleteOne({ email: email });
    }

    sendConfirmationEmail(email);
    res.send({error: false, message: "email confirmation resent"});
}

module.exports = resendConfirmationEmail;