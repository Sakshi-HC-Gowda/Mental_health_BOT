// /frontend-mobile/src/api/chatApi.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Needed for P0 anonymous session ID
import { API_BASE_URL } from '../utils/constants';

const SESSION_KEY = '@MindBloom:SessionId';

/**
 * P0: Gets or generates a unique anonymous session ID for the user.
 * This is used as the 'userId' in the backend for tracking.
 */
const getOrCreateSessionId = async () => {
  let sessionId = await AsyncStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    // Generate UUID if one doesn't exist (assuming 'uuid' package is installed)
    // For simplicity in this P0 starter, let's mock the UUID generation
    // In a real app, you would use: import { v4 as uuidv4 } from 'uuid';
    sessionId = `anon-${Date.now()}-${Math.floor(Math.random() * 1000)}`; 
    await AsyncStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
};

/**
 * P0: Sends a message to the backend for safety check and AI response.
 * @param {string} message - The user's message.
 * @returns {Promise<object>} - The backend response (status, response/helpline).
 */
export const sendMessage = async (message) => {
  const sessionId = await getOrCreateSessionId();

  try {
    const response = await axios.post(`${API_BASE_URL}/send`, 
      { message },
      {
        headers: {
          // P0: Pass the anonymous ID as a custom header
          'X-User-Session-Id': sessionId, 
          'Content-Type': 'application/json',
        },
      }
    );
    
    // Response will contain status: 'ok' or 'crisis_detected'
    return response.data; 

  } catch (error) {
    console.error('API Error:', error);
    // Return a structured error response for the UI to handle
    return { 
      status: 'error', 
      message: 'Network connection failed. Please check your internet.' 
    };
  }
};