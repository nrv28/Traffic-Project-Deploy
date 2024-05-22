
const nodemailer = require("nodemailer");
const express = require("express");
const bodyParser = require('body-parser');
require("dotenv").config();
const router = express.Router();
const fs = require('fs');

//------------------------------------------------------------------------------------------------------------------------------------------------------

// Route to handle the MailandUpload GET request
router.get('/Mail', (req, res) => {
    const detectedText = req.query.detectedText;
    const image2FullPath = req.query.image2FullPath;
    const username = req.query.Email;
    const challanlocation = req.query.challanlocation;
    const offense = req.query.offense;
    const dateOfOffense = req.query.dateOfOffense;
    const fineAmount = req.query.fineAmount;

    
    // Read the image file
    fs.readFile(image2FullPath, (err, imageData) => {
        if (err) {
            console.error('Error reading image file:', err);
            return res.status(500).send('Error reading image file');
        }

        const base64Image = imageData.toString('base64');

        // Create a transporter object
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "nirjaykumargupta2017@gmail.com", // your Gmail address
                pass: process.env.SMTP_PASSKEY, // your Gmail passkey from .env
            },
        });

        const mailOptions = {
            from: {
                name: 'Patna Traffic Police',
                address: "nirjaykumargupta2017@gmail.com"
            },
            to: username, // Use username directly here
            subject: "Traffic Violation Notice - Fine for Violating Traffic Rules",
            text: `
            Dear Citizen,
        
            This is to inform you that you have been fined for violating a traffic rule in Patna. Below are the details of the violation and the corresponding fine.
        
            Violation: ${offense}
            Date of Violation: ${dateOfOffense}
            Location: ${challanlocation}
            Vehicle Number: ${detectedText}
        
            Fine Amount: ₹${fineAmount}
        
            Please pay the fine within 15 days to avoid further penalties. You can pay the fine online at the Patna Traffic Police website or visit any designated traffic police office.
        
            Thank you for your cooperation.
        
            Sincerely,
            Patna Traffic Police
        
            Payhere : https://traffic-project-deploy.onrender.com
            `,
            html: `
            <p>Dear Citizen,</p>
        
            <p>This is to inform you that you have been fined for violating a traffic signal in Patna. Below are the details of the violation and the corresponding fine.</p>
        
            <p><strong>Violation: </strong>${offense}<br>
            <strong>Date of Violation: </strong>${dateOfOffense}<br>
            <strong>Location: </strong>${challanlocation}</p>
            <strong>Vehicle Number: </strong>${detectedText}</p>

            <p><strong>Fine Amount:</strong> ₹${fineAmount}</p>
        
            <p>Please pay the fine within 15 days to avoid further penalties. You can pay the fine online at the Patna Traffic Police website or visit any designated traffic police office.</p>
        
            <p>Thank you for your cooperation.</p>
        
            <p>Sincerely,<br>
            Patna Traffic Police</p>
        
            <p><strong>Payhere</strong> : https://traffic-project-deploy.onrender.com</p>
            `,
            attachments: [
                {
                    filename: 'image.png',
                    content: base64Image,
                    encoding: 'base64'
                }
            ]
        };

        // Function to send email
        const sendMail = async (mailOptions) => {
            try {
                await transporter.sendMail(mailOptions);
                console.log("Email sent");
                res.status(200).send('Email sent successfully');
            } catch (error) {
                console.error("Error sending email:", error);
                res.status(500).send('Error sending email');
            }
        };

        sendMail(mailOptions);

    });
});



router.post('/paymentmail',(req, res) => {
    const vehicleNumber = req.body.CaughtPlateNumber;
    const offenceDate = req.body.DateOfOffense;
    const offenceAt = req.body.ChallanLocation;           
    const offenceDetail=req.body.Offense;
    const amount=req.body.FineAmount;
    const email = req.body.Email;

    
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "nirjaykumargupta2017@gmail.com", // your Gmail address
                pass: "lkhsuncficytalsw", // your Gmail passkey from .env
            },
        });

        const mailOptions = {
            from: {
                name: 'Patna Traffic Police',
                address: "nirjaykumargupta2017@gmail.com"
            },
            to: [email], // replace with the recipient's email address
            subject: "Traffic Violation Fine Payment Confirmation",
            text: `
            Dear Citizen,
        
            We are pleased to inform you that your payment for the traffic violation fine has been successfully processed. Below are the details of the resolved violation.
        
            Violation: ${offenceDetail}
            Date of Violation: ${offenceDate}
            Location: ${offenceAt}
            Vehicle Number: ${vehicleNumber}
        
            Fine Amount: ₹${amount}
        
            Your issue has been resolved, and no further action is required regarding this violation. Please ensure that you follow traffic rules to avoid future violations.
        
            Thank you for your cooperation.
        
            Sincerely,
            Patna Traffic Police
        
            `,
            html: `
            <p>Dear Citizen,</p>
        
            <p>We are pleased to inform you that your payment for the traffic violation fine has been successfully processed. Below are the details of the resolved violation.</p>
        
            <p><strong>Violation: </strong>${offenceDetail}<br>
            <strong>Date of Violation: </strong>${offenceDate}<br>
            <strong>Location: </strong>${offenceAt}</p>
            <strong>Vehicle Number: </strong>${vehicleNumber}</p>

            <p><strong>Fine Amount:</strong> ₹${amount}</p>
        
            <p>Your issue has been resolved, and no further action is required regarding this violation. Please ensure that you follow traffic rules to avoid future violations.</p>
        
            <p>Thank you for your cooperation.</p>
        
            <p>Sincerely,<br>
            Patna Traffic Police</p>
        
            `
        };

        // Function to send email
        const sendMail = async (mailOptions) => {
            try {
                await transporter.sendMail(mailOptions);
                console.log("Email sent");
                res.json({ status: "ok" });
            
            } catch (error) {
                console.error("Error sending email:", error);
                res.status(400).json({ status: "Payment Email not Sent" });
            }
        };

        sendMail(mailOptions);

  });



module.exports = router;

