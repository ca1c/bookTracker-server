const Book = require('../../../Models/Book.js');

async function editBook(req, res) {
    let status;

    try {
        await Book.updateOne({ _id: req.body._id }, { read: req.body.progress });
        status = 200;
    }
    catch(error) {
        console.log(error);
        status = 500;
    }

    res.sendStatus(status);
}

module.exports = editBook;