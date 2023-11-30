const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Configure MongoDB connection (replace 'your_connection_string' with your actual connection string)
mongoose.connect('mongodb://localhost:27017/DaP', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema for user registration
const registrationSchema = new mongoose.Schema({
    categoryID: String,
    categoryName: String,
    description: String,
    parentCategory: String,
});

const Registration = mongoose.model('Registration', registrationSchema);

// Middleware to parse the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route for serving the HTML file
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/Categories.html');
});

// Handle form submission
app.post('/abc', async (req, res) => {
    // Extract user data from the request body
    const userData = {
        categoryID: req.body['categoryID'],
        categoryName: req.body['categoryName'],
        description: req.body['description'],
        parentCategory: req.body['parentCategory'],
    };

    // Create a new registration document
    const newRegistration = new Registration(userData);

    try {
        // Save the registration to MongoDB
        const savedRegistration = await newRegistration.save();
        res.send('Category registered successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error registering category');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
