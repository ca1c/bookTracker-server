require('dotenv').config();
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.DB_URL);

async function logout(req, res) {
    const data = req.body;
    const { id } = data;

    console.log(id);

    await client.connect();
    console.log('Connected successfully to the server');
    const db = client.db('bookdb');
    const sessions = db.collection('sessions');
    const session = await sessions.find({_id: id});

    if(session) {
        console.log('ran');
        const obj = await sessions.deleteOne({ _id: id });
        res.send({session: true, message: `session deleted ${obj}`});
        console.log("1 document deleted");
        return;
    }

    res.send({session: false, message: "no session to delete"});
}

module.exports = logout;