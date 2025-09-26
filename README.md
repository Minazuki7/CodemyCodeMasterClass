# AI WebDev Demo — Chatbot & Summariser

A minimal demo showing:
- **Backend**: Node.js + Express endpoints that proxy requests to OpenAI.
- **Frontend**: Vite + React single-page app with Chat and Summariser.

## Structure
- backend/ — Express server
- frontend/ — Vite + React app
- cheat-sheet.md — talking points & run commands

## Quick start (dev)
1. Clone or unzip this repo.
2. Backend:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # set OPENAI_API_KEY in .env
   npm start
   ```
   Backend runs on http://localhost:3000

3. Frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend runs on http://localhost:5173 (or the port Vite prints).

## Notes
- **Do not commit your OpenAI API key**. Use `.env` and keep it private.
- This demo uses the OpenAI Chat Completions API (gpt-3.5-turbo).
- For production, secure the backend and add rate limits + usage monitoring.
# CodemyCodeMasterClass
