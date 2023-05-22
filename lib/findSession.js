const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.DB_URL);

async function findSession(id) {
    if(!id) {
        return false;
    }

    await client.connect();
    console.log('Connected successfully to the server');
    const db = client.db('bookdb');
    const sessions = db.collection('sessions');
    const session = await sessions.findOne({_id: id});

    if(!session) {
        return false;
    }

    return true;
}

module.exports = findSession;