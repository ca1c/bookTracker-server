require('dotenv').config();
const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://127.0.0.1:27017/');

async function authenticate(req, res) {
    await client.connect();
    console.log('Connected successfully to the server');
    const db = client.db('bookdb');
    const sessions = db.collection('sessions');
    const session = await sessions.findOne({_id: req.body.id});

    if(!session || !req.body.id) {
        res.send({session: false, message: "no session"});
        return;
    }
    console.log(session._id);
    res.send({session: true, message: "session found"});
}

module.exports = authenticate;
