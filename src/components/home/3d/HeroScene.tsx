"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Icosahedron } from "@react-three/drei";
import * as THREE from "three";

function AbstractShape() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  // React to mouse movement for extra 2030 vibes
  useFrame((state, delta) => {
    // 1. Continuous rotation on the meshes (spinning opposite directions)
    if (outerRef.current) {
      outerRef.current.rotation.x += delta * 0.15;
      outerRef.current.rotation.y += delta * 0.2;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.2;
      innerRef.current.rotation.y -= delta * 0.15;
    }

    // 2. Interactive tilt on the parent group based on mouse
    if (groupRef.current) {
      const targetX = (state.pointer.x * Math.PI) / 4;
      const targetY = (state.pointer.y * Math.PI) / 4;
      
      // Lerp towards the target
      groupRef.current.rotation.y += 0.05 * (targetX - groupRef.current.rotation.y);
      groupRef.current.rotation.x += 0.05 * (targetY - groupRef.current.rotation.x);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Outer Tech Shell */}
        <Icosahedron ref={outerRef} args={[2.2, 1]}>
          <meshStandardMaterial
            color="#40b4db"
            wireframe={true}
            transparent={true}
            opacity={0.3}
          />
        </Icosahedron>

        {/* Inner Glowing Core */}
        <Icosahedron ref={innerRef} args={[1.4, 0]}>
          <MeshDistortMaterial
            color="#802cf5"
            emissive="#3d5ae3"
            emissiveIntensity={0.8}
            roughness={0.2}
            metalness={1}
            distort={0.15} // Subtle pulsating distortion
            speed={3}
          />
        </Icosahedron>
      </Float>
    </group>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={3} color="#40b4db" />
      <directionalLight position={[-10, -10, -5]} intensity={3} color="#802cf5" />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <SceneLights />
        <AbstractShape />
      </Canvas>
    </div>
  );
}
