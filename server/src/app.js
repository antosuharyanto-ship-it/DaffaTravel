const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/auth.routes');
const packageRoutes = require('./routes/packages.routes');
const branchRoutes = require('./routes/branches.routes');
const transactionRoutes = require('./routes/transactions.routes');
const chatbotRoutes = require('./routes/chatbot.routes');

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/chatbot', chatbotRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('Daffa Tour & Travel API');
});

module.exports = app;
