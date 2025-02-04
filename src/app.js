const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const  cipher = require('./router/cipher.router');
const cors = require('cors');



// Enable CORS
 app.use(cors());

//  // Connect to MongoDB
//  const mongoose = require('mongoose');
//  mongoose.connect('mongodb://localhost:27017/cipherDB', { useNewUrlParser: true, useUnifiedTopology: true })
//  .then(() => console.log('MongoDB connected...'))

// Middleware to parse application/x-www-form-urlencoded request bodies
 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(bodyParser.json());
 app.use(express.static('public')); // Serve static files from the 'public' directory
 


 // Middleware to handle CORS requests
 app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
 });


 app.use('/api/v1/cipher', cipher)

 // HOME PAGE ROUTE
app.get("/", (req, res) => {
    // res.render("index");
    res.send("Welcome to server.");
  });
  
  //PAGE NOT FOUND HANDLING
  app.use((req, res, next) => {
    res.status(404).json({
      status: 404,
      message: "404 | Page not Found!",
    });
  });
  
  // SERVER ERROR HANDLING
  app.use((err, req, res, next) => {
    res.status(500).json({
      status: 500,
      message: err,
    });
  });
  

 // Endpoint to retrieve all users
 
 module.exports = app