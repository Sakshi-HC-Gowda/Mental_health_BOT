// /backend/services/mockAiService.js

// Keyword-based responses
const KEYWORD_RESPONSES = {
  hi: ["Hi — I'm here for you. What's on your mind?", "Hello — thanks for reaching out. How can I help right now?"],
  hello: ["Hello — how are you feeling today?", "Hi there — I'm listening whenever you're ready to share."],
  anxious: ["I'm sorry you're feeling anxious. Try taking three slow, deep breaths and tell me one thing that's worrying you.", "Anxiety can be overwhelming — can you describe where in your body you feel it most right now?"],
  stress: ["Stress can build up. What's one small step you might take right now to reduce it?", "When stress hits, small breaks help. Could you step away for 5 minutes and notice anything different?"],
  sad: ["I'm sorry you're feeling sad. You're not alone — can you tell me what happened?", "Sad feelings are valid. Do you want a short grounding exercise right now?"],
};

const FALLBACKS = [
  "That sounds really tough. Let's try a grounding technique: name five things you can see, four you can touch, three you can hear.",
  "It's completely normal to feel this way. Can you break one problem into a smaller step you could try?",
  "Thank you for sharing. Remember to pause and take three slow, deep breaths — how do you feel after that?",
  "You're not alone. Let's reframe one thought: instead of 'I failed' try 'I am learning' — how does that land?",
  "That's a lot to handle. What is one small, positive distraction you could do for the next 10 minutes?"
];

/**
 * Generates a response based on keywords; falls back to CBT-style fallbacks.
 * @param {string} message
 * @returns {string}
 */
exports.generateResponse = (message) => {
  const lower = (message || '').toLowerCase();

  // Check for exact keyword presence
  for (const key of Object.keys(KEYWORD_RESPONSES)) {
    const re = new RegExp(`\\b${key}\\b`, 'i');
    if (re.test(lower)) {
      const pool = KEYWORD_RESPONSES[key];
      return pool[Math.floor(Math.random() * pool.length)];
    }
  }

  // Fallback
  return FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)];
};
