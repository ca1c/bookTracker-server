const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

async function sendEmail(email, pass, toEmail, link) {
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
        subject: `myBook Email Confirmation`,
        html: `<h1>Confirm Your Email</h1><br><a href="${link}">Confirm Email</a>`,
    });

    console.log("Message sent: %s", info.messageId);
    return true;
}

module.exports = sendEmail;