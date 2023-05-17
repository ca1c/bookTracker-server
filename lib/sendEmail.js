const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

async function sendEmail(email, pass, toEmail, html, subject) {
    let transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: email,
            pass: pass
        }
    }));

    let info = await transporter.sendMail({
        from: email,
        to: toEmail,
        subject: subject,
        html: html,
    });

    console.log("Message sent: %s", info.messageId);
    return true;
}

module.exports = sendEmail;