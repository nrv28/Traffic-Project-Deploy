// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const PlateDetails = require('../models/PlateDetailsSchema');
const Authorization = require('../models/AuthrizationSchema');


// Check if user is logged in
router.get('/checkloggedin', (req, res) => {
    if (req.session.user) {
        return res.status(200).json({ loggedIn: true });
    } else {
        return res.status(200).json({ loggedIn: false });
    }
});



router.get('/checkauthorization', async (req, res) => {
    try {
        // Check if user exists
        const user = await Authorization.findOne({ Email:  req.session.user.email});
        if (!user) {
            // console.log("Not authorized");
            return res.status(200).json({ authorized: false });
        }
         
        // console.log("Authorized");
        return res.status(200).json({ authorized: true });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


// Route to handle the login POST request
router.post('/Authentication', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await PlateDetails.findOne({ Email: email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Email' });
        }

        // Check if password is correct
        if (password !== user.Password) { // Direct comparison
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Store user information in session
        req.session.user = {
            id: user._id,
            email: user.Email,
            name: user.Name,
            address: user.Address,
            phone: user.Phone,
            vehiclenumber: user.PlateNumber,
            regdate: user.RegistrationDate
        };

        res.json({ message: 'Login successful', user: req.session.user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to get the current logged-in user's details
router.get('/giveuserdata', async (req, res) => {
    try {
        res.send(req.session.user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to handle logout
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
           
            return res.status(500).json({ message: 'Logout failed' });
        }
        
        res.clearCookie('connect.sid');
        res.json({ message: 'Logout successful' });
    });
});

module.exports = router;
