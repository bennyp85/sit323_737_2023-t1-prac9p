// Import required modules
const express = require('express');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
require('dotenv').config();


// Initialize express application
const app = express();
app.use(express.static('public')); // Serve static files from 'public' folder
app.use(bodyParser.json()); // Parse JSON request bodies


// Configure JWT strategy for authentication
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};


// Initialize and use JWT strategy for passport
passport.use(
  new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    if (jwtPayload) {
      return done(null, jwtPayload);
    } else {
      return done(null, false);
    }
  })
);

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the entered credentials match the ones in the .env file
  if (username === process.env.USERNAME && password === process.env.PASSWORD) {
    // Create payload and sign JWT
    const payload = {
      id: 1,
      username: username,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
    console.log(`Generated token: ${token}`);

    // Respond with JWT token
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

  
 

// Start the server
const port = 8001;
app.listen(port, () => {
  console.log(`Authentication microservice is running on port ${port}`);
});

