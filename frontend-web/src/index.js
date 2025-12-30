// /frontend-web/src/index.js (UPDATED)
import React from 'react';
import ReactDOM from 'react-dom/client';
// ⚠️ CHANGE: Import ChatPage from its location
import ChatPage from './pages/ChatPage'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* ⚠️ CHANGE: Render ChatPage directly */}
    <ChatPage /> 
  </React.StrictMode>
);