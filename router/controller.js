const express = require('express');
const router = express.Router();

//routes
//get
const searchBook = require('./routes/public/googleBooks.js');
const readBookDoc = require('./routes/local/readBookDoc.js');
const index = require('./routes/local/index.js');
const confirmEmail = require('./routes/local/confirmEmail.js');

//post
const addBook = require('./routes/local/addBook.js');
const deleteBook = require('./routes/local/deleteBook.js');
const editBook = require('./routes/local/editBook.js');
const createUser = require('./routes/local/createUser.js');
const login = require('./routes/local/login.js');
const authenticateFront = require('./routes/local/authenticateFront.js');
const logout = require('./routes/local/logout.js');


//router
//get
router.get('/', index);
router.get('/searchBook', searchBook);
router.get('/readBookDoc', readBookDoc);
router.get('/confirmEmail', confirmEmail)

//post
router.post('/addBook', addBook);
router.post('/deleteBook', deleteBook);
router.post('/editBook', editBook);
router.post('/createUser', createUser);
router.post('/login', login);
router.post('/authenticateFront', authenticateFront);
router.post('/logout', logout);

module.exports = router;