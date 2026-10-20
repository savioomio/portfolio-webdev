import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useIsMobile } from '../hooks/useIsMobile'

const StarShaderMaterial = {
  vertexShader: `
    uniform float uTravel;
    attribute float aSize;
    varying float vAlpha;
    
    void main() {
      vec3 pos = position;
      // Move stars based on scroll (Travel)
      pos.z += uTravel;
      
      // Infinite Loop: depth 200
      float depth = 200.0;
      pos.z = mod(pos.z + depth * 0.5, depth) - depth * 0.5;
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = aSize * (100.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
      
      // Soft Fade edges
      float dist = abs(pos.z);
      vAlpha = 1.0 - smoothstep(depth * 0.4, depth * 0.5, dist);
    }
  `,
  fragmentShader: `
    varying float vAlpha;
    void main() {
      vec2 center = gl_PointCoord - 0.5;
      if (length(center) > 0.5) discard;
      float strength = 1.0 - (length(center) * 2.0);
      strength = pow(strength, 2.0);
      gl_FragColor = vec4(1.0, 1.0, 1.0, vAlpha * strength);
    }
  `
}

export function WarpStars() {
  const isMobile = useIsMobile()
  const count = isMobile ? 2000 : 3000
  const meshRef = useRef<THREE.Points>(null)
  const travelRef = useRef(0)
  
  // Data Generation
  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sz = new Float32Array(count)
    for (let i = 0; i < count; i++) {
        pos[i*3] = (Math.random()-0.5)*100
        pos[i*3+1] = (Math.random()-0.5)*100
        pos[i*3+2] = (Math.random()-0.5)*200
        sz[i] = Math.random() * 2
    }
    return [pos, sz]
  }, [count])
  
  const uniforms = useMemo(() => ({ uTravel: { value: 0 } }), [])

  useFrame(() => {
    if (!meshRef.current) return
    
    // Ler Native Scroll do window (muito mais leve que Drei ScrollControls para mobile)
    // Divisor suaviza a velocidade (quanto menor, mais rápido voa)
    const targetTravel = window.scrollY / 30 
    
    // Lerp suave para não ficar "duro"
    travelRef.current = THREE.MathUtils.lerp(travelRef.current, targetTravel, 0.1)
    
    const material = meshRef.current.material as THREE.ShaderMaterial
    material.uniforms.uTravel.value = travelRef.current
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" count={count} array={sizes} itemSize={1} args={[sizes, 1]} />
      </bufferGeometry>
      <shaderMaterial
        attach="material"
        args={[StarShaderMaterial]}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
