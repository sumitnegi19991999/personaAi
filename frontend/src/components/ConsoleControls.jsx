export default function ConsoleControls({
  currentChannel,
  maxChannels,
  onPrevChannel,
  onNextChannel,
  onPlay,
  onStop
}) {
  const handleButtonPress = (callback) => {
    return (e) => {
      e.target.classList.add('animate-button-press');
      setTimeout(() => {
        e.target.classList.remove('animate-button-press');
      }, 200);
      callback();
    };
  };

  return (
    <div className="console-border bg-amber-900 p-4 mt-4 wood-grain">
      <div className="flex justify-center space-x-6">
        <button
          onClick={handleButtonPress(onPrevChannel)}
          disabled={currentChannel <= 1}
          className="console-border bg-orange-600 text-amber-100 px-4 py-2 vintage-glow hover:animate-warm-glow transition-all font-mono disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ◀◀
        </button>
        
        <button
          onClick={handleButtonPress(onPlay)}
          className="console-border bg-teal-500 text-gray-100 px-4 py-2 vintage-glow hover:animate-warm-glow transition-all font-mono"
        >
          ▶
        </button>
        
        <button
          onClick={handleButtonPress(onNextChannel)}
          disabled={currentChannel >= maxChannels}
          className="console-border bg-teal-600 text-gray-100 px-4 py-2 vintage-glow hover:animate-warm-glow transition-all font-mono disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ▶▶
        </button>
        
        <button
          onClick={handleButtonPress(onStop)}
          className="console-border bg-gray-600 text-gray-200 px-4 py-2 vintage-glow hover:animate-warm-glow transition-all font-mono"
        >
          ⏹
        </button>
      </div>
    </div>
  );
}