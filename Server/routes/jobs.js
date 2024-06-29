const express = require('express');
const { getDB } = require('../config/db');
const router = express.Router();

router.get('/internships', async (req, res) => {
    try {
        const db = getDB();
        const internships = await db.collection('Jobs').find({ jobType: "Internship" }).toArray();
        res.json(internships);
    } catch (err) {
        console.error('Failed to fetch internships:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


router.get('/api/jobs/internship/:id', async (req, res) => {
    const db = getDB();
    const internshipId = req.params.id;

    try {
        const internship = await db.collection('internships').findOne({ _id: ObjectId(internshipId) });
        if (!internship) {
            return res.status(404).json({ message: 'Internship not found' });
        }
        res.json(internship);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching internship', error });
    }
});

module.exports = router;