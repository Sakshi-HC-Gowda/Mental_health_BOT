# 🌱 MindBloom  
**Private AI Mental Health Support (P0 MVP)**

MindBloom is a **privacy-first AI mental health companion** designed to provide immediate, anonymous emotional support.  
This P0 MVP establishes a secure connection between a **React frontend** and a **Node.js backend**, featuring a **Critical Safety Protocol** for crisis detection and emergency intervention.

---

## 💡 Motivation & Origin

MindBloom was created as part of a **Startup School – “Prompt to Prototype” challenge**.

The objective was to:
- Identify a **real-world critical problem**
- Move from **idea → functional MVP**
- Deliver within a **rapid development cycle**

### Why MindBloom?

**The Problem**  
Mental health resources are often:
- Expensive  
- Slow to access  
- Not anonymous  
- Missing immediate crisis intervention  

**The Mission**  
To demonstrate that AI can serve as a **safe first step** for individuals seeking help—acting as a **bridge to human support (like Tele MANAS)** rather than replacing it.

**Prototype Goal**  
Build a **high-fidelity, privacy-first chat interface** capable of:
- Providing empathetic support
- Instantly handling crisis situations with safety lockouts

---

## 🚀 How It Works

MindBloom follows a **Client–Server Architecture** with a safety-first workflow.

### System Flow

1. **User Input**  
   User types a message in the React-based chat UI.

2. **API Request**  
   Message is sent to the backend via Axios.

3. **Safety Filter (P0 Protocol)**  
   Backend scans the message for high-risk or crisis keywords.

4. **Response Handling**
   - **If Crisis Detected:**  
     Backend returns a trigger code → Frontend displays a **full-screen Crisis Modal**.
   - **If Safe:**  
     Message is passed to a **Mock AI Service**, which returns an empathetic response after a simulated delay.

---

## ✨ Key Features (P0 MVP)

- **Anonymous Chat**  
  No login required; session-based IDs stored in local storage.

- **Safety First Design**  
  Immediate detection of self-harm or crisis language.

- **Emergency Intervention**  
  Full-screen Crisis Modal with direct access to **TELE MANAS (1-800-891-4416)**.

- **Empathetic Mock AI**  
  Domain-specific responses for stress, anxiety, and sadness—no paid API required.

- **Responsive UI**  
  Clean, minimalist design optimized for emotional safety.

---

## 🛠️ Tech Stack

### Frontend
- **React.js** – Component-based UI
- **Axios** – API communication
- **CSS-in-JS** – Inline styles for rapid P0 development

### Backend
- **Node.js & Express** – API routing and middleware
- **CORS** – Secure cross-origin communication
- **Mock AI Service** – Custom logic for AI simulation

---

## 📦 Installation & Setup

### 1️⃣ Prerequisites
- Node.js **v14+**
- npm **v6+**

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm start
```
Backend runs on:
http://localhost:3000

## 3️⃣ Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd frontend-web
npm install
npm start
```
The frontend application will run on:
http://localhost:3001

### 🧪 Testing the MVP
-**✅ Normal Flow**

Input:
```bash
I've been feeling a bit stressed lately.
```
Expected Result:

~1.2 second response delay

Supportive, empathetic message related to stress

-**🚨 Safety Flow**

Input:
```bash
I want to end it all.
```

Expected Result:

Chat immediately locks
Red Crisis Modal appears
Emergency contact information is displayed

### 🗺️ Roadmap
-**🔹 P1 – Intelligence & Insight**

Live LLM integration (Gemini / OpenAI)

Mood tracking dashboard

Daily emotional check-ins

-**🔹 P2 – Scale & Persistence**

User authentication (Firebase / Auth0)

Persistent chat history

Native mobile application (React Native)

### 🌸 Final Note

MindBloom exists to prove one thing:

Technology can be compassionate—when safety, privacy, and humanity come first.
