// Import necessary modules and files
const app = require('./app');
const cloudinary = require('cloudinary')
const dotenv = require('dotenv');
const connectDatabase = require('./config/database')

// Handle uncaught exceptions (e.g., programming errors) to prevent crashing
process.on('uncaughtException', err => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to Uncaught Exception')
    process.exit(1)
})

// Load environment variables from config file
dotenv.config({path: 'config/config.env'})

// Connect to the database
connectDatabase()

// Configure Cloudinary settings using environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Start the server and listen on the specified port
const server = app.listen(process.env.PORT, () => {
    console.log(`Server Working on http://localhost:${process.env.PORT}!`);
})

// Handle unhandled promise rejections (e.g., database connection errors)
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to Unhandled Promise Rejection');
    // Close the server gracefully before exiting the process
    server.close(() => {
        process.exit(1);
    })
})
