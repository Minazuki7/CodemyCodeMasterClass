import React, { useState } from "react";

// ======= App Component =======
export default function App() {
  const [tab, setTab] = useState("chat");

  return (
    <div
      style={{
        fontFamily: "Inter, Arial",
        padding: 20,
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <h1>AI WebDev Demo</h1>
      <div style={{ marginBottom: 10 }}>
        <button onClick={() => setTab("chat")} style={{ marginRight: 8 }}>
          Chatbot
        </button>
        <button onClick={() => setTab("summarise")}>Summariser</button>
      </div>

      {tab === "chat" ? <Chat /> : <Summariser />}

      <footer style={{ marginTop: 30, fontSize: 13, color: "#666" }}>
        Backend endpoints: <code>/api/chat</code> and{" "}
        <code>/api/summarise</code>
      </footer>
    </div>
  );
}

// ======= Chat Component =======
function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  async function send() {
    if (!input) return;

    const userMsg = { from: "you", text: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    try {
      const res = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { from: "bot", text: data.reply || data.error || "No reply" },
      ]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        { from: "bot", text: "Error contacting backend" },
      ]);
    }
  }

  // ======= Format AI Text =======
  function parseBotText(text) {
    if (!text) return null;

    // Split by lines
    const lines = text.split(/\n+/);
    return lines.map((line, i) => {
      line = line.trim();
      if (!line) return null;

      // Heading
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <h4 key={i} style={{ margin: "8px 0" }}>
            {line.replace(/\*\*/g, "")}
          </h4>
        );
      }

      // Bullets
      if (line.startsWith("* ")) {
        return <li key={i}>{line.replace("* ", "")}</li>;
      }

      // Numbered lists
      if (/^\d+\./.test(line)) {
        return <li key={i}>{line}</li>;
      }

      // Paragraph
      return (
        <p key={i} style={{ margin: "6px 0" }}>
          {line}
        </p>
      );
    });
  }

  return (
    <div>
      <div
        style={{
          border: "1px solid #ddd",
          padding: 12,
          minHeight: 200,
          marginBottom: 10,
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              marginBottom: 12,
              textAlign: m.from === "you" ? "right" : "left",
            }}
          >
            <div
              style={{
                display: "inline-block",
                background: m.from === "you" ? "#def" : "#eee",
                padding: 10,
                borderRadius: 8,
                maxWidth: "80%",
                whiteSpace: "pre-wrap",
                textAlign: "left",
              }}
            >
              <strong>{m.from}</strong>:{" "}
              {m.from === "bot" ? <div>{parseBotText(m.text)}</div> : m.text}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          style={{ flex: 1, padding: 8 }}
          placeholder="Ask something about web dev..."
        />
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
}

// ======= Summariser Component =======
function Summariser() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  async function doSumm() {
    if (!text) return;
    setResult("Summarising...");
    try {
      const res = await fetch("http://localhost:3000/api/summarise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setResult(data.summary || data.error || "No summary");
    } catch (err) {
      setResult("Error contacting backend");
    }
  }

  // Parse the summary text nicely (reuse the same parser)
  function formatSummary(text) {
    return <div>{parseBotText(text)}</div>;
  }

  // Reuse parseBotText for consistency
  function parseBotText(text) {
    if (!text) return null;
    const lines = text.split(/\n+/);
    return lines.map((line, i) => {
      line = line.trim();
      if (!line) return null;
      if (line.startsWith("**") && line.endsWith("**"))
        return (
          <h4 key={i} style={{ margin: "6px 0" }}>
            {line.replace(/\*\*/g, "")}
          </h4>
        );
      if (line.startsWith("* "))
        return <li key={i}>{line.replace("* ", "")}</li>;
      if (/^\d+\./.test(line)) return <li key={i}>{line}</li>;
      return (
        <p key={i} style={{ margin: "4px 0" }}>
          {line}
        </p>
      );
    });
  }

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        style={{ width: "100%", padding: 8 }}
        placeholder="Paste article or text here..."
      />
      <div style={{ marginTop: 8 }}>
        <button onClick={doSumm}>Summarise</button>
      </div>
      <div
        style={{
          marginTop: 12,
          background: "#f7f7f7",
          padding: 12,
          borderRadius: 6,
        }}
      >
        {formatSummary(result)}
      </div>
    </div>
  );
}
