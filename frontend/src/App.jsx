import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [personas, setPersonas] = useState([]);
  const [selectedPersona, setSelectedPersona] = useState("");
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPersonas();
  }, []);

  const fetchPersonas = async () => {
    try {
      const response = await fetch("/api/personas");
      const data = await response.json();
      if (data.success) {
        setPersonas(data.data);
        if (data.data.length > 0) {
          setSelectedPersona(data.data[0].id);
        }
      }
    } catch (err) {
      setError("Failed to fetch personas");
      console.error("Error fetching personas:", err);
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || !selectedPersona) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/chat/quick", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personaId: selectedPersona,
          message: message.trim(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        const newMessage = {
          role: "user",
          content: message.trim(),
          timestamp: new Date().toISOString(),
        };
        const aiResponse = {
          role: "assistant",
          content: data.data.response,
          timestamp: data.data.timestamp,
          persona: data.data.persona,
        };

        setChatHistory((prev) => [...prev, newMessage, aiResponse]);
        setMessage("");
      } else {
        setError(data.message || "Failed to send message");
      }
    } catch (err) {
      setError("Failed to send message");
      console.error("Error sending message:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🤖 Persona AI Chat</h1>
        <p>Chat with AI personas powered by OpenAI</p>
      </header>

      <main className="app-main">
        <div className="persona-selector">
          <label htmlFor="persona-select">Choose a Persona:</label>
          <select
            id="persona-select"
            value={selectedPersona}
            onChange={(e) => setSelectedPersona(e.target.value)}
          >
            {personas.map((persona) => (
              <option key={persona.id} value={persona.id}>
                {persona.name} - {persona.title}
              </option>
            ))}
          </select>
        </div>

        <div className="chat-container">
          <div className="chat-messages">
            {chatHistory.length === 0 ? (
              <div className="welcome-message">
                <p>👋 Welcome! Select a persona and start chatting.</p>
                <p>Available personas:</p>
                <ul>
                  {personas.map((persona) => (
                    <li key={persona.id}>
                      <strong>{persona.name}</strong> - {persona.bio}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${
                    msg.role === "user" ? "user-message" : "ai-message"
                  }`}
                >
                  {msg.role === "assistant" && msg.persona && (
                    <div className="persona-info">
                      <img
                        src={msg.persona.avatar}
                        alt={msg.persona.name}
                        className="persona-avatar"
                      />
                      <span className="persona-name">{msg.persona.name}</span>
                    </div>
                  )}
                  <div className="message-content">{msg.content}</div>
                  <div className="message-time">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))
            )}
            {loading && (
              <div className="message ai-message">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="chat-input">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              disabled={loading}
              rows={3}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !message.trim() || !selectedPersona}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
