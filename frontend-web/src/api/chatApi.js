import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const SESSION_KEY = 'MindBloomSessionId';

/**
 * P0: Gets or generates a unique anonymous session ID for the user using localStorage.
 */
const getOrCreateSessionId = () => {
  let sessionId = localStorage.getItem(SESSION_KEY);

  if (!sessionId) {
    // Simple anonymous session ID (P0)
    sessionId = `anon-web-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    localStorage.setItem(SESSION_KEY, sessionId);
  }

  return sessionId;
};

/**
 * P0: Sends a message to the backend for AI response.
 * @param {string} message - The user's message.
 * @returns {Promise<object>} - Backend response
 */
export const sendMessage = async (message) => {
  const sessionId = getOrCreateSessionId();

  try {
    const response = await axios.post(
      `${API_BASE_URL}/send`,   // backend endpoint
      { message },
      {
        headers: {
          'X-User-Session-Id': sessionId,
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 seconds safety timeout
      }
    );

    return response.data;

  } catch (error) {
    console.error('Chat API Error:', error.message);

    return {
      status: 'error',
      message:
        'Unable to connect to the server. Please make sure the backend is running.',
    };
  }
};
