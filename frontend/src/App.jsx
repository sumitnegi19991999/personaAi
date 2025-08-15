import { useState, useEffect } from "react";
import RetroConsole from "./components/RetroConsole";

function App() {
  const [personas, setPersonas] = useState([]);
  const [selectedPersona, setSelectedPersona] = useState("");
  const [chatHistories, setChatHistories] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPersonas();
    loadChatHistories();
  }, []);

  // Load chat histories from localStorage
  const loadChatHistories = () => {
    try {
      const savedHistories = localStorage.getItem('persona-chat-histories');
      if (savedHistories) {
        setChatHistories(JSON.parse(savedHistories));
      }
    } catch (err) {
      console.error("Error loading chat histories:", err);
    }
  };

  // Save chat histories to localStorage
  const saveChatHistories = (histories) => {
    try {
      localStorage.setItem('persona-chat-histories', JSON.stringify(histories));
    } catch (err) {
      console.error("Error saving chat histories:", err);
    }
  };

  const fetchPersonas = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${API_URL}/api/personas`);
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

  // Handle persona selection change
  const handlePersonaChange = (newPersonaId) => {
    setSelectedPersona(newPersonaId);
    setError(""); // Clear any existing errors when switching
  };

  const sendMessage = async (messageContent) => {
    if (!messageContent || !selectedPersona) return;

    setLoading(true);
    setError("");

    // Add user message to current persona's chat history
    const userMessage = {
      role: "user",
      content: messageContent,
      timestamp: new Date().toISOString(),
    };

    // Update chat histories with new user message
    const updatedHistories = {
      ...chatHistories,
      [selectedPersona]: [...(chatHistories[selectedPersona] || []), userMessage]
    };
    setChatHistories(updatedHistories);
    saveChatHistories(updatedHistories);

    try {
      const API_URL = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${API_URL}/api/chat/quick`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personaId: selectedPersona,
          message: messageContent,
        }),
      });

      const data = await response.json();

      if (data.success) {
        const aiResponse = {
          role: "assistant",
          content: data.data.response,
          timestamp: data.data.timestamp,
          persona: data.data.persona,
        };

        // Add AI response to current persona's chat history
        const finalHistories = {
          ...updatedHistories,
          [selectedPersona]: [...updatedHistories[selectedPersona], aiResponse]
        };
        setChatHistories(finalHistories);
        saveChatHistories(finalHistories);
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

  // Get current persona's chat history
  const currentChatHistory = chatHistories[selectedPersona] || [];

  return (
    <RetroConsole
      personas={personas}
      selectedPersona={selectedPersona}
      setSelectedPersona={handlePersonaChange}
      chatHistory={currentChatHistory}
      onSendMessage={sendMessage}
      loading={loading}
      error={error}
    />
  );
}

export default App;
