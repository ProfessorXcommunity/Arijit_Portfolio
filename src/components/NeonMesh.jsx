import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/*
PointsMesh: internal component that renders points and lineSegments.
- Responsive: count changes with screen width
- Performance: uses BufferGeometry and static arrays; line generation has O(n^2) but count is limited
- Visuals: cyan points, purple lines with subtle pulsing
*/
function PointsMesh({ count = 120 }) {
  const groupRef = useRef();
  const linesRef = useRef();

  // generate point coordinates once per count
  const points = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      // distribute in an oblong sphere / ellipsoid for aesthetic
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const radius = 1.6 + Math.random() * 0.6;
      const x = Math.sin(phi) * Math.cos(theta) * radius;
      const y = Math.sin(phi) * Math.sin(theta) * radius * 0.6;
      const z = Math.cos(phi) * radius * 0.8;
      arr.push(new THREE.Vector3(x, y, z));
    }
    return arr;
  }, [count]);

  // points buffer
  const positions = useMemo(() => {
    const arr = new Float32Array(points.length * 3);
    points.forEach((p, i) => {
      arr[i * 3] = p.x;
      arr[i * 3 + 1] = p.y;
      arr[i * 3 + 2] = p.z;
    });
    return arr;
  }, [points]);

  // build line connections for pairs under threshold (sparse)
  const linePositions = useMemo(() => {
    const threshold = 0.9 + (count / 200) * 0.6; // adapt threshold slightly by count
    const collections = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const d = points[i].distanceTo(points[j]);
        if (d < threshold) {
          collections.push(points[i].x, points[i].y, points[i].z);
          collections.push(points[j].x, points[j].y, points[j].z);
        }
      }
    }
    return new Float32Array(collections);
  }, [points, count]);

  // animate rotation + pulsing
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t / 8) * 0.25;
      groupRef.current.rotation.x = Math.sin(t / 12) * 0.08;
    }
    if (linesRef.current) {
      // pulse opacity gently
      linesRef.current.material.opacity =
        0.03 + Math.abs(Math.sin(t / 2)) * 0.09;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          sizeAttenuation
          color={"#06b6d4"}
          transparent
          opacity={0.95}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={linePositions}
            count={linePositions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={"#7c3aed"}
          transparent
          opacity={0.06}
          linewidth={1}
        />
      </lineSegments>
    </group>
  );
}

/*
ResponsiveCanvas wraps Canvas and decides nodeCount by screen width.
It keeps the canvas full width/height of its container, and uses
the devicePixelRatio cap to avoid heavy renders on low-end devices.
*/
function ResponsiveCanvas() {
  const [nodeCount, setNodeCount] = useState(() => {
    if (typeof window === "undefined") return 120;
    const w = window.innerWidth;
    if (w < 480) return 56;
    if (w < 768) return 84;
    if (w < 1024) return 130;
    return 160;
  });

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      if (w < 480) setNodeCount(56);
      else if (w < 768) setNodeCount(84);
      else if (w < 1024) setNodeCount(130);
      else setNodeCount(160);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={Math.min(1.5, window.devicePixelRatio || 1)}
    >
      <color attach="background" args={["#030312"]} />
      <ambientLight intensity={0.6} />
      <pointLight position={[6, 6, 6]} intensity={0.7} color={"#06b6d4"} />
      <directionalLight position={[-10, -10, -10]} intensity={0.2} />
      <React.Suspense fallback={null}>
        <PointsMesh count={nodeCount} />
      </React.Suspense>
    </Canvas>
  );
}

export default function NeonMesh() {
  return (
    <div className="w-full h-full">
      <ResponsiveCanvas />
    </div>
  );
}
