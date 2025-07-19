'use client';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
} from '@react-three/drei';
import { Suspense } from 'react';

function Box() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

function LoadingFallback() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-white">Loading 3D Scene...</div>
    </div>
  );
}

export function Scene3D() {
  return (
    <div className="h-96 w-full overflow-hidden rounded-lg bg-gray-900">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <Suspense fallback={<LoadingFallback />}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Box />
          <Environment preset="sunset" />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
