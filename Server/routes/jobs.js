const express = require('express');
const { getDB } = require('../config/db');
// const { ObjectId } = require('mongodb'); // Add ObjectId import
const router = express.Router();

router.get('/internships', async (req, res) => {
    try {
        const db = getDB();
        const internships = await db.collection('Jobs').find({ jobType: "Internship" }).toArray();
        const detailedInternships = await Promise.all(internships.map(async (app) => {
            const job = await db.collection('Company').findOne({ companyId: app.CompanyId });
            return { ...app, companyName: job.companyName, postedOn: app._id.getTimestamp() };
        }));

        res.status(200).json({ internships: detailedInternships });
    } catch (err) {
        console.error('Failed to fetch internships:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});
router.get('/getjobs', async (req, res) => {
    try {
        const db = getDB();
        const jobs = await db.collection('Jobs').find({ jobType: "Job" }).toArray();
        const detailedJobs = await Promise.all(jobs.map(async (app) => {
            const job = await db.collection('Company').findOne({ companyId: app.CompanyId });
            return { ...app, companyName: job.companyName, postedOn: app._id.getTimestamp() };
        }));

        res.status(200).json({ jobs: detailedJobs });
    } catch (err) {
        console.error('Failed to fetch jobs:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.get('/jobdetail/:id', async (req, res) => {
    const db = getDB();
    const internshipId = req.params.id;

    try {
        const internship = await db.collection('Jobs').findOne({ jobID: internshipId });
        if (!internship) {
            console.log('Internship not found');
            return res.status(404).json({ message: 'Internship not found' });
        }
        const companyDetails = await db.collection('Company').findOne({companyId:internship.CompanyId});
        const jobDetails = {...internship,companyName:companyDetails.companyName};
        res.json(jobDetails);
    } catch (error) {
        console.error('Error fetching internship:', error);
        res.status(500).json({ message: 'Error fetching internship', error: error.message });
    }
});

module.exports = router;
