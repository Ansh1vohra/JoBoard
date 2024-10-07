const express = require('express');
const {getDB} = require('../config/db');
const router = express.Router();
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER, // replace with your Outlook email
        pass: process.env.EMAIL_PASS  // replace with your app password
    },
    tls: {
        ciphers: 'SSLv3'
    }
});

async function sendEmail(to, subject, text) {
    let info = await transporter.sendMail({
        from: `"JoBoard" <${process.env.EMAIL_USER}>`, 
        to,
        subject,
        text
    });

    console.log('Message sent: %s', info.messageId);
}

router.post('/createCompanyUser', async(req,res)=>{
    const { companyMail,companyName,password} = req.body;
    const db=getDB();
    try{
        let company = await db.collection('Company').findOne({companyMail});
        const highestCompany = await db.collection('Company')
            .find()
            .sort({ companyId: -1 })
            .limit(1)
            .toArray(); 
        let companyId
        if (highestCompany.length >0){
            companyId = highestCompany[0].companyId + 1; // Increment the highest companyId
        }

        if (!company){
            if (companyId){
                company = {companyId,companyMail,companyName,password};
                const result = await db.collection('Company').insertOne(company);
                return res.status(201).json({ message: 'Company User created successfully', companyMail: result.insertedId });
            }else{
                return res.status(406).json({message:"Can Not Find Highest Company ID"});
            }
        }else{
            return res.status(200).json({message:'Company already Exists!'});
        }
    }catch (err) {
        console.error('Error occurred while processing creating user:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.post('/sendOTP', async (req, res) => {
    const { email, OTP } = req.body;
    const db = getDB();
    try {
        const user = await db.collection('Company').findOne({ companyMail: email });
        if (!user) {
            await sendEmail(email, 'Your OTP Code of JoBoard', `Your OTP is : ${OTP}.
Do not Share it.
Thanks for using JoBoard.`);
            return res.status(200).json({ message: 'OTP sent successfully', OTP });
        } 
        else {
            return res.status(409).json({ message: 'User already exists' });
        }
    } catch (err) {
        console.error('Error occurred while sending OTP:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.post('/verifyUser', async(req,res) => {
    const {email,password} = req.body;
    const db = getDB();
    try{
        const user = await db.collection('Company').findOne({companyMail:email});
        if (user){
            if (password === user.password){
                return res.status(200).json({message:'Sign In Success'});
            } else{
                return res.status(401).json({message:'Invalid Password!'});
            }
        }else{
            return res.status(404).json({message:'User Not Found!'});
        }
    }catch{
        console.error('Error occurred while sending OTP:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.post('/details', async (req, res) => {
    const { email } = req.body;
    const db = getDB();
    
    try {
        const user = await db.collection('Company').findOne({ companyMail: email });
        if (!user) {
            return res.status(404).json({ message: 'Company not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
});


module.exports = router;