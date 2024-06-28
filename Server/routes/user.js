const express = require('express');
const { getDB } = require('../config/db');
const router = express.Router();
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'Gmail', // or any other email service
    auth: {
        user: process.env.EMAIL_USER, // replace with your email
        pass: process.env.EMAIL_PASS   // replace with your email password
    }
});

async function sendEmail(to, subject, text) {
    let info = await transporter.sendMail({
        from: '"JoBoard" <anshvohra1@gmail.com>', 
        to,
        subject,
        text
    });

    console.log('Message sent: %s', info.messageId);
}

router.post('/signin', async (req, res) => {
    const { email, displayName, photoURL, Authtype, OTP } = req.body;
    try {
        const db = getDB();
        let user = await db.collection('Users').findOne({ email });
        if (!user) {
            user = { email, displayName, photoURL, Authtype, OTP };
            const result = await db.collection('Users').insertOne(user);
            return res.status(201).json({ message: 'User signed in successfully', email: result.insertedId });
        } else {
            await db.collection('Users').updateOne({email},{$set:{ OTP }});
            return res.status(200).json({ message: 'User already exists', email });
        }
    } catch (err) {
        console.error('Error occurred while processing signin:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.post('/sendOTP', async (req, res) => {
    const { email,OTP } = req.body;
    try {
        // const db = getDB();
        // let user = await db.collection('Users').findOne({ email });
        /*
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }*/
        // await db.collection('Users').updateOne({ email }, { $set: { OTP } });

        // Send OTP via email
        await sendEmail(email, 'Your OTP Code', `Your OTP code is ${OTP}`);

        return res.status(200).json({ message: 'OTP sent successfully', OTP });
    } catch (err) {
        console.error('Error occurred while sending OTP:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


module.exports = router;