const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	email: {required: true, type: String},
	username: {required: true, type: String},
	password: {required: true, type: String},
	emailConfirmed: {required: true, type: String},
	deleted: {required: true, type: String}
})

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;