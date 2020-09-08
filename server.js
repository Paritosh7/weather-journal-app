// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();


/* Middleware*/
const cors = require('cors');
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
app.listen(port,()=>console.log(`running on port ${port}`))

// GET route
app.get('/getData',(req,res)=> {
    res.send(projectData)});

// POST route
app.post('/addData',addData)

// Callback function to add the posted daata.
function addData(req,res){
    projectData.temperature = req.body.temperature;
    projectData.date = req.body.date;
    projectData.feelings = req.body.feelings;
}
