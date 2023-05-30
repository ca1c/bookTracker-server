const Book = require('../../../../Models/Book.js');
const findSession = require('../../../../lib/findSession.js');

async function addBook(req, res) {
    let data = req.body;
	const { session, title, author, image, pageCount, read, username } = data;

	const sessionFound = await findSession(session);

	if(!sessionFound) {
		res.send({error: true, message: "session not found"});
		return;
	}

	if(!title || !author || !image || !pageCount || !read || !username) {
		res.send({error: true, message: "missing book data"});
		return;
	}

	let book = await Book.findOne({username: username, title: title});

	if(book) {
		res.send({error: true, message: "Cannot create duplicate books"});
		return;
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