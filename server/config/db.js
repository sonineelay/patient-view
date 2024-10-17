//MongoDB connection configuration
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Database connection failed:', err.message);
        process.exit(1); // Exit the process if the connection fails
    }
};

module.exports = connectDB;
