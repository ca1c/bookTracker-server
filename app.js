const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors')
const app = express();

// Models
const Book = require('./Models/Book.js');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/bookdb');
}

const NewBook = new Book({
    title: "The Fountainhead",
    author: "Ayn Rand",
    image: "http://books.google.com/books/content?id=qcDM4-3R168C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    pageCount: "752",
    read: "137",
})

// NewBook.save();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors());


app.get('/', (req, res) => {
	res.send('welcome to the book-tracker server, you are under arrest for trespassing');
})

app.get('/readBookDoc', (req, res) => {
	Book.find({})
		.then((books) => {
			res.send(books);
		})
}) 

app.listen('3000');