// /frontend-web/src/pages/ChatPage.js
import React, { useState, useCallback } from 'react';
import { sendMessage } from '../api/chatApi';
import CrisisModal from '../components/CrisisModal';
import { COLORS } from '../utils/constants';

// Mock Component for Chat Bubbles (P0 simplicity)
const ChatBubble = ({ message }) => (
  <div 
    className={`chat-bubble ${message.user === 'user' ? 'user-bubble' : 'bot-bubble'}`}
    style={{ 
        backgroundColor: message.user === 'user' ? COLORS.chatBubbleUser : COLORS.chatBubbleBot,
        border: message.user === 'user' ? `1px solid ${COLORS.primary}` : 'none',
        alignSelf: message.user === 'user' ? 'flex-end' : 'flex-start'
    }}
  >
    {message.text}
  </div>
);

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, user: 'bot', text: "Hello! I'm MindBloom, your private AI support. How are you feeling right now? Remember, I'm here to listen without judgment." }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCrisisModalVisible, setIsCrisisModalVisible] = useState(false);

  // Scroll to bottom logic
  const chatEndRef = React.useRef(null);
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  // UseEffect to scroll when messages update
  React.useEffect(scrollToBottom, [messages]);

  const handleSendMessage = useCallback(async (e) => {
    // Prevent form submission default if called by Enter key
    e?.preventDefault(); 
    
    if (!inputText.trim() || isLoading) return;

    const userMessage = inputText.trim();
    const newUserMessage = { id: Date.now(), user: 'user', text: userMessage };
    
    // 1. Update UI immediately with user's message
    setMessages(prev => [...prev, newUserMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // 2. Call the P0 API
      const response = await sendMessage(userMessage);

      // 3. Handle Crisis Detection (P0 CRITICAL PATH)
      if (response.status === 'crisis_detected') {
        setIsCrisisModalVisible(true); // Show the safety lockout modal
        const crisisBotMessage = {
          id: Date.now() + 1,
          user: 'bot',
          text: response.message || 'We detected a high-risk phrase. Please use the emergency button.'
        };
        setMessages(prev => [...prev, crisisBotMessage]);
      } 
      // 4. Handle Normal AI Response
      else if (response.status === 'ok' && response.response) {
        const botMessage = {
          id: Date.now() + 1,
          user: 'bot',
          text: response.response,
        };
        setMessages(prev => [...prev, botMessage]);
      } 
      // 5. Handle General Error
      else {
        alert(response.message || 'An unknown error occurred.');
      }
    } catch (error) {
      alert('Network Error', 'Could not connect to the MindBloom server.');
    } finally {
      setIsLoading(false);
    }
  }, [inputText, isLoading]);

  const handleCloseCrisisModal = () => {
    setIsCrisisModalVisible(false);
  };

  return (
    <div className="chat-container">
      {/* P0: Crisis Modal - Must be the top layer */}
      <CrisisModal 
        visible={isCrisisModalVisible} 
        onClose={handleCloseCrisisModal} 
      />

      <div className="chat-header" style={{ backgroundColor: COLORS.secondary }}>
        <h1 className="header-title">MindBloom Chat</h1>
        <button 
          className="emergency-button"
          onClick={() => setIsCrisisModalVisible(true)}
          style={{ backgroundColor: COLORS.crisisRed }}
        >
          🚨 Emergency
        </button>
      </div>
      
      {/* Chat Messages */}
      <div className="chat-list">
        {messages.map(message => (
          <ChatBubble key={message.id} message={message} />
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <form className="input-container" onSubmit={handleSendMessage}>
        <textarea
          className="text-input"
          placeholder="Type your message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isLoading || isCrisisModalVisible}
        />
        <button 
          type="submit"
          className="send-button"
          disabled={!inputText.trim() || isLoading || isCrisisModalVisible}
          style={{ backgroundColor: COLORS.primary }}
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </form>

      {/* Basic required CSS for this component (should be in ChatPage.css) */}
      <style>{`
        .chat-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          max-width: 600px;
          margin: 0 auto;
          background: ${COLORS.background};
        }
        .chat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          border-bottom: 1px solid #ccc;
        }
        .header-title { font-size: 20px; color: ${COLORS.textDark}; margin: 0; }
        .emergency-button { 
          color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; 
        }
        .chat-list {
          flex: 1;
          padding: 10px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }
        .chat-bubble {
          padding: 10px;
          border-radius: 15px;
          max-width: 80%;
          margin-bottom: 8px;
        }
        .user-bubble { align-self: flex-end; }
        .bot-bubble { align-self: flex-start; }
        .input-container {
          display: flex;
          padding: 10px;
          border-top: 1px solid #ccc;
          background: white;
        }
        .text-input {
          flex: 1;
          border: 1px solid #ddd;
          border-radius: 20px;
          padding: 10px 15px;
          margin-right: 10px;
          resize: none;
          max-height: 100px;
          font-family: inherit;
        }
        .send-button {
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 20px;
          cursor: pointer;
        }
        .send-button:disabled {
          background: #aaa !important;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default ChatPage;