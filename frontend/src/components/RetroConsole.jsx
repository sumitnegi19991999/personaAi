import { useState, useEffect, useRef } from "react";
import ChannelSelector from "./ChannelSelector";
import ChatDisplay from "./ChatDisplay";
import ConsoleControls from "./ConsoleControls";
import "./RetroConsole.css";

const PERSONAS = {
  1: {
    name: "ROYAL CHAT",
    host: "👑",
    hostName: "KING ARTHUR",
    persona: "royal",
    theme: "bg-orange-600",
  },
  2: {
    name: "MAGIC CHAT",
    host: "🧙‍♂️",
    hostName: "MERLIN",
    persona: "wizard",
    theme: "bg-teal-500",
  },
  3: {
    name: "AI CHAT",
    host: "🤖",
    hostName: "EINSTEIN",
    persona: "scientist",
    theme: "bg-teal-600",
  },
  4: {
    name: "STUDY CHAT",
    host: "📚",
    hostName: "PROFESSOR",
    persona: "teacher",
    theme: "bg-gray-600",
  },
  5: {
    name: "BUSINESS CHAT",
    host: "💼",
    hostName: "CEO WATSON",
    persona: "business",
    theme: "bg-orange-600",
  },
  6: {
    name: "DRAMA CHAT",
    host: "🎭",
    hostName: "SHAKESPEARE",
    persona: "actor",
    theme: "bg-teal-500",
  },
};

export default function RetroConsole({
  personas = [],
  selectedPersona,
  setSelectedPersona,
  chatHistory,
  onSendMessage,
  loading,
  error,
}) {
  const [currentChannel, setCurrentChannel] = useState(3);
  const [isOn, setIsOn] = useState(true);
  const [messageInput, setMessageInput] = useState("");
  const crtScreenRef = useRef(null);

  // Map API personas to console channels
  const mapPersonaToChannel = (personaId) => {
    const personaIndex = personas.findIndex((p) => p.id === personaId);
    return personaIndex >= 0 ? Math.min(personaIndex + 1, 6) : 3;
  };

  const mapChannelToPersona = (channel) => {
    const personaIndex = channel - 1;
    return personas[personaIndex]?.id || personas[0]?.id;
  };

  useEffect(() => {
    if (selectedPersona) {
      const channel = mapPersonaToChannel(selectedPersona);
      setCurrentChannel(channel);
    }
  }, [selectedPersona, personas]);

  const switchChannel = (newChannel) => {
    if (newChannel < 1 || newChannel > Math.min(6, personas.length)) return;

    // Add channel switch animation
    if (crtScreenRef.current) {
      crtScreenRef.current.classList.add("animate-channel-switch");
    }

    setTimeout(() => {
      setCurrentChannel(newChannel);
      const newPersonaId = mapChannelToPersona(newChannel);
      setSelectedPersona(newPersonaId);

      if (crtScreenRef.current) {
        crtScreenRef.current.classList.remove("animate-channel-switch");
      }
    }, 250);
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedPersona || loading) return;

    onSendMessage(messageInput.trim());
    setMessageInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const currentPersonaData = personas.find((p) => p.id === selectedPersona);
  const consoleData = PERSONAS[currentChannel] || PERSONAS[3];

  return (
    <div className="retro-console max-w-4xl mx-auto p-8 animate-console-startup">
      {/* Console Top */}
      <div className="console-border bg-amber-900 p-6 mb-4 wood-grain">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-orange-300 animate-warm-glow font-mono">
              ChaiCode Castle
            </h1>
            <div className="power-led animate-power-led-pulse"></div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="channel-digit font-mono">
              CH {currentChannel.toString().padStart(2, "0")}
            </div>
            <button
              className="console-border bg-orange-600 text-amber-100 px-3 py-1 vintage-glow font-mono hover:animate-warm-glow transition-all"
              onClick={() => setIsOn(!isOn)}
            >
              PWR
            </button>
          </div>
        </div>
      </div>

      {/* Main CRT Screen */}
      <div className="console-border console-bezel p-8 animate-tv-power-on">
        <div ref={crtScreenRef} className="crt-screen p-6 animate-tube-warmup">
          <div className="scanline-beam animate-scanline-beam"></div>
          <div className="tv-static-overlay animate-channel-static"></div>

          {/* Channel Selector */}
          <ChannelSelector
            personas={personas}
            currentChannel={currentChannel}
            onChannelSelect={switchChannel}
            consoleData={PERSONAS}
          />

          {/* Chat Display */}
          <ChatDisplay
            chatHistory={chatHistory}
            currentPersonaData={currentPersonaData}
            consoleData={consoleData}
            loading={loading}
            error={error}
            messageInput={messageInput}
            setMessageInput={setMessageInput}
            onSendMessage={handleSendMessage}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>

      {/* Console Controls */}
      <ConsoleControls
        currentChannel={currentChannel}
        maxChannels={Math.min(6, personas.length)}
        onPrevChannel={() => switchChannel(currentChannel - 1)}
        onNextChannel={() => switchChannel(currentChannel + 1)}
        onPlay={() => {
          /* Add play functionality */
        }}
        onStop={() => {
          /* Add stop functionality */
        }}
      />

      {/* TV Stand */}
      <div className="h-8 bg-gradient-to-b from-amber-900 to-amber-800 console-border mt-2"></div>
    </div>
  );
}
