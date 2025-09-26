import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3.2:3b";

// Simple health check
app.get("/", (req, res) => res.send({ status: "ok" }));

// Check if Ollama is running
app.get("/api/health", async (req, res) => {
  try {
    const response = await axios.get(`${OLLAMA_URL}/api/tags`);
    res.json({
      status: "Ollama is running",
      models: response.data.models,
    });
  } catch (error) {
    res.status(500).json({
      status: "Ollama is not available",
      error: error.message,
    });
  }
});

// Chat endpoint - uses local Ollama
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "message required" });

    const response = await axios.post(
      `${OLLAMA_URL}/api/generate`,
      {
        model: OLLAMA_MODEL,
        prompt: message,
        stream: false,
        options: {
          temperature: 0.7,
          num_predict: 1000, // Max tokens
        },
      },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 60000, // 60 second timeout
      }
    );

    const reply = response.data?.response || "No reply generated";
    res.json({ reply });
  } catch (err) {
    console.error("Ollama chat error:", err.message);

    if (err.code === "ECONNREFUSED") {
      return res.status(500).json({
        error: "Ollama is not running",
        solution: "Start Ollama with: ollama serve",
      });
    }

    res.status(500).json({
      error: "Chat request failed",
      detail: err.message,
    });
  }
});

// Summarise endpoint
app.post("/api/summarise", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "text required" });

    const prompt = `Please summarize the following text into 3 concise bullet points and a one-line TL;DR. Be direct and factual:\n\n${text}`;

    const response = await axios.post(
      `${OLLAMA_URL}/api/generate`,
      {
        model: OLLAMA_MODEL,
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.3, // Lower temp for more consistent summaries
          num_predict: 500,
        },
      },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 60000,
      }
    );

    const summary = response.data?.response || "No summary generated";
    res.json({ summary });
  } catch (err) {
    console.error("Ollama summarise error:", err.message);
    res.status(500).json({
      error: "Summary request failed",
      detail: err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Ollama URL: ${OLLAMA_URL}`);
  console.log(`🤖 Model: ${OLLAMA_MODEL}`);
  console.log(`💡 Check /api/health to verify Ollama connection`);
});
