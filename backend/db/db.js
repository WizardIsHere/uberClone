const mongoose = require('mongoose');

async function connectToDatabase() {
    try {
        if (!process.env.DB_CONNECT) {
            throw new Error('DB_CONNECT environment variable is not set');
        }

        await mongoose.connect(process.env.DB_CONNECT);
        console.log('Connected to database');
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1); // Exit the process if the database connection fails
    }
}

module.exports = connectToDatabase;
