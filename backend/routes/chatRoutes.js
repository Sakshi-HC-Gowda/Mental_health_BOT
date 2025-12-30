// /backend/routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const safetyController = require('../controllers/safetyController');

/**
 * P0 Routes:
 * POST /api/v1/send           -> frontend (web & mobile) default
 * POST /api/v1/chat/send      -> backward-compatible path
 * Both process a user message, perform the safety check, and return the AI response.
 */
// Primary route used by frontends
router.post('/send', safetyController.processChatMessage);
// Backward-compatible route
router.post('/chat/send', safetyController.processChatMessage);

// P1 Future: Add routes for mood logging, resources, etc.

module.exports = router;