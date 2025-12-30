// /backend/services/llmService.js
const config = require('../config/config');

// --- P0 Mock Implementation ---
// In a real application, this would use Axios/Fetch to connect to the 
// configured LLM API (e.g., Google Gemini, OpenAI) using the config.llm.apiKey

const MOCK_RESPONSES = [
  "That sounds really tough. Let's try a grounding technique. Name five things you can see, four you can touch, three you can hear, two you can smell, and one you can taste.",
  "It's completely normal to feel this way. Can you break down one thing causing stress right now into smaller steps?",
  "Thank you for sharing. Remember to pause and take three slow, deep breaths. This is a small, manageable step towards calm.",
  "You're not alone. Let's reframe that thought: instead of 'I failed,' try 'I am learning.' How does that feel?",
  "That's a lot to handle. What is one small, positive distraction you could do for the next 10 minutes?"
];

/**
 * P0 Mock: Generates a randomized, supportive CBT-based response.
 * @param {string} message - The user's input message.
 * @returns {Promise<string>} - The AI-generated response.
 */
exports.generateResponse = async (message) => {
  console.log(`[LLM MOCK] Processing message: "${message}"`);
  
  // Simulate network latency (200ms - 800ms)
  const latency = Math.random() * 600 + 200; 
  await new Promise(resolve => setTimeout(resolve, latency));

  const randomIndex = Math.floor(Math.random() * MOCK_RESPONSES.length);
  const prefix = "MindBloom says: "; // Ensure distinctiveness in the mock

  return `${prefix}${MOCK_RESPONSES[randomIndex]}`;
};

// --- End P0 Mock Implementation ---