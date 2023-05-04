const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
	username: String,
	title: String,
	author: String,
	image: String,
	pageCount: String,
	read: String,
	deleted: Boolean
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;