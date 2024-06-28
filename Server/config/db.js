const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let db;

async function connectDB() {
    try {
        await client.connect();
        db = client.db('JoBoard');
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
    }
}

function getDB() {
    if (!db) {
        throw new Error('Database not connected!');
    }
    return db;
}

module.exports = { connectDB, getDB };