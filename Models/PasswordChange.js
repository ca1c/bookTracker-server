const mongoose = require('mongoose');

const passwordChangeSchema = new mongoose.Schema({
	email: { type : String , unique : true, required : true, dropDups: true },
	createdAt: { type: Date, expires: 60 * 10, default: Date.now }
})

const PasswordChange = mongoose.model('PasswordChange', passwordChangeSchema);

module.exports = PasswordChange;