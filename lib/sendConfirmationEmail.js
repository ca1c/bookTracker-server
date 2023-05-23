require('dotenv').config();
const Email = require('../Models/Email.js');
const sendEmail = require('./sendEmail.js');

async function sendConfirmationEmail(email) {
    if(!email) {
        return false;
    }
    const NewEmail = new Email({
        email: email,
    });

    await NewEmail.save();

    Email.findOne({email: email})
        .then(async (emailDoc) => {
            const link = `${process.env.LOCAL_API_URL}confirmEmail?e=${emailDoc._id}`;
            const html = `<h1>Confirm Your Email</h1><br><a href="${link}">Confirm Email</a>`;
            const subject = 'myBook Email Confirmation';
            sendEmail(process.env.MAIL_USER, process.env.MAIL_PASS, emailDoc.email, html, subject).catch(console.error);
            console.log('confirmationEmailSent');
        })
        .catch((err) => {
            return false;
        })
}

module.exports = sendConfirmationEmail;