import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { BrainNetwork } from './BrainNetwork';

export function SceneCanvas() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#06b6d4" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b5cf6" />
        <Suspense fallback={null}>
          <BrainNetwork />
        </Suspense>
        <fog attach="fog" args={['#020617', 10, 25]} />
      </Canvas>
    </div>
  );
}

export default SceneCanvas;
