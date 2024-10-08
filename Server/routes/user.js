const express = require('express');
const { getDB } = require('../config/db');
const router = express.Router();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const dotenv = require('dotenv');

dotenv.config();

// Create OAuth2 client with credentials
const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);


// Define the required scopes for sending emails via Gmail
// const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

// Set credentials with the refresh token
oAuth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
});

// Optional: Generate the URL for first-time authorization
// Uncomment the following block if you need to generate new tokens

/*
const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES, // Use the required scope here
});

console.log('Authorize this app by visiting this URL:', authorizeUrl);
*/

// Function to send email
async function sendEmail(to, subject, text) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL_USER,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken.token
            }
        });

        const mailOptions = {
            from: `"JoBoard" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', result);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}


// Function to send email for Nithish's project
async function sendEmailNithish(to, subject, text) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL_USER,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken.token
            }
        });

        const mailOptions = {
            from: `"Student Profile" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', result);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}


// Route to handle sign-in and user creation
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
            await db.collection('Users').updateOne({ email }, { $set: { OTP } });
            return res.status(200).json({ message: 'User already exists', email });
        }
    } catch (err) {
        console.error('Error occurred while processing signin:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


// Route to send OTP to email
router.post('/sendOTP', async (req, res) => {
    const { email, OTP } = req.body;
    try {
        // Send OTP via email
        await sendEmail(email, 'Your OTP Code', `Your OTP code is ${OTP}`);
        return res.status(200).json({ message: 'OTP sent successfully', OTP });
    } catch (err) {
        console.error('Error occurred while sending OTP:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


// Route to send OTP to email for Nithish's project
router.post('/sendOTPtoNithish', async (req, res) => {
    const { email, OTP } = req.body;
    try {
        await sendEmailNithish(email, 'Your OTP Code', `Your OTP code is ${OTP}`);
        return res.status(200).json({ message: 'OTP sent successfully', OTP });
    } catch (err) {
        console.error('Error occurred while sending OTP:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
