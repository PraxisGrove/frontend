'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface Node {
  id: string;
  label: string;
  position: [number, number, number];
  color: string;
}

interface Edge {
  from: string;
  to: string;
}

const nodes: Node[] = [
  { id: '1', label: 'AI基础', position: [0, 0, 0], color: '#ff6b6b' },
  { id: '2', label: '机器学习', position: [2, 1, 0], color: '#4ecdc4' },
  { id: '3', label: '深度学习', position: [4, 0, 1], color: '#45b7d1' },
  { id: '4', label: '神经网络', position: [2, -1, -1], color: '#96ceb4' },
  { id: '5', label: '自然语言处理', position: [0, 2, 1], color: '#feca57' },
];

const edges: Edge[] = [
  { from: '1', to: '2' },
  { from: '2', to: '3' },
  { from: '2', to: '4' },
  { from: '1', to: '5' },
  { from: '3', to: '4' },
];

function KnowledgeNode({ node }: { node: Node }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group position={node.position}>
      <Sphere ref={meshRef} args={[0.3]} position={[0, 0, 0]}>
        <meshStandardMaterial color={node.color} />
      </Sphere>
      <Text
        position={[0, -0.6, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {node.label}
      </Text>
    </group>
  );
}

function ConnectionLines() {
  const lines = useMemo(() => {
    return edges
      .map((edge) => {
        const fromNode = nodes.find((n) => n.id === edge.from);
        const toNode = nodes.find((n) => n.id === edge.to);

        if (!fromNode || !toNode) return null;

        const points = [
          new THREE.Vector3(...fromNode.position),
          new THREE.Vector3(...toNode.position),
        ];

        return (
          <line key={`${edge.from}-${edge.to}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={points.length}
                array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#ffffff" opacity={0.6} transparent />
          </line>
        );
      })
      .filter(Boolean);
  }, []);

  return <>{lines}</>;
}

export function KnowledgeGraph3D() {
  return (
    <div className="h-96 w-full overflow-hidden rounded-lg bg-gray-900">
      <Canvas camera={{ position: [5, 5, 5], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} />

        {nodes.map((node) => (
          <KnowledgeNode key={node.id} node={node} />
        ))}

        <ConnectionLines />

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={15}
        />
      </Canvas>
    </div>
  );
}
