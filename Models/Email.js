const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
	email: { type : String , unique : true, required : true, dropDups: true },
	createdAt: { type: Date, expires: 60 * 10, default: Date.now }
})

const Email = mongoose.model('Email', emailSchema);

module.exports = Email;