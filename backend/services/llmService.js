// /backend/services/llmService.js
const mockAiService = require('./mockAiService');
const config = require('../config/config');

// --- P0 Mock Implementation + Optional OpenAI Integration ---
// In a real application, this would use Axios/Fetch to connect to the
// configured LLM API (OpenAI by default if LLM_API_KEY is set)
const MOCK_RESPONSES = [
  "That sounds really tough. Let's try a grounding technique. Name five things you can see, four you can touch, three you can hear, two you can smell, and one you can taste.",
  "It's completely normal to feel this way. Can you break down one thing causing stress right now into smaller steps?",
  "Thank you for sharing. Remember to pause and take three slow, deep breaths. This is a small, manageable step towards calm.",
  "You're not alone. Let's reframe that thought: instead of 'I failed,' try 'I am learning.' How does that feel?",
  "That's a lot to handle. What is one small, positive distraction you could do for the next 10 minutes?"
];

// Keyword-targeted canned responses for better relevance
const KEYWORD_RESPONSES = {
  exam: [
    "Exams can feel overwhelming. Try breaking study into short, focused sessions and prioritize the most important topics.",
    "For exams, try a 25-minute study session and a 5-minute break (Pomodoro). Which subject should we prioritize first?"
  ],
  stress: [
    "It sounds like you're stressed. Can you name one small step you can take right now to feel a little better?",
    "A quick grounding exercise may help: pause and take three slow, deep breaths. What do you notice after that?"
  ],
  thanks: [
    "You're welcome — I'm here to help anytime.",
    "Glad it helped. Would you like another quick coping technique?"
  ],
  default: MOCK_RESPONSES
};

// Store last response per session to avoid repetition (in-memory for P0)
const lastResponses = new Map();

// For now we strictly use the local mock AI implementation
exports.generateResponse = async (message, userId = 'anon') => {
  // Delegate to mock service
  const reply = mockAiService.generateResponse(message);
  return reply;
};

// --- End Mock-only LLM Implementation ---

// --- End P0 Mock Implementation ---