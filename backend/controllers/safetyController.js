// /backend/controllers/safetyController.js
const llmService = require('../services/llmService');
const config = require('../config/config');
const { v4: uuidv4 } = require('uuid'); // Used for generating anonymous session IDs

// P0: The list of high-risk keywords for immediate crisis detection
const HIGH_RISK_PHRASES = [
    'kill myself', 'ending it all', 'die tonight', 'suicide', 'self-harm', 
    'can\'t go on', 'take my life'
];

/**
 * P0: Handles the full chat message flow, including the CRITICAL safety check.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
exports.processChatMessage = async (req, res) => {
    // For P0 MVP, we use the session ID as the userId
    const { message } = req.body;
    let userId = req.headers['x-user-session-id'] || uuidv4(); 

    if (!message || typeof message !== 'string' || message.length > 500) {
        return res.status(400).json({ status: 'error', message: 'Invalid message.' });
    }
    
    // 1. Safety Check (Case-insensitive keyword match)
    const lowerCaseMessage = message.toLowerCase();
    const isCrisis = HIGH_RISK_PHRASES.some(phrase => 
        lowerCaseMessage.includes(phrase)
    );

    if (isCrisis) {
        // P0 CRITICAL PATH: CRISIS DETECTED
        console.warn(`[SAFETY PROTOCOL] CRISIS DETECTED for session ${userId}.`);
        // Log the high-risk message (anonymously)
        // In a real system, this would trigger an alert for system admins.
        
        return res.status(200).json({
            status: 'crisis_detected',
            response: null,
            helpline: config.crisis.teleManasNumber,
            message: 'We are deeply concerned for your safety. MindBloom is an AI and cannot handle crises. Access human help immediately.'
        });
    }

    // 2. LLM Processing (Only if safe)
    try {
        // Pass the anonymous session id through so the mock LLM can avoid repeating replies
        const llmResponse = await llmService.generateResponse(message, userId);
        
        // P1 Future: Save chat history here
        
        return res.status(200).json({
            status: 'ok',
            response: llmResponse
        });

    } catch (error) {
        console.error(`[LLM ERROR] User ${userId}:`, error);
        return res.status(500).json({ 
            status: 'error', 
            message: 'AI service currently unavailable. Please try again later.' 
        });
    }
};