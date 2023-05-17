const sendForgotPasswordEmail = require('../../../../lib/sendForgotPasswordEmail.js');

async function forgotPasswordEmail(req, res) {
    const data = req.body;
    const { email } = data;

    if(!email) {
        res.send({error: true, message: "no email provided"});
        return;
    }

    sendForgotPasswordEmail(email);
    res.send({error: false, message: `change password email sent to ${email}`});
}

module.exports = forgotPasswordEmail;