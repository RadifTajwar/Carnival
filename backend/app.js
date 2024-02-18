// Import the necessary modules for creating an Express app
const express = require('express');
const app = express();

// Import the error middleware, body parser, file upload, and dotenv for environment variables
const errorMiddleware = require('./middleware/error');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');

// Load environment variables from the config file
dotenv.config({path: 'config/config.env'});

// Use JSON parsing and extended URL encoding for request bodies
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// Use express-fileupload middleware for handling file uploads
app.use(fileUpload());

// Use express-session middleware for managing sessions
const expressSession = require('express-session');
app.use(expressSession({
    secret: 'the-dark-knight',
    resave: false,
    saveUninitialized: false
}));

// Import and use routes for different parts of the API
const product = require('./routes/productRoute');
const user = require('./routes/userRoutes');
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute');

app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', order);
app.use('/api/v1', payment);

// Use error middleware to handle and respond to errors
app.use(errorMiddleware);

// Export the Express app for use in other parts of the application
module.exports = app;
