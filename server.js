// Setup empty JS object to act as endpoint for all routes
const projectData = {};
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const {
    request,
    get
} = require('http');
const {
    response
} = require('express');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
app.listen(port, () => {
    console.log(`local host running on port: ${port}`);
});

// Initialize all route with a callback function
const data = [];

// Post Route
app.post('http://localhost:8000/addZip', (request, response) => {
    data.push(request.body);
});

//Get Route
app.get('http://localhost:8000/zip', (request, response) => {
    response.send(data);
});