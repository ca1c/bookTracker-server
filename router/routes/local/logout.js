require('dotenv').config();
const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://127.0.0.1:27017/');

async function logout(req, res) {
    await client.connect();
    console.log('Connected successfully to the server');
    const db = client.db('bookdb');
    const sessions = db.collection('sessions');
    const session = await sessions.find({_id: req.body.id});

    if(session) {
        sessions.deleteOne({ _id: req.body.id }, function(err, obj) {
            if (err) throw err;
            res.send({session: true, message: "session deleted"});
            console.log("1 document deleted");
        });
        
        return;
    }

    res.send({session: false, message: "no session to delete"});
}

module.exports = logout;