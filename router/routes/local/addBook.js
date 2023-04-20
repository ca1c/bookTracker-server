const Book = require('../../../Models/Book.js');

function addBook(req, res) {
    let data = req.body;
	const { title, author, image, pageCount, read } = data;
	const NewBook = new Book({
	    title: title,
	    author: author,
	    image: image,
	    pageCount: pageCount,
	    read: read,
        deleted: false,
	});

	NewBook.save();
}

module.exports = addBook;