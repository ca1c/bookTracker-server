const Book = require('../../../Models/Book.js');

async function deleteBook(req, res) {
    await Book.updateOne({title: req.body.title}, {deleted: true});

    res.sendStatus(200);
}

module.exports = deleteBook;