const express = require('express');
const { getDB } = require('../config/db');
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 2 * 1024 * 1024 } });

router.post('/applyJob', upload.single('resume'), async (req, res) => {
    const { userMail, jobID, coverLetter } = req.body;
    const resume = req.file; // This is the uploaded file
    const db = getDB();

    try {
        let applied = await db.collection('Applications').findOne({ userMail: userMail, jobID: jobID });
        if (!applied) {
            const application = { userMail, jobID, resume: resume.buffer, coverLetter }; // Save resume as buffer
            const postApplication = await db.collection('Applications').insertOne(application);
            return res.status(201).json({ message: 'Application Posted Successfully!', applicationId: postApplication.insertedId });
        } else {
            return res.status(200).json({ message: 'User Has Already Applied For this Job', userMail });
        }
    } catch (error) {
        console.error("Error Posting the Application :", error);
        res.status(500).json({ message: 'Error Posting the Application', error: error.message });
    }
});

router.post('/userApplications', async (req, res) => {
    const { userMail } = req.body;
    if (!userMail) {
        return res.status(400).json({ message: 'UserMail not provided' });
    }
    const db = getDB();
    try {
        const applications = await db.collection('Applications').find({ userMail }).toArray();

        const detailedApplications = await Promise.all(applications.map(async (app) => {
            const job = await db.collection('Jobs').findOne({ jobID: app.jobID });
            if (!job) return null;

            const company = await db.collection('Company').findOne({ companyId: job.CompanyId });
            if (!company) return null;

            return {
                ...app,
                jobTitle: job.jobTitle,
                companyName: company.companyName,
                appliedOn: app._id.getTimestamp()
            };
        }));

        const validApplications = detailedApplications.filter(app => app !== null);

        res.status(200).json({ applications: validApplications });
    } catch (error) {
        console.error("Error fetching application history:", error);
        res.status(500).json({ message: 'Error fetching application history', error: error.message });
    }
});

module.exports = router;