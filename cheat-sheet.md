# Masterclass Cheat Sheet — "AI in Web Development"

## 2-hour Breakdown (short)
- 00:00–00:10 Intro & why AI
- 00:10–00:30 AI fundamentals (ML, DL, LLMs)
- 00:30–01:00 Tools & frontend demos (TF.js, embeddings, search)
- 01:00–01:30 Integrating APIs (OpenAI, HF) — show demo
- 01:30–01:50 Future trends & ethics
- 01:50–02:00 Q&A + resources

## Talking points for demos
- Backend acts as a safe proxy for API keys.
- Show a message flow: user -> frontend -> backend -> OpenAI -> backend -> frontend.
- Point out costs: each request hits the OpenAI billing meter.
- Mention rate limits and caching (vector DB for embeddings).

## Useful commands
- Start backend: `cd backend && npm install && npm start`
- Start frontend: `cd frontend && npm install && npm run dev`
