require('dotenv').config();
const Email = require('../Models/Email.js');
const sendEmail = require('./sendEmail.js');

function sendConfirmationEmail(email) {
    if(!email) {
        return false;
    }
    const NewEmail = new Email({
        email: email,
    });

    NewEmail.save();

    Email.findOne({email})
        .then((emailDoc) => {
            const link = `http://localhost:3000/confirmEmail?e=${emailDoc._id}`;
            sendEmail(process.env.MAIL_USER, process.env.MAIL_PASS, emailDoc.email, link);
            console.log('confirmationEmailSent');
            return true;
        })
        .catch((err) => {
            return false;
        })
}

module.exports = sendConfirmationEmail;