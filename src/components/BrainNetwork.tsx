import { useRef, useMemo, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScrollPhase } from '@/hooks/useScrollPhase';
import type { Phase } from '@/hooks/useScrollPhase';
import * as THREE from 'three';

interface NodeData {
  position: THREE.Vector3;
  originalPosition: THREE.Vector3;
  connections: number[];
  phase: number;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpVector3(v1: THREE.Vector3, v2: THREE.Vector3, t: number, out: THREE.Vector3): void {
  out.x = lerp(v1.x, v2.x, t);
  out.y = lerp(v1.y, v2.y, t);
  out.z = lerp(v1.z, v2.z, t);
}

export function BrainNetwork() {
  const { phase, phaseProgress } = useScrollPhase();
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  const targetCameraPos = useRef(new THREE.Vector3(0, 0, 12));
  const currentCameraPos = useRef(new THREE.Vector3(0, 0, 12));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const rotationY = useRef(0);

  const { nodePositions, nodeColors, connectionIndices, connectionColors, nodeCount } = useMemo(() => {
    const count = 300;
    const nodes: NodeData[] = [];
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const connections: number[] = [];
    const connColors: number[] = [];

    const clusters = [
      { center: [0, 2, 0], radius: 2.5, count: 60 },
      { center: [-2.5, 0.5, 0.5], radius: 2, count: 50 },
      { center: [2.5, 0.5, -0.5], radius: 2, count: 50 },
      { center: [-1.5, -1.5, 1], radius: 1.8, count: 45 },
      { center: [1.5, -1.5, -1], radius: 1.8, count: 45 },
      { center: [0, 0, 0], radius: 3, count: 50 },
    ];

    let nodeIdx = 0;

    clusters.forEach((cluster, ci) => {
      for (let i = 0; i < cluster.count && nodeIdx < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = cluster.radius * Math.cbrt(Math.random());

        const x = cluster.center[0] + r * Math.sin(phi) * Math.cos(theta);
        const y = cluster.center[1] + r * Math.sin(phi) * Math.sin(theta);
        const z = cluster.center[2] + r * Math.cos(phi);

        positions[nodeIdx * 3] = x;
        positions[nodeIdx * 3 + 1] = y;
        positions[nodeIdx * 3 + 2] = z;

        const colorMix = ci / clusters.length;
        const r_c = 0.02 + colorMix * 0.55;
        const g_c = 0.7 + (1 - colorMix) * 0.3;
        const b_c = 0.85 + colorMix * 0.15;

        colors[nodeIdx * 3] = r_c;
        colors[nodeIdx * 3 + 1] = g_c;
        colors[nodeIdx * 3 + 2] = b_c;

        nodes.push({
          position: new THREE.Vector3(x, y, z),
          originalPosition: new THREE.Vector3(x, y, z),
          connections: [],
          phase: ci,
        });
        nodeIdx++;
      }
    });

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].originalPosition.distanceTo(nodes[j].originalPosition);
        if (dist < 2.5 && Math.random() < 0.15) {
          nodes[i].connections.push(j);
          connections.push(i, j);

          const colorMix = (nodes[i].phase + nodes[j].phase) / (2 * clusters.length);
          connColors.push(
            0.02 + colorMix * 0.3,
            0.5 + (1 - colorMix) * 0.2,
            0.7 + colorMix * 0.2
          );
        }
      }
    }

    return {
      nodePositions: positions,
      nodeColors: colors,
      connectionIndices: new Uint16Array(connections),
      connectionColors: new Float32Array(connColors),
      nodeCount: nodes.length,
    };
  }, []);

  const originalPositionsRef = useRef(new Float32Array(nodePositions));

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const posCopy = new Float32Array(nodePositions);
    geo.setAttribute('position', new THREE.BufferAttribute(posCopy, 3));
    if (connectionColors.length > 0) {
      geo.setAttribute('color', new THREE.BufferAttribute(connectionColors, 3));
    }
    geo.setIndex(new THREE.BufferAttribute(connectionIndices, 1));
    return geo;
  }, [nodePositions, connectionColors, connectionIndices]);

  const pointsGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));
    return geo;
  }, [nodePositions, nodeColors]);

  const getPhaseCameraData = useCallback((currentPhase: Phase, progress: number) => {
    const cameras = [
      { pos: [0, 0, 12], lookAt: [0, 0, 0] },
      { pos: [0, 2, 6], lookAt: [0, 1, 0] },
      { pos: [3, 0, 5], lookAt: [0, 0, 0] },
      { pos: [0, 0, 8], lookAt: [0, 0, 0] },
    ];

    const nextPhase = Math.min(currentPhase + 1, 3) as Phase;
    const current = cameras[currentPhase];
    const next = cameras[nextPhase];

    return {
      pos: new THREE.Vector3(
        lerp(current.pos[0], next.pos[0], progress),
        lerp(current.pos[1], next.pos[1], progress),
        lerp(current.pos[2], next.pos[2], progress)
      ),
      lookAt: new THREE.Vector3(
        lerp(current.lookAt[0], next.lookAt[0], progress),
        lerp(current.lookAt[1], next.lookAt[1], progress),
        lerp(current.lookAt[2], next.lookAt[2], progress)
      ),
    };
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current || !pointsRef.current) return;

    const dt = Math.min(delta, 0.05);

    if (phase === 0) {
      rotationY.current += dt * 0.1;
    } else {
      rotationY.current += dt * 0.02;
    }

    groupRef.current.rotation.y = lerp(
      groupRef.current.rotation.y,
      rotationY.current,
      0.05
    );

    if (phase === 3) {
      const morphProgress = phaseProgress;
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      const originals = originalPositionsRef.current;

      for (let i = 0; i < nodeCount; i++) {
        const ix = i * 3;
        const originalX = originals[ix];
        const originalY = originals[ix + 1];
        const originalZ = originals[ix + 2];

        const sphereRadius = 3.5;
        const len = Math.sqrt(originalX * originalX + originalY * originalY + originalZ * originalZ) || 1;
        const targetX = (originalX / len) * sphereRadius;
        const targetY = (originalY / len) * sphereRadius;
        const targetZ = (originalZ / len) * sphereRadius;

        positions[ix] = lerp(originalX, targetX, morphProgress * 0.5);
        positions[ix + 1] = lerp(originalY, targetY, morphProgress * 0.5);
        positions[ix + 2] = lerp(originalZ, targetZ, morphProgress * 0.5);
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true;

      if (linesRef.current) {
        const linePositions = linesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < nodeCount; i++) {
          const ix = i * 3;
          linePositions[ix] = positions[ix];
          linePositions[ix + 1] = positions[ix + 1];
          linePositions[ix + 2] = positions[ix + 2];
        }
        linesRef.current.geometry.attributes.position.needsUpdate = true;
      }
    }

    if (phase === 2) {
      const pulseScale = 1 + Math.sin(Date.now() * 0.003) * 0.05 * phaseProgress;
      groupRef.current.scale.setScalar(lerp(groupRef.current.scale.x, pulseScale, 0.1));
    } else {
      groupRef.current.scale.setScalar(lerp(groupRef.current.scale.x, 1, 0.05));
    }

    const cameraData = getPhaseCameraData(phase, phaseProgress);
    targetCameraPos.current.copy(cameraData.pos);
    targetLookAt.current.copy(cameraData.lookAt);

    lerpVector3(currentCameraPos.current, targetCameraPos.current, 0.03, currentCameraPos.current);
    lerpVector3(currentLookAt.current, targetLookAt.current, 0.03, currentLookAt.current);

    camera.position.copy(currentCameraPos.current);
    camera.lookAt(currentLookAt.current);
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} geometry={pointsGeometry}>
        <pointsMaterial
          size={0.12}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      <mesh>
        <sphereGeometry args={[4.5, 32, 32]} />
        <meshBasicMaterial
          color="#1a1040"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
