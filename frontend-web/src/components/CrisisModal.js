// /frontend-web/src/components/CrisisModal.js
import React from 'react';
import { TELE_MANAS_NUMBER, COLORS } from '../utils/constants';

const CrisisModal = ({ visible, onClose }) => {
  if (!visible) return null;

  // P0: Function to initiate the phone call (uses 'tel:' protocol)
  const handleCall = () => {
    window.location.href = `tel:${TELE_MANAS_NUMBER}`;
  };

  return (
    <div className="crisis-modal-overlay">
      <div className="crisis-modal-content">
        
        <h2 style={{ color: COLORS.crisisRed }}>🚨 SAFETY WARNING 🚨</h2>
        
        <p className="message">
          We have detected content that indicates you may be in distress.
          MindBloom is an **AI-ONLY** service and is not equipped to handle immediate crises.
        </p>
        
        <p className="message-bold">
          YOUR SAFETY IS PARAMOUNT. Please reach out to a verified human professional right now.
        </p>

        {/* CRITICAL CTA - BIG RED BUTTON */}
        <button 
          className="call-button" 
          onClick={handleCall}
          style={{ backgroundColor: COLORS.crisisRed }}
        >
          <span className="call-button-text">CALL TELE MANAS NOW</span>
          <span className="call-button-subtext">
            {TELE_MANAS_NUMBER} (Toll-Free, 24/7)
          </span>
        </button>

        {/* Secondary Action - Return to chat */}
        <button 
          className="close-button" 
          onClick={onClose}
          style={{ color: COLORS.primary }}
        >
          I am safe now, return to chat
        </button>

      </div>

      {/* Basic required CSS for this component (should be in CrisisModal.css) */}
      <style>{`
        .crisis-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .crisis-modal-content {
          background: ${COLORS.background};
          padding: 40px;
          border-radius: 12px;
          max-width: 90%;
          text-align: center;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }
        .message { margin-bottom: 15px; font-size: 1.1em; }
        .message-bold { font-weight: bold; margin-bottom: 30px; font-size: 1.1em; }
        .call-button {
          border: none;
          color: white;
          padding: 15px 30px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1.2em;
          margin-bottom: 20px;
          display: block;
          width: 100%;
          line-height: 1.2;
        }
        .call-button-text { display: block; font-weight: bold; }
        .call-button-subtext { font-size: 0.8em; opacity: 0.9; }
        .close-button {
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 1em;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default CrisisModal;