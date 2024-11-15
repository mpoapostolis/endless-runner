import { Canvas } from '@react-three/fiber';
import { Sky, Stars, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import { Scene } from './Scene';
import { UI } from './UI';
import { useGameStore } from '../store/gameStore';

export function Game() {
  const gameStarted = useGameStore((state) => state.gameStarted);

  return (
    <div className="w-full h-screen">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 5, 10]} />
        <Suspense fallback={null}>
          <Scene />
          <Sky sunPosition={[100, 20, 100]} />
          <Stars radius={200} depth={50} count={5000} factor={4} />
          <ambientLight intensity={0.5} />
          <directionalLight
            castShadow
            position={[10, 20, 15]}
            intensity={1.5}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
        </Suspense>
      </Canvas>
      <UI />
    </div>
  );
}