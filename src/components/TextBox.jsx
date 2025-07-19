import { useRef, useEffect, useMemo } from "react"
import { Text } from "@react-three/drei"
import * as THREE from "three"

export const TextBox = ({
    radius = 17,             // distance from sphere center
    theta = 0,               // horizontal angle (around Y axis)
    phi = Math.PI / 2,       // vertical angle (from top to bottom)
    size = [8, 3],          //width, height
    textSize = 0.6,
    text = "Hello Sphere!"
}) => {
    const boxRef = useRef()

    // Convert spherical to cartesian
    const position = useMemo(() => {
        const x = radius * Math.sin(phi) * Math.cos(theta)
        const y = radius * Math.cos(phi)
        const z = radius * Math.sin(phi) * Math.sin(theta)
        return [x, y, z]
    }, [radius, theta, phi])

    useEffect(() => {
    if (boxRef.current) {
        const box = boxRef.current
        const currentPos = new THREE.Vector3(...position)

        // Vector from box to sphere center
        const toCenter = currentPos.clone().normalize().negate()

        // The top (Y+) of the box should face camera, so up vector is toCenter.negate()
        const yAxis = toCenter.clone().negate() // top faces away from center
        const worldUp = new THREE.Vector3(0, 1, 0)
        if (Math.abs(yAxis.dot(worldUp)) > 0.99) worldUp.set(1, 0, 0)

        // Build orientation
        const xAxis = new THREE.Vector3().crossVectors(worldUp, yAxis).normalize()
        const zAxis = new THREE.Vector3().crossVectors(xAxis, yAxis).normalize()

        const matrix = new THREE.Matrix4().makeBasis(xAxis, yAxis, zAxis)
        box.quaternion.setFromRotationMatrix(matrix)

        box.rotateY(-Math.PI / 2)
    }
}, [position])

    return (
        <mesh position={position} ref={boxRef}>
            <boxGeometry args={[size[0], size[1], 0.5]} />
            <meshStandardMaterial color="white" wireframe />
            <Text
                position={[0, 0, 0.3]}
                fontSize={textSize}
                color="white"
                anchorX="center"
                anchorY="middle"
                textAlign="center"
            >
                {text}
            </Text>
        </mesh>
    )
}