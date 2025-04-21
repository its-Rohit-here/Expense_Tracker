const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // For Local MongoDB
        await mongoose.connect("");
        
        
        console.log("✅ MongoDB Connected!");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;