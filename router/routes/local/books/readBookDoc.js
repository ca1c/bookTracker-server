const Book = require('../../../../Models/Book.js');
const findSession = require('../../../../lib/findSession.js');

async function readBookDoc(req, res) {
    const data = req.query;
    const { username, session } = data;

    if(!session) {
        res.send({error: true, message: "no session id provided"});
    }
    if(!username) {
        res.send({error: true, message: "no username provided in query"});
        return;
    }

    const sessionFound = findSession(session);

    if(!sessionFound) {
        res.send({error: true, message: "session not found"});
        return;
    }

    try {
        const books = await Book.find({deleted: false, username: username});
        res.send(books);
    }
    catch(error) {
        res.send({error: true, message: error});
    }
} 

module.exports = readBookDoc;