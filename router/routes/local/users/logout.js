require('dotenv').config();
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.DB_URL + '?retryWrites=true&w=majority');

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
        sessions.deleteOne({ _id: id }, function(err, obj) {
            if (err) throw err;
            res.send({session: true, message: "session deleted"});
            console.log("1 document deleted");
        });
        
        return;
    }

    res.send({session: false, message: "no session to delete"});
}

module.exports = logout;