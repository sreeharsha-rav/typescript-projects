import express from 'express';

const authRouter = express.Router();

authRouter.get('/profile', (req, res) => {
    res.send('Get user profile: ' + req.user);
});

authRouter.post('/login', (req, res) => {
    res.send('Login user');
});

authRouter.post('/register', (req, res) => {
    res.send('Register user');
});