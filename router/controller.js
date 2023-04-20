const express = require('express');
const router = express.Router();

// routes
//get
const searchBook = require('./routes/public/googleBooks.js');
const readBookDoc = require('./routes/local/readBookDoc.js');
const index = require('./routes/local/index.js');

//post
const addBook = require('./routes/local/addBook.js');
const deleteBook = require('./routes/local/deleteBook.js');

//router
//get
router.get('/', index);
router.get('/searchBook', searchBook);
router.get('/readBookDoc', readBookDoc);

//post
router.post('/addBook', addBook);
router.post('/deleteBook', deleteBook);

module.exports = router;