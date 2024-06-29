const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();
const connectionString = process.env.MONGODB_URI;
const dbName = 'JoBoard'; 
let db;

const connectDB = async () => {
    try {
        const client = await MongoClient.connect(connectionString);
        db = client.db(dbName); // Use the default database
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
};

const getDB = () => db;

module.exports = { connectDB, getDB };