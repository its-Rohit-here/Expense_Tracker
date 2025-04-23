const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // For Local MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        
        
        console.log("✅ MongoDB Connected!");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;