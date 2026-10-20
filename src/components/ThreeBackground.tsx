import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { WarpStars } from './WarpStars'

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0">
         <Canvas camera={{ position: [0, 0, 1], fov: 75 }} gl={{ antialias: false, powerPreference: "high-performance" }}>
            <color attach="background" args={['#000000']} />
            <fog attach="fog" args={['#000000', 5, 120]} />
            <Suspense fallback={null}>
                <WarpStars />
            </Suspense>
         </Canvas>
    </div>
  )
}
