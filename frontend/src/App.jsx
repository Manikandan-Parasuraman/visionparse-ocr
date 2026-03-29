import React, { useState, useRef } from "react";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [streamText, setStreamText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dropRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const upload = async () => {
    if (!file) {
      setError("Please choose an image file first.");
      return;
    }

    setLoading(true);
    setError("");
    setStreamText("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/ocr-stream", {
        method: "POST",
        body: formData,
      });

      if (!res.ok || !res.body) {
        throw new Error(`API returned status ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let result = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        result += chunk;
        setStreamText(result);
      }

      setMessages((prev) => [...prev, { type: "bot", content: result }]);
      setPreview(null);
      setFile(null);
    } catch (err) {
      setError(err.message || "OCR request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card header">
        <h1>Vision Parse OCR</h1>
        <p>Upload an image and receive OCR text output.</p>
      </div>

      <div className="card">
        <div className="messages">
          {messages.length === 0 && !streamText && <div className="message">No results yet.</div>}
          {messages.map((m, idx) => (
            <div key={idx} className={`message ${m.type}`}>
              <strong>{m.type === "bot" ? "OCR" : "User"}:</strong> {m.content}
            </div>
          ))}
          {streamText && (
            <div className="message bot">
              <strong>Streaming:</strong> {streamText}
            </div>
          )}
        </div>

        <div className="controls">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) {
                setFile(f);
                setPreview(URL.createObjectURL(f));
                setError("");
              }
            }}
          />

          <button onClick={upload} disabled={loading}>
            {loading ? "Processing..." : "Send"}
          </button>
        </div>

        {error && <p style={{ color: "#f87171" }}>{error}</p>}

        {preview && <img className="preview" src={preview} alt="preview" />}
      </div>

      <footer>
        Backend route: <code>/api/ocr-stream</code> — frontend proxy: <code>/api/</code>
      </footer>
    </div>
  );
}

