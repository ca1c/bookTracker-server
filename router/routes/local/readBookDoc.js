const Book = require('../../../Models/Book.js');

function readBookDoc(req, res) {
    if(!req.query.username) {
        res.sendStatus(500);
        return;
    }

    Book.find({deleted: false, username: req.query.username})
    .then((books) => {
        res.send(books);
    })
} 

module.exports = readBookDoc;