const express = require("express");
require("dotenv").config();
const router = express.Router();
const PlateDetails = require('../models/PlateDetailsSchema');

// Route to handle the VehicleReg  request
router.post('/VehicleReg', async (req, res) => {
    const vehicleNumber = req.body.vehicleNumber;
    const Name = req.body.ownerName;
    const Email = req.body.email;
    const Phone = req.body.phoneNumber;
    const Address = req.body.address;
    const RegistrationDate = req.body.registrationDate;
    const Password = req.body.password;


    const newVehicle = new PlateDetails({
        PlateNumber: vehicleNumber,
        Name: Name,
        Email: Email,
        Phone: Phone,
        Address: Address,
        RegistrationDate: RegistrationDate,
        Password: Password
    });

    // Save the document to the database
    try {
        await newVehicle.save();
        console.log('Vehicle Registered Successfully');
        res.status(200).send('Vehicle Registered Successfully');
    } catch (err) {
        console.error('Error saving Registration details:', err);
        res.status(500).send('Error saving Registration details');
    }

});

module.exports = router;
