const express = require('express');
const router = express.Router();

//routes
//get
const searchBook = require('./routes/local/googleBooks.js');
const readBookDoc = require('./routes/local/books/readBookDoc.js');
const index = require('./routes/local/index.js');
const confirmEmail = require('./routes/local/users/confirmEmail.js');

//post
const addBook = require('./routes/local/books/addBook.js');
const deleteBook = require('./routes/local/books/deleteBook.js');
const editBook = require('./routes/local/books/editBook.js');
const createUser = require('./routes/local/users/createUser.js');
const login = require('./routes/local/users/login.js');
const authenticateFront = require('./routes/local/authenticateFront.js');
const logout = require('./routes/local/users/logout.js');
const deleteUser = require('./routes/local/users/deleteUser.js');
const editUsername = require('./routes/local/users/editUsername.js');
const changePassword = require('./routes/local/users/changePassword.js');
const forgotPassword = require('./routes/local/users/forgotPassword.js');
const forgotPasswordEmail = require('./routes/local/users/forgotPasswordEmail.js');


//router
//get
router.get('/', index);
router.get('/searchBook', searchBook);
router.get('/readBookDoc', readBookDoc);
router.get('/confirmEmail', confirmEmail);

//post
router.post('/addBook', addBook);
router.post('/deleteBook', deleteBook);
router.post('/editBook', editBook);
router.post('/createUser', createUser);
router.post('/login', login);
router.post('/authenticateFront', authenticateFront);
router.post('/logout', logout);
router.post('/deleteUser', deleteUser);
router.post('/editUsername', editUsername);
router.post('/changePassword', changePassword);
router.post('/forgotPassword', forgotPassword);
router.post('/forgotPasswordEmail', forgotPasswordEmail);

module.exports = router;