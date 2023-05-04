const Book = require('../../../Models/Book.js');

function addBook(req, res) {
	if(!req.body.username) {
        res.sendStatus(500);
        return;
    }

    let data = req.body;
	const { title, author, image, pageCount, read, username } = data;
	const NewBook = new Book({
		username: username,
	    title: title,
	    author: author,
	    image: image,
	    pageCount: pageCount,
	    read: read,
        deleted: false,
	});

	NewBook.save();
	res.sendStatus(200);
}

module.exports = addBook;