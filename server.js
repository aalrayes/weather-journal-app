
const projectData = {};
const express = require('express');
const app = express();

/* Middleware*/
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
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`local host running on port: ${port}`);
});

app.post('/all', addWeather);

app.get('/load', (request, response) => {
    response.send(projectData);
});

function addWeather(req, res) {
    projectData.temperature = req.body.temperature;
    projectData.date = req.body.date;
    projectData.feelings = req.body.feelings;
    res.send(projectData);
}