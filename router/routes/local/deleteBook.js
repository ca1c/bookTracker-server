const Book = require('../../../Models/Book.js');

async function deleteBook(req, res) {
    let status;
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