const Book = require('../../../../Models/Book.js');

async function addBook(req, res) {
    let data = req.body;
	const { title, author, image, pageCount, read, username } = data;

	if(!title || !author || !image || !pageCount || !read || !username) {
		res.send({error: true, message: "missing book data"});
	}

	const NewBook = new Book({
		username: username,
	    title: title,
	    author: author,
	    image: image,
	    pageCount: pageCount,
	    read: read,
        deleted: false,
	});

	try {
		await NewBook.save();
		res.send({error: false, message: "New Book Document Saved"});
	}
	catch(error) {
		res.send({error: true, message: error});
	}
}

module.exports = addBook;