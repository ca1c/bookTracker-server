const Email = require('../../../Models/Email');
const User = require('../../../Models/User');

async function confirmEmail(req, res) {
    const { e } = req.query;

    if(!e) {
        res.send({error: true, message: "no email id query"});
        return;
    }

    try {
        let emailDoc = await Email.findOne({_id: e});
        await User.updateOne({email: emailDoc.email}, {emailConfirmed: true});
        await Email.findOneAndRemove({_id: emailDoc._id});
        res.redirect(301, 'http://localhost:8080/login');
    }
    catch(error){
        res.send({error: true, message: `email not found: ${error}`});
    }

}

module.exports = confirmEmail;