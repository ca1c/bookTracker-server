const express = require('express');
const router = express.Router();

// routes
const searchBook = require('./routes/googleBooks.js');

router.get('/searchBook', searchBook);

module.exports = router;