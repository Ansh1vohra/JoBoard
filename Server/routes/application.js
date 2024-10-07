const express = require('express');
const { getDB } = require('../config/db');
const router = express.Router();
const multer = require('multer');
const { ObjectId } = require('mongodb');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 2 * 1024 * 1024 } });

router.post('/applyJob', upload.single('resume'), async (req, res) => {
    const { userMail, jobID, coverLetter } = req.body;
    const resume = req.file;
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


router.post('/getApplicationsByJobID', async (req, res) => {
    const db = getDB();
    const { jobID } = req.body;
    try {
        const applications = await db.collection('Applications').find({ jobID: jobID }).toArray();
        res.status(200).json({ applications });
    } catch (error) {
        console.error('Error retrieving applications:', error);
        res.status(404).json({ message: 'Error!' });
    }
});

router.get('/getResume/:id', async (req, res) => {
    const db = getDB();
    const { id } = req.params;

    try {
        const application = await db.collection('Applications').findOne({ _id: new ObjectId(id) });

        // console.log('Retrieved application:', JSON.stringify(application, null, 2));

        if (!application) {
            console.log('Application not found');
            return res.status(404).json({ message: 'Application not found' });
        }

        if (!application.resume) {
            console.log('Resume not found in the application');
            return res.status(404).json({ message: 'Resume not found' });
        }

        if (!application.resume.buffer) {
            console.log('Resume buffer not found in the application');
            return res.status(404).json({ message: 'Resume buffer not found' });
        }

        const resumeBuffer = Buffer.from(application.resume.buffer, 'base64');

        res.set('Content-Type', 'application/pdf');
        res.send(resumeBuffer);
    } catch (error) {
        console.error('Error retrieving resume:', error);
        res.status(500).json({ message: 'Error retrieving resume', error: error.message });
    }
});
module.exports = router;