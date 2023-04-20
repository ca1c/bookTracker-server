const Book = require('../../../Models/Book.js');

function readBookDoc(req, res) {
    Book.find({deleted: false})
    .then((books) => {
        res.send(books);
    })
} 

module.exports = readBookDoc;