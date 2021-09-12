// Setup empty JS object to act as endpoint for all routes
//========================== Import what i need to use and required =============//
var projectData = {};
const express = require('express');

// Start up an instance of app
const app = express();

// save port and middlewares i need to use ==> Middlewares
const port = 4000 || 3000;
const cors = require('cors');
const bodyParser = require('body-parser');




/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

app.listen(port , ()=>{
    console.log(`Now server connected in port : ${port}`);
});


//======================= Add My Own Routes (Rest API)=====================//

// 1- Get Data
app.get('/getDate' , (req , res)=>{
    res.send(projectData);
});


// 2- Post Data
app.post('/postData' , (req , res)=>{
    let comingData = req.body;
    projectData = {...comingData};
    res.end();
})


