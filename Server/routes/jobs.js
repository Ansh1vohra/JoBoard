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

module.exports = router;