import { useEffect, useRef } from 'react';

export default function ChatDisplay({
  chatHistory,
  currentPersonaData,
  consoleData,
  loading,
  error,
  messageInput,
  setMessageInput,
  onSendMessage,
  onKeyPress
}) {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, loading]);

  const formatMessage = (content) => {
    return content.length > 200 ? content.substring(0, 200) + '...' : content;
  };

  return (
    <section className="console-border bg-amber-900 animate-tv-static flex flex-col" style={{ height: '400px' }}>
      {/* Chat Header */}
      <div className="console-border bg-orange-600 text-amber-100 p-3 flex justify-between items-center">
        <div className="flex items-center space-x-2 font-mono">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span>💬 CHAT WITH: {currentPersonaData?.name || consoleData.hostName}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-sm font-mono">ONLINE</div>
          <button
            onClick={() => {
              if (window.confirm('Clear this conversation?')) {
                // Clear chat for current persona
                const currentPersonaId = currentPersonaData?.id;
                if (currentPersonaId) {
                  const histories = JSON.parse(localStorage.getItem('persona-chat-histories') || '{}');
                  delete histories[currentPersonaId];
                  localStorage.setItem('persona-chat-histories', JSON.stringify(histories));
                  window.location.reload(); // Simple refresh to update state
                }
              }
            }}
            className="text-xs px-2 py-1 console-border bg-red-600 text-red-100 hover:bg-red-700 transition-colors font-mono"
            title="Clear conversation"
          >
            🗑️
          </button>
        </div>
      </div>
      
      {/* Chat Messages */}
      <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-3 bg-amber-950">
        {chatHistory.length === 0 ? (
          <div className="console-border bg-orange-600 text-amber-100 p-3 animate-message-bubble-up">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg">{consoleData.host}</span>
              <span className="text-sm font-bold font-mono">{consoleData.hostName}</span>
            </div>
            <p className="text-sm font-mono animate-typewriter-effect">
              Hello! I'm {currentPersonaData?.name || consoleData.hostName}. 
              {currentPersonaData?.bio ? ` ${currentPersonaData.bio}` : ' Ready to chat!'}
            </p>
          </div>
        ) : (
          chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`console-border p-3 animate-message-bubble-up font-mono ${
                msg.role === 'user'
                  ? 'bg-teal-500 text-gray-100 ml-8'
                  : 'bg-orange-600 text-amber-100'
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-lg">
                  {msg.role === 'user' ? '👤' : consoleData.host}
                </span>
                <span className="text-sm font-bold">
                  {msg.role === 'user' ? 'YOU' : consoleData.hostName}
                </span>
              </div>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {formatMessage(msg.content)}
              </p>
              <div className="text-xs opacity-70 mt-2 text-right">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
        
        {/* Loading indicator */}
        {loading && (
          <div className="console-border bg-orange-600 text-amber-100 p-3 animate-message-bubble-up font-mono">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg">{consoleData.host}</span>
              <span className="text-sm font-bold">{consoleData.hostName}</span>
            </div>
            <div className="flex gap-1 p-2">
              <span className="w-2 h-2 rounded-full bg-amber-300 animate-bounce [animation-delay:-0.32s]"></span>
              <span className="w-2 h-2 rounded-full bg-amber-300 animate-bounce [animation-delay:-0.16s]"></span>
              <span className="w-2 h-2 rounded-full bg-amber-300 animate-bounce"></span>
            </div>
          </div>
        )}
      </div>
      
      {/* Error display */}
      {error && (
        <div className="bg-red-600 text-red-100 p-3 m-2 console-border font-mono">
          ⚠️ ERROR: {error}
        </div>
      )}
      
      {/* Chat Input */}
      <div className="console-border bg-gray-600 p-3 flex space-x-3">
        <input
          type="text"
          placeholder="Type your message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyPress={onKeyPress}
          disabled={loading}
          className="console-border bg-amber-950 text-amber-100 flex-1 p-2 vintage-glow focus:animate-warm-glow transition-all font-mono placeholder-amber-400 focus:outline-none disabled:opacity-50"
        />
        <button
          onClick={onSendMessage}
          disabled={loading || !messageInput.trim()}
          className="console-border bg-orange-600 text-amber-100 px-4 py-2 vintage-glow hover:animate-warm-glow transition-all font-mono disabled:opacity-50 disabled:cursor-not-allowed"
        >
          SEND
        </button>
      </div>
    </section>
  );
}