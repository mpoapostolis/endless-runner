import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useGameStore } from '../store/gameStore';

export function Scene() {
  const player = useRef<THREE.Mesh>(null);
  const obstacles = useRef<THREE.Group>(null);
  const speed = useGameStore((state) => state.speed);
  const gameStarted = useGameStore((state) => state.gameStarted);
  const increaseScore = useGameStore((state) => state.increaseScore);
  const gameOver = useGameStore((state) => state.gameOver);
  const [keys, setKeys] = useState({ left: false, right: false });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setKeys(prev => ({ ...prev, left: true }));
      if (e.key === 'ArrowRight') setKeys(prev => ({ ...prev, right: true }));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setKeys(prev => ({ ...prev, left: false }));
      if (e.key === 'ArrowRight') setKeys(prev => ({ ...prev, right: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (obstacles.current) {
      generateObstacles();
    }
  }, []);

  const generateObstacles = () => {
    if (!obstacles.current) return;
    
    while (obstacles.current.children.length < 5) {
      const obstacle = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 2),
        new THREE.MeshStandardMaterial({ color: new THREE.Color(Math.random() * 0xffffff) })
      );
      obstacle.position.z = -30 - (obstacles.current.children.length * 15);
      obstacle.position.x = (Math.random() - 0.5) * 10;
      obstacles.current.add(obstacle);
    }
  };

  useFrame((state, delta) => {
    if (!gameStarted || !player.current || !obstacles.current) return;

    // Player movement
    const playerSpeed = 0.15;
    if (keys.left) {
      player.current.position.x = Math.max(-5, player.current.position.x - playerSpeed);
    }
    if (keys.right) {
      player.current.position.x = Math.min(5, player.current.position.x + playerSpeed);
    }

    // Obstacle movement
    obstacles.current.children.forEach((obstacle) => {
      obstacle.position.z += speed * delta * 30;
      
      // Check collision
      if (player.current && obstacle.position.z > 0) {
        const distance = player.current.position.distanceTo(obstacle.position);
        if (distance < 2) {
          gameOver();
        }
      }

      // Reset obstacle
      if (obstacle.position.z > 20) {
        obstacle.position.z = -80;
        obstacle.position.x = (Math.random() - 0.5) * 10;
        increaseScore();
      }
    });
  });

  return (
    <group>
      <mesh ref={player} position={[0, 1, 0]} castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>

      <group ref={obstacles} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 1000]} />
        <meshStandardMaterial color="#303030" />
      </mesh>
    </group>
  );
}