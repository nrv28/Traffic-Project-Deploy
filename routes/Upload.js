
const path = require("path");
const express = require("express");
require("dotenv").config();
const router = express.Router();
const fs = require('fs');
const PlateDetails = require('../models/PlateDetailsSchema');
const ViolationData = require('../models/ViolationSchema');


// Route to handle the MailandUpload GET request   GETTTTTTTTTTTTTTTTTTTTTTTTTTTT
router.post('/Upload', async (req, res) => {
    const detectedText = req.body.detectedText;
    const image2filename = req.body.image2Path;
    const challanlocation = req.body.challanlocation;
    const offense = req.body.offense;
    const fineAmount = req.body.fineAmount;
    const dateOfOffense = req.body.dateOfOffense;
    const OffenseID = req.body.OffenseID;

    console.log(detectedText);
    

    const plateDetails = await PlateDetails.findOne({ PlateNumber: detectedText });


    if (plateDetails) {

        const Email = plateDetails.Email;
    
        if (image2filename) {
            const image2FullPath = path.join(__dirname, '..', 'uploads', path.basename(image2filename));

            // Read the image file
            fs.readFile(image2FullPath, (err, imageData) => {
                if (err) {
                    console.error('Error reading image file:', err);
                    return res.status(500).send('Error reading image file');
                }

                //content type
                const contentType = 'image/png';

                // Create a new ViolationData document
                const newViolation = new ViolationData({
                    image: { data: imageData, contentType: contentType },
                    Email: Email,
                    CaughtPlateNumber: detectedText,
                    DateOfOffense : dateOfOffense,
                    Offense : offense,
                    FineAmount : fineAmount,
                    ChallanLocation : challanlocation,
                    OffenseID : OffenseID
                });

                // Save the document to the database
                newViolation.save()
                    .then(() => {
                        console.log('Violation Data Saved Successfully');
                        res.redirect(`/Mail?detectedText=${detectedText}&image2FullPath=${image2FullPath}&Email=${Email}&challanlocation=${challanlocation}&offense=${offense}&dateOfOffense=${dateOfOffense}&fineAmount=${fineAmount}`);
                    })
                    .catch(err => {
                        console.error('Error saving violation details:', err);
                        res.status(500).send('Error saving violation details');
                    });
            });
        } else {
            // Handle case when no image is provided
            const newViolation = new ViolationData({
                Email: Email,
                CaughtPlateNumber: detectedText,
            });

            newViolation.save()
                .then(() => {
                    console.log('Violation Data saved successfully without image');
                })
                .catch(err => {
                    console.error('Error saving violation data without image:', err);
                    res.status(500).send('Error saving violation data without image');
                });
        }
    } 

    else {
        console.log("No Plate Found");
        res.status(500).send('Error No Plate Found');
    }

});


module.exports = router;

