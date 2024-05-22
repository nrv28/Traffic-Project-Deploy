const express = require('express');
const router = express.Router();
const ViolationData = require('../models/ViolationSchema');

// Fetch violation data for the logged-in user
router.get('/fetchviolation', async (req, res) => {
    try {
        // Ensure the user is logged in
        if (!req.session.user || !req.session.user.email) {
            return res.status(401).json({ message: 'User not logged in or session expired' });
        }

        const email = req.session.user.email;
        
        // Find all violation data for the logged-in user
        const violations = await ViolationData.find({ Email: email });

        // If no violations found, return an appropriate message
        if (violations.length === 0) {
            return res.status(200).json({ authorized: true, data: [], message: 'No violations found' });
        }

        // Send the found violation data to the frontend
        res.status(200).json({ authorized: true, data: violations });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
