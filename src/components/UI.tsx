import { useGameStore } from '../store/gameStore';
import { Play, Volume2, VolumeX, ArrowLeft, ArrowRight } from 'lucide-react';

export function UI() {
  const { score, highScore, gameStarted, startGame, soundEnabled, toggleSound } = useGameStore();

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-4 right-4 flex gap-4">
        <button
          className="pointer-events-auto p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
          onClick={toggleSound}
        >
          {soundEnabled ? <Volume2 className="w-6 h-6 text-white" /> : <VolumeX className="w-6 h-6 text-white" />}
        </button>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
          Score: {score}
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
          High Score: {highScore}
        </div>
      </div>

      {!gameStarted && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-8">Cosmic Runner</h1>
            <div className="mb-4 text-white">
              Use <kbd className="px-2 py-1 bg-white/20 rounded">←</kbd> and <kbd className="px-2 py-1 bg-white/20 rounded">→</kbd> arrow keys to move
            </div>
            <button
              className="pointer-events-auto px-8 py-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors text-white flex items-center gap-2"
              onClick={startGame}
            >
              <Play className="w-6 h-6" />
              Start Game
            </button>
          </div>
        </div>
      )}

      {gameStarted && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
          <button
            className="pointer-events-auto p-4 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors touch-none"
            onPointerDown={() => {
              const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
              window.dispatchEvent(event);
            }}
            onPointerUp={() => {
              const event = new KeyboardEvent('keyup', { key: 'ArrowLeft' });
              window.dispatchEvent(event);
            }}
            onPointerLeave={() => {
              const event = new KeyboardEvent('keyup', { key: 'ArrowLeft' });
              window.dispatchEvent(event);
            }}
          >
            <ArrowLeft className="w-8 h-8 text-white" />
          </button>
          <button
            className="pointer-events-auto p-4 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors touch-none"
            onPointerDown={() => {
              const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
              window.dispatchEvent(event);
            }}
            onPointerUp={() => {
              const event = new KeyboardEvent('keyup', { key: 'ArrowRight' });
              window.dispatchEvent(event);
            }}
            onPointerLeave={() => {
              const event = new KeyboardEvent('keyup', { key: 'ArrowRight' });
              window.dispatchEvent(event);
            }}
          >
            <ArrowRight className="w-8 h-8 text-white" />
          </button>
        </div>
      )}
    </div>
  );
}