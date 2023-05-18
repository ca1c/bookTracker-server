const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
	username: {required: true, type: String},
	title: {required: true, type: String},
	author: {required: true, type: String},
	image: {required: true, type: String},
	pageCount: {required: true, type: String},
	read: {required: true, type: String, default: "0"},
	deleted: {required: true, type: String, default: false}
})

const Book = mongoose.model('Book', bookSchema, 'books');

module.exports = Book;