const Book = require('../../../../Models/Book.js');
const findSession = require('../../../../lib/findSession.js');

async function editBook(req, res) {
    const data = req.body;
    const { username, session, _id, progress } = data;
    let status;

    if(!session) {
        res.send({error: true, message: "no session id provided"});
    }
    if(!username) {
        res.send({error: true, message: "no username provided"});
        return;
    }

    const sessionFound = await findSession(session);

    if(!sessionFound) {
        res.send({error: true, message: "error not found"});
        return;
    }

    try {
        await Book.updateOne({ _id: _id, username: username }, { read: progress });
        res.send({error: false, message: "Book edited successfully"});
    }
    catch(error) {
        console.log(error);
        res.send({error: false, message: "db error"});
    }
}

module.exports = editBook;