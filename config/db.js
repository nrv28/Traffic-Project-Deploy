const mongoose = require('mongoose');


const connectDB = async () => {
    
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSKEY}@platenumber.b6vvvtl.mongodb.net/RTO_Details`);
        console.log('MongoDB connected');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
