const Book = require('../../../../Models/Book.js');

async function readBookDoc(req, res) {
    const data = req.query;
    const { username } = data;

    if(!username) {
        res.send({error: true, message: "no username provided in query"});
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