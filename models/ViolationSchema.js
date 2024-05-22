// backend/models/ViolationData.js
const mongoose = require('mongoose');

const ViolationSchema = new mongoose.Schema({
    image: {
        data: Buffer,      
        contentType: String 
    },
    CaughtPlateNumber: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    ChallanLocation: {
        type: String,
        required: true,
    },
    Offense: {
        type: String,
        required: true,
    },
    FineAmount: {
        type: String,
        required: true,
    },
    DateOfOffense: {
        type: String,
        required: true,
    },
    OffenseID:{
        type: String,
        required: true,
    }
}, { collection: 'ViolationData' });

const ViolationData = mongoose.model("ViolationData", ViolationSchema);

module.exports = ViolationData;
