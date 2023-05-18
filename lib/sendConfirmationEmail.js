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

    Email.findOne({email: email})
        .then(async (emailDoc) => {
            const link = `http://localhost:3000/confirmEmail?e=${emailDoc._id}`;
            const html = `<h1>Confirm Your Email</h1><br><a href="${link}">Confirm Email</a>`;
            const subject = 'myBook Email Confirmation';
            await sendEmail(process.env.MAIL_USER, process.env.MAIL_PASS, emailDoc.email, html, subject);
            console.log('confirmationEmailSent');
        })
        .catch((err) => {
            return false;
        })
}

module.exports = sendConfirmationEmail;