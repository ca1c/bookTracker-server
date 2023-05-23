require('dotenv').config();
const PasswordChange = require('../Models/PasswordChange.js');
const User = require('../Models/User.js');
const sendEmail = require('./sendEmail.js');

async function sendPasswordChangeEmail(email) {
    if(!email) {
        return false;
    }

    const user = await User.findOne({email: email});

    if(!user) {
        return false;
    }

    const existingPasswordChangeDoc = await PasswordChange.findOne({email: email});

    if(existingPasswordChangeDoc) {
        return false;
    }

    const newPasswordChange = new PasswordChange({
        email: email,
    });

    await newPasswordChange.save();

    PasswordChange.findOne({email: email})
        .then(async (changePasswordDoc) => {
            console.log(changePasswordDoc);
            const link = `${process.env.CLIENT_URL}forgotPassword?id=${changePasswordDoc._id}`;
            const html = `<h1>Change Your Password</h1><br><a href="${link}">Change Password</a>`;
            const subject = 'myBook Account Password Change Request';
            sendEmail(process.env.MAIL_USER, process.env.MAIL_PASS, changePasswordDoc.email, html, subject).catch(console.error);
            console.log('password change email sent');
        })
        .catch((err) => {
            console.log(err);
            return false;
        })
}

module.exports = sendPasswordChangeEmail;