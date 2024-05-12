// Import libraries
const express = require('express');
const session = require('express-session');
const passport = require('./middleware/passport-config');

// Create an express application
const app = express();

// Use json middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use session middleware
app.use(session({
    secret: 'random',
    cookie: { 
        maxAge: 12 * 60 * 60 * 1000,    // 12 hours
        sameSite: 'none',
        secure: true
    },
    resave: false,
    saveUninitialized: false
}));

// Use passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Use the auth router


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});