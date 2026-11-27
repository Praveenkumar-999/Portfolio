import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls, Effects } from '@react-three/drei';
import { UnrealBloomPass } from 'three-stdlib';
import * as THREE from 'three';

extend({ UnrealBloomPass });

const ParticleSwarm = () => {
  const meshRef = useRef();
  const count = 20000;
  const speedMult = 1;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const pColor = useMemo(() => new THREE.Color(), []);
  const color = pColor; // Alias for user code compatibility
  
  const positions = useMemo(() => {
     const pos = [];
     for(let i=0; i<count; i++) pos.push(new THREE.Vector3((Math.random()-0.5)*100, (Math.random()-0.5)*100, (Math.random()-0.5)*100));
     return pos;
  }, []);

  // Material & Geom
  const material = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {},
    vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec3 vColor;
        void main() {
            vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(position, 1.0);
            vNormal = normalize(normalMatrix * normal);
            vViewPosition = -mvPosition.xyz;
            vColor = instanceColor;
            gl_Position = projectionMatrix * mvPosition;
        }
    `,
    fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec3 vColor;
        void main() {
            float fresnel = dot(vNormal, normalize(vViewPosition));
            fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
            fresnel = pow(fresnel, 2.0);
            vec3 col = vColor * fresnel + vec3(0.1); 
            gl_FragColor = vec4(col, 0.3 + fresnel * 0.7);
        }
    `,
    transparent: true, blending: 2, depthWrite: false
}), []);
  const geometry = useMemo(() => new THREE.SphereGeometry(0.3, 16, 16), []);

  const PARAMS = useMemo(() => ({"radius":120,"arms":4,"twist":3.5,"spin":0.4}), []);
  const addControl = (id, l, min, max, val) => {
      return PARAMS[id] !== undefined ? PARAMS[id] : val;
  };
  const setInfo = () => {};
  const annotate = () => {};

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() * speedMult;
    const THREE_LIB = THREE;

    if(material.uniforms && material.uniforms.uTime) {
         material.uniforms.uTime.value = time;
    }

    for (let i = 0; i < count; i++) {
        // USER CODE START
        const radius = addControl("radius", "Galaxy Radius", 20, 250, 120);
        const arms = addControl("arms", "Spiral Arms", 2, 8, 4);
        const twist = addControl("twist", "Twist", 0.5, 8.0, 3.5);
        const spin = addControl("spin", "Spin Speed", 0.0, 2.0, 0.4);
        
        if (i === 0) {
        setInfo(
        "Spiral Galaxy",
        "A rotating spiral galaxy with dense glowing core and sweeping arms."
        );
        annotate("core", new THREE.Vector3(0, 0, 0), "Galactic Core");
        }
        
        const u = (i + 0.5) / count;
        const g = 2.399963229728653;
        
        const r = radius * Math.sqrt(u);
        const arm = (i % arms) / arms;
        const angle = arm * 6.283185307179586 + r * twist * 0.08 + i * g * 0.01 + time * spin;
        
        const wave = Math.sin(r * 0.18 - time * 1.2);
        const spread = (1.0 - u) * radius * 0.12;
        
        const x = Math.cos(angle) * (r + spread * wave);
        const z = Math.sin(angle) * (r + spread * wave);
        const y = (1.0 - u) * (1.0 - u) * radius * 0.08 * Math.sin(angle * 3.0 + time);
        
        target.set(x, y, z);
        
        const h = 0.60 - 0.08 * (1.0 - u);
        const s = 0.55 + 0.45 * u;
        const l = 0.95 - 0.55 * u;
        
        color.setHSL(h, s, l);
        
        // USER CODE END

        positions[i].lerp(target, 0.1);
        dummy.position.copy(positions[i]);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
        meshRef.current.setColorAt(i, pColor);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, material, count]} />
  );
};

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      <Canvas camera={{ position: [0, 0, 100], fov: 60 }}>
        <fog attach="fog" args={['#000000', 0.01]} />
        <ParticleSwarm />
        <OrbitControls autoRotate={true} />
        <Effects disableGamma>
            <unrealBloomPass threshold={0} strength={1.8} radius={0.4} />
        </Effects>
      </Canvas>
    </div>
  );
}