// /backend/controllers/chatController.js
const mockAiService = require('../services/mockAiService');
const config = require('../config/config');
const { v4: uuidv4 } = require('uuid');

// P0: High-risk phrases (same as safetyController)
const HIGH_RISK_PHRASES = [
  'kill myself', 'ending it all', 'die tonight', 'suicide', 'self-harm', "can't go on", 'take my life'
];

/**
 * Handles incoming chat: immediate crisis detection, then a 1.2s "thinking" delay
 */
exports.processChatMessage = async (req, res) => {
  const { message } = req.body;
  const userId = req.headers['x-user-session-id'] || uuidv4();

  if (!message || typeof message !== 'string' || message.length > 500) {
    return res.status(400).json({ status: 'error', message: 'Invalid message.' });
  }

  // Immediate crisis detection (case-insensitive)
  const lower = message.toLowerCase();
  const isCrisis = HIGH_RISK_PHRASES.some(phrase => lower.includes(phrase));

  if (isCrisis) {
    console.warn(`[SAFETY PROTOCOL] CRISIS DETECTED for session ${userId}.`);
    return res.status(200).json({
      status: 'crisis_detected',
      response: null,
      helpline: config.crisis.teleManasNumber,
      message: 'We are deeply concerned for your safety. MindBloom is an AI and cannot handle crises. Access human help immediately.'
    });
  }

  // Simulate thinking delay (1200 ms) before sending the mock response
  const reply = mockAiService.generateResponse(message);

  setTimeout(() => {
    return res.status(200).json({ status: 'ok', response: `MindBloom says: ${reply}` });
  }, 1200);
};
