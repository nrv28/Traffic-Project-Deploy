const mongoose = require('mongoose');

const PlateDetailsSchema = new mongoose.Schema({
    PlateNumber: {
        type: String,
        required: true,
    },
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Phone:{
        type: String,
        required: true,
    },
    Address:{
        type: String,
        required: true
    },
    RegistrationDate:{
        type: String,
        required: true
    },
    Password:{
        type: String,
        required: true
    }

}, { collection: 'PlateDetails' });


const PlateDetails = mongoose.model("PlateDetails", PlateDetailsSchema);


module.exports = PlateDetails;