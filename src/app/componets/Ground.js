import React from "react"

import { useRef } from "react";
import { useFrame , useLoader} from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'


const GROUND_HEIGHT = -50;

export default function Ground (props) {

    const colorMap = useLoader(TextureLoader, './map.png')

 


   

    return (
        <mesh
        {...props}
      >
        <planeGeometry attach="geometry" args={[5000, 5000, 128, 128]} />
        <meshStandardMaterial
          attach="material"
          map={colorMap}
   
       
        />
      </mesh>
    )
}