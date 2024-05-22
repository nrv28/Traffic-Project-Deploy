const mongoose = require('mongoose');

const AuthorizationSchema = new mongoose.Schema({
    
    Email: {
        type: String,
        required: true,
    },
    Password:{
        type: String,
        required: true
    }

}, { collection: 'Administrators' });


const Authorization = mongoose.model("Administrators", AuthorizationSchema);


module.exports = Authorization;