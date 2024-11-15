import { create } from 'zustand';
import { Howl } from 'howler';

interface GameState {
  score: number;
  highScore: number;
  speed: number;
  gameStarted: boolean;
  soundEnabled: boolean;
  backgroundMusic: Howl | null;
  startGame: () => void;
  gameOver: () => void;
  increaseScore: () => void;
  toggleSound: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  score: 0,
  highScore: 0,
  speed: 0.5,
  gameStarted: false,
  soundEnabled: true,
  backgroundMusic: new Howl({
    src: ['https://assets.codepen.io/21542/howler-demo-bg-music.mp3'],
    loop: true,
    volume: 0.5,
  }),

  startGame: () => {
    const { backgroundMusic, soundEnabled } = get();
    set({ gameStarted: true, score: 0, speed: 0.5 });
    if (soundEnabled && backgroundMusic) {
      backgroundMusic.play();
    }
  },

  gameOver: () => {
    const { score, highScore, backgroundMusic } = get();
    set({ 
      gameStarted: false,
      highScore: Math.max(score, highScore)
    });
    if (backgroundMusic) {
      backgroundMusic.stop();
    }
  },

  increaseScore: () => {
    set((state) => ({ 
      score: state.score + 1,
      speed: Math.min(state.speed + 0.01, 2)
    }));
  },

  toggleSound: () => {
    const { soundEnabled, backgroundMusic, gameStarted } = get();
    set({ soundEnabled: !soundEnabled });
    if (backgroundMusic) {
      if (!soundEnabled && gameStarted) {
        backgroundMusic.play();
      } else {
        backgroundMusic.pause();
      }
    }
  },
}));