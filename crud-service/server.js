const express = require('express');
const bodyParser = require('body-parser');
// create express app
const app = express();
// Serve static files from 'public' folder
app.use(express.static('public')); 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url)
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
  });

require('./routes/routes.js')(app);

// Start the server
const port = 8003;
app.listen(port, () => {
  console.log(`CRUD microservice is running on port ${port}`);
});