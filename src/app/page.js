'use client'
import { Canvas,  } from "@react-three/fiber"
import Ground from '../app/componets/Ground'
import { OrbitControls, Stars, Box, Sphere } from '@react-three/drei' 
import { Physics, RigidBody, CapsuleCollider } from "@react-three/rapier";
import { Tries } from "./componets/Tries";
import { Guy } from "./componets/Guy";
import { Controller } from "./functions/Controls";
import { useMemo } from "react";
import { KeyboardControls } from "@react-three/drei";

export const Controls = {
  forward:  'forward',
  back:  'back',
  left:  'left',
  right:  'right',
  jump: 'jump',
}

export default function Home() {
  const map = useMemo(()=>[
    { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
    { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
    { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
    { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
    { name: Controls.jump, keys: ['Space'] },
  ], [])


  
  return (
    <KeyboardControls map={map}>
    <Canvas  shadows camera={{position: [8,8,3 ]}} style={{ width: '100%', height: '100vh' }}>
      <Physics>
      <OrbitControls/>
      <Stars/>
      <ambientLight intensity={0.5} />      
      <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} />
        <Controller/>
       <RigidBody 
       type="fixed"
       friction={2}
       >
      <Ground  position={[0,0,0]} rotation={[-Math.PI / 2,  0, 0]}/>
      </RigidBody>    
      </Physics> 
    </Canvas>
    </KeyboardControls>
)
}
