
const express = require("express");
const path = require("path");
const router = express.Router();
const { spawn } = require('child_process');
const multer = require('multer');

const upload = multer({ dest: path.join(__dirname, '..', 'uploads') });

router.post('/predict', upload.fields([{ name: 'image1' }, { name: 'image2' }]), (req, res) => {
   
    // Extract image1 path we only need image here
    const image1Path = req.files['image1'][0].filename;
    const image2Path = req.files['image2'][0].filename;
    

    const model = path.join(__dirname, '..','predict_number_plate.py');

    // Here, we're only using image1Path for prediction, so we'll send it to the Python process
    const pythonProcess = spawn('python', [model, image1Path]);

    let detectedText = '';
    let errorText = '';

    pythonProcess.stdout.on('data', (data) => {
        detectedText += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        errorText += data.toString();
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0){
            console.error(`Python process exited with code ml link route ${code}`);
            console.error(`Python Error Ml link route: ${errorText}`);
            res.status(500).json({ error: errorText });
        } else {
            const detectedTextValue = detectedText.trim();
            //sending the response back to client side
            res.json({ detectedText: detectedTextValue,image2Path:image2Path });
        }
    });
});


module.exports = router;

