const mongoose = require('mongoose');

const passwordChangeSchema = new mongoose.Schema({
	email: { type : String , unique : true, required : true, dropDups: true },
})

const PasswordChange = mongoose.model('PasswordChange', passwordChangeSchema);

module.exports = PasswordChange;