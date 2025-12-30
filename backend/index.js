// /backend/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // P0 dependency for frontend interaction
const config = require('./config/config');
const chatRoutes = require('./routes/chatRoutes');

const app = express();

// --- Middleware Setup ---
// P0: Enable CORS for all origins, allowing both Mobile and Web frontends to connect
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'X-User-Session-Id'] // Allow custom session ID header
}));

// Parse application/json request body
app.use(bodyParser.json()); 

// --- P0 Routes ---
// Mount chat routes at /api/v1 so the endpoint is /api/v1/send
app.use('/api/v1', chatRoutes);

// Simple health check endpoint
app.get('/', (req, res) => {
    res.status(200).send({ 
        service: 'MindBloom Backend', 
        status: 'Operational', 
        version: 'P0 MVP' 
    });
});

// --- Server Start ---
app.listen(config.port, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 MindBloom P0 Backend Server is running!`);
    console.log(`   URL: http://localhost:${config.port}`);
    console.log(`   Crisis Number: ${config.crisis.teleManasNumber}`);
    console.log(`======================================================\n`);
});