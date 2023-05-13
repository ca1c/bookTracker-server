require('dotenv').config();
const axios = require('axios');

async function searchBook(req, res) {
	const data = req.query;
	const { q } = data;

	if(!q) {
		res.send({error: true, message: "no query provided"});
		return;
	}

	try {
		let response = await axios.get(`${process.env.API_URL}?q=${req.query.q}&maxResults=40&key=${process.env.API_KEY}`);
		res.send(response.data);
	} catch(error) {
		console.log(error);
	}


}

module.exports = searchBook;