export default function ChannelSelector({ 
  personas, 
  currentChannel, 
  onChannelSelect, 
  consoleData 
}) {
  // Get message count for a persona from localStorage
  const getMessageCount = (personaIndex) => {
    try {
      const persona = personas[personaIndex];
      if (!persona) return 0;
      
      const histories = JSON.parse(localStorage.getItem('persona-chat-histories') || '{}');
      const personaHistory = histories[persona.id] || [];
      return personaHistory.length;
    } catch {
      return 0;
    }
  };
  const getChannelData = (channelNum) => {
    const persona = personas[channelNum - 1];
    const defaultData = consoleData[channelNum];
    
    if (persona) {
      return {
        ...defaultData,
        hostName: persona.name.toUpperCase(),
        name: `${persona.title.toUpperCase()} CHAT`
      };
    }
    return defaultData;
  };

  return (
    <section className="console-border bg-amber-900 p-4 mb-4 animate-tv-static">
      <div className="text-center mb-4">
        <h2 className="text-lg text-orange-300 font-mono">═══ PERSONA CHANNELS ═══</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((channelNum) => {
          if (channelNum > personas.length) return null;
          
          const channelData = getChannelData(channelNum);
          const isActive = currentChannel === channelNum;
          const messageCount = getMessageCount(channelNum - 1);
          
          return (
            <div
              key={channelNum}
              className={`console-border p-3 text-center vintage-glow cursor-pointer transition-all character-card font-mono relative ${
                isActive 
                  ? 'bg-teal-600 text-gray-100 animate-character-card-hover' 
                  : channelData.theme + ' text-amber-100 hover:animate-character-card-hover'
              }`}
              onClick={() => onChannelSelect(channelNum)}
            >
              <div className="text-xs text-amber-200 mb-1">CH {channelNum.toString().padStart(2, '0')}</div>
              <div className="text-2xl mb-1">{channelData.host}</div>
              <div className="text-sm">{channelData.name}</div>
              {messageCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {messageCount > 99 ? '99+' : messageCount}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}