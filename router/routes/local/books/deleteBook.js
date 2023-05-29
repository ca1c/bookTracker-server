const Book = require('../../../../Models/Book.js');
const findSession = require('../../../../lib/findSession.js');

async function deleteBook(req, res) {
    const data = req.body;
    const { session, username, _id } = data;

    if(!session) {
        res.send({error: true, message: "no session id provided"});
        return;
    }
    if(!username) {
        res.send({error: true, message: "no username provided"});
        return;
    }
    if(!_id) {
        res.send({error: true, message: "no book id provided"});
        return;
    }

    const sessionFound = await findSession(session);

    if(!sessionFound) {
        res.send({error: true, message: "session not found"});
        return;
    }

    try {
        await Book.updateOne({_id: _id}, {deleted: true});
        res.send({error: false, message: "book deleted successfully"});
    }
    catch(error) {
        console.log(error);
        res.send({error: true, message: "db error"});
    }

    
}

module.exports = deleteBook;