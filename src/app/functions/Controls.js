import { useKeyboardControls } from "@react-three/drei";
import { Guy } from "../componets/Guy"
import { CapsuleCollider, RigidBody } from "@react-three/rapier"
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Controls } from "../page";
import { PerspectiveCamera } from "@react-three/drei";

const JUMP_FORCE = 0.5
const MOVEMENT_SPEED = 0.1
const MAX_VEL = 3

export  const Controller = () => {
const jumpPressed = useKeyboardControls((e) => e[Controls.jump]);
const leftPressed = useKeyboardControls((e) => e[Controls.left]);
const rightPressed = useKeyboardControls((e) => e[Controls.right]);
const backPressed = useKeyboardControls((e) => e[Controls.back]);
const forwardPressed = useKeyboardControls((e) => e[Controls.forward]);
const rigiDBody = useRef()

const [isMoving, setIsMoving] = useState(false)

useFrame(() => {
const impulse = {x: 0, y: 0, z: 0}
    if(jumpPressed) {
        impulse.y += JUMP_FORCE
    }
const linvel = rigiDBody.current.linvel()
let changeRotation = false

    if(rightPressed && linvel.x < MAX_VEL) {
        impulse.x += MOVEMENT_SPEED
        changeRotation = true
    }
    if(leftPressed && linvel.x > -MAX_VEL) {
        impulse.z -= MOVEMENT_SPEED
        changeRotation = true
    }
    if(forwardPressed && linvel.z > -MAX_VEL) {
        impulse.z -= MOVEMENT_SPEED;
        changeRotation = true
    }
    if(backPressed && linvel.z < MAX_VEL) {
        impulse.z += MOVEMENT_SPEED; 
        changeRotation = true
    }

    if (!jumpPressed && !rightPressed && !leftPressed && !forwardPressed && !backPressed) {
        setIsMoving(false);
      } else {
        setIsMoving(true);
      }

    rigiDBody.current.applyImpulse(impulse, true)
    if(changeRotation) {
        const angle = Math.atan2(linvel.x, linvel.z)
        guy.current.rotation.y = angle
    }

})
const guy = useRef()
    return (
        <group>
 <PerspectiveCamera position={[0, 0, 0]}>
<RigidBody 
ref={rigiDBody}
colliders={false} 
scale={[0.5, 0.5, 0.5]}
enabledRotations={[false, false, false ]}>
    <CapsuleCollider args={[0.8, 0.4]} position={[0, 1.2, 0]}/>
    <group ref={guy}>
    <Guy setIsMoving={isMoving}/>
    </group>
</RigidBody>  
</PerspectiveCamera>
        </group>
    )
}