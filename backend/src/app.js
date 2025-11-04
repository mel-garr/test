const express = require('express');
const app = express();

app.use(express.json());


// my project routes

const authRoutes = require('./auth/auth.routes');
const userRoutes = require('./user/user.routes');

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

//test routes

app.get('/test', (req, res) => {
    res.json({ message: 'Test route is working!' });
});

module.exports = app;