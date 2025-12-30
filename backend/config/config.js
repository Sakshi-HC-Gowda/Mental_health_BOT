// /backend/config/config.js
require('dotenv').config(); // Requires 'dotenv' if using actual environment variables

const config = {
  // P0 - Server Configuration
  port: process.env.PORT || 3000,
  
  // P0/P1 - LLM Configuration (Mock/Placeholder)
  llm: {
    apiKey: process.env.LLM_API_KEY || 'MOCK_LLM_KEY_12345',
    modelName: 'gemini-2.5-flash', // Placeholder
    // The base URL for the LLM API endpoint
    baseUrl: 'https://api.mockllm.com/v1', 
    cbtPromptPrefix: 'You are a compassionate AI assistant providing supportive, CBT-based responses to students. Keep answers concise (under 50 words) and non-diagnostic. The user says: '
  },
  
  // P0 - Crisis Configuration
  crisis: {
    teleManasNumber: '1-800-891-4416', // India National Helpline
    highRiskThreshold: 0.85 // Placeholder if using external sentiment model
  }
};

module.exports = config;