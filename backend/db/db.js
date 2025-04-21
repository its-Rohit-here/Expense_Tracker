const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // For Local MongoDB
        await mongoose.connect('mongodb://localhost:27017/smartspend');
        
        // For MongoDB Atlas (Uncomment & replace credentials)
        // await mongoose.connect('mongodb+srv://deadlock:asrasr123@cluster0.mnhdnpb.mongodb.net/smartspend?retryWrites=true&w=majority');
        
        console.log("✅ MongoDB Connected!");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;