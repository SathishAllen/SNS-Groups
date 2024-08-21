const mongoose = require('mongoose');

function connectDB() {
    // MongoDB connection
    mongoose.connect('mongodb://localhost:27017/sns-group');

    // Check for DB connection
    mongoose.connection.once('open', () => {
        console.log('Connected to MongoDB');
    });
}

module.exports.connectDB = connectDB;