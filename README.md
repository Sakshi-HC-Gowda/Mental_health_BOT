🌱 MindBloom: Private AI Mental Health Support
MindBloom is a privacy-first AI mental health companion designed to provide immediate, anonymous support. The P0 MVP focuses on establishing a secure connection between a React frontend and a Node.js backend, featuring a Critical Safety Protocol for crisis detection.

🚀 How It Works
MindBloom operates on a classic Client-Server Architecture. When a user sends a message, it undergoes a safety check before generating an empathetic response.

User Input: The user types a message in the React-based Chat UI.

API Request: The message is sent via Axios to the Node.js/Express backend.

Safety Filter (P0 Protocol): The backend immediately scans the text for high-risk crisis keywords.

AI Simulation: * If a Crisis is detected: The backend returns a specific trigger code that forces the frontend to display an emergency modal.

If Safe: The backend passes the message to a Mock AI Service, which selects an empathetic response and returns it after a simulated "thinking" delay.

✨ Key Features (P0 MVP)
Anonymous Chat: No login required; uses session-based IDs stored in local storage.

Safety First: Immediate detection of self-harm or crisis language.

Emergency Intervention: Full-screen Crisis Modal with direct links to TELE MANAS (1-800-891-4416).

Empathetic Mock AI: Specialized responses for anxiety, stress, and sadness without requiring an expensive API key.

Responsive UI: Clean, minimalist design optimized for emotional safety.

🛠️ Tech Stack
Frontend:

React.js: Component-based UI.

Axios: For handling asynchronous API calls.

CSS-in-JS: Inline styling for rapid P0 development and portability.

Backend:

Node.js & Express: For routing and middleware management.

CORS: To allow secure communication between the frontend and backend ports.

Mock Service: Custom logic for AI simulation.

📦 Installation & Setup
1. Prerequisites
Node.js (v14 or higher)

npm (v6 or higher)

2. Backend Setup
Bash

cd backend
npm install
npm start
The server will run on http://localhost:3000.

3. Frontend Setup
Bash

cd frontend-web
npm install
npm start
The web app will open on http://localhost:3001.

🧪 Testing the MVP
To verify that the P0 requirements are met, perform these two tests:

Normal Flow: Type "I've been feeling a bit stressed lately." * Expected: The bot should wait ~1.2 seconds and reply with a supportive message about stress.

Safety Flow: Type "I want to end it all." * Expected: The chat should instantly lock and a red Crisis Modal should appear with emergency contact information.

🗺️ Roadmap (Future Phases)
P1: Integration with live LLMs (Gemini/OpenAI API).

P1: Mood tracking dashboard and daily check-ins.

P2: User authentication (Firebase/Auth0) for persistent chat history.

P2: Native Mobile App deployment (React Native).
