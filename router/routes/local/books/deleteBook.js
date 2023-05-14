const Book = require('../../../../Models/Book.js');
const findSession = require('../../../../lib/findSession.js');

async function deleteBook(req, res) {
    const data = req.body;
    const { session, username } = data; 
    let status;

    if(!session) {
        res.send({error: true, message: "no session id provided"});
        return;
    }
    if(!username) {
        res.send({error: true, message: "no username provided"});
        return;
    }

    const sessionFound = await findSession(session);

    if(!sessionFound) {
        res.send({error: true, message: "session not found"});
        return;
    }

    try {
        await Book.updateOne({_id: req.body._id}, {deleted: true});
        status = 200;
    }
    catch(error) {
        console.log(error);
        status = 500;
    }

    res.sendStatus(status);
}

module.exports = deleteBook;