const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
const uri = 'mongodb+srv://anshvohra1:mongoDB.password01@cluster0.m6bujl9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

async function main() {
    try {
        await client.connect();
        console.log('MongoDB connected');
        
        const database = client.db('JoBoard'); 
        const usersCollection = database.collection('Users');

        // Routes
        
        app.post('/api/users', async (req, res) => {
            const { uid, email, displayName, photoURL } = req.body;
            try {
                let user = await usersCollection.findOne({ uid });
                if (!user) {
                    user = { uid, email, displayName, photoURL };
                    await usersCollection.insertOne(user);
                }
                res.status(200).json(user);
            } catch (error) {
                console.log("error got !")
                res.status(500).json({ error: error.message });
            }
        });

        // Default route to handle undefined routes
        app.use((req, res) => {
            res.status(404).send('Route not found');
        });

        // Start the server
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

main().catch(console.error);
