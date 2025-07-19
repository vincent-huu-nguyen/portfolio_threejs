import { OrbitControls } from "@react-three/drei"
import { useFrame, useLoader, useThree } from "@react-three/fiber"
import { useRef, useState, useEffect } from "react"
import { useTexture } from "@react-three/drei"
import { TextureLoader, Vector3 } from "three"
import { TextBox } from './TextBox'

import gradientImage from '../assets/gradient.png'
import walk1 from '../assets/TrainerFrame1.png'
import walk2 from '../assets/TrainerFrame2.png'
import walk3 from '../assets/TrainerFrame3.png'
import walk4 from '../assets/TrainerFrame4.png'

/* Auto Rotation Script
export const Experience = ({ position, size, color }) => {
    const sphereRef = useRef()
    const spriteRef = useRef()

    const texture = useTexture(gradientImage)

    const walkFrames = useLoader(TextureLoader, [walk1, walk2, walk3, walk4])
    const [frameIndex, setFrameIndex] = useState(0)
    const elapsedRef = useRef(0)
    const frameDuration = 0.15

    useFrame((state, delta) => {
        // Rotate sphere
        sphereRef.current.rotation.x -= delta * 0.3

        // Animate sprite
        elapsedRef.current += delta
        if (elapsedRef.current >= frameDuration) {
            elapsedRef.current = 0
            setFrameIndex((prev) => (prev + 1) % walkFrames.length)
        }


    })

    return (
        <>
            <OrbitControls enableZoom={false} />

            {/* Walking Sprite *//*}
<mesh ref={spriteRef}>
<planeGeometry args={[1, 1]} />
<meshBasicMaterial
map={walkFrames[frameIndex]}
transparent
/>
</mesh>

<group position={position} ref={sphereRef} rotation={[0, 0, Math.PI / 2]}>
{/* Solid sphere *//*}
<mesh>
<sphereGeometry args={[14.9, 30, 30]} />
<meshStandardMaterial color={color} />
</mesh>

{/* Wireframe sphere *//*}
<mesh>
    <sphereGeometry args={size} />
    <meshStandardMaterial map={texture} wireframe />
</mesh>

{/* Mountains / Solid Cube *//*}
<mesh rotation={[Math.PI / 2, 5, 0]}>
    <boxGeometry args={[19.9, 19.9, 19.9]} />
    <meshStandardMaterial color={color} />
</mesh>

{/* Wireframe Mountains / Cube *//*}
<mesh rotation={[Math.PI / 2, 5, 0]}>
    <boxGeometry args={[20, 20, 20, 10, 10, 10]} />
    <meshStandardMaterial map={texture} wireframe />
</mesh>

{/* Mountains / Solid Cube *//*}
<mesh rotation={[Math.PI / 9, 10, 5]}>
    <boxGeometry args={[19.9, 19.9, 19.9]} />
    <meshStandardMaterial color={color} />
</mesh>

{/* Wireframe Mountains / Cube *//*}
<mesh rotation={[Math.PI / 9, 10, 5]}>
    <boxGeometry args={[20, 20, 20, 10, 10, 10]} />
    <meshStandardMaterial map={texture} wireframe />
</mesh>

<TextBox radius={18} theta={0} size={[5,2]} text="Scroll down!" />
                <TextBox radius={18} theta={Math.PI / 4} size={[7,3.5]} textSize={0.15} text="I am a recent Software Engineering graduate from the University of Texas at Arlington
                with a strong passion for Web Development, Game Design, and AI.
I enjoy building creative and user-focused projects, from interactive web apps to
experimental games, and am always eager to learn new technologies
that push my skills further. 

What drives me most is the ability to turn ideas into real-world
experiences that people can engage with. Whether it is
crafting clean interfaces or experimenting with machine learning
models, I am excited to contribute to impactful software that blends
creativity and functionality.

I am open to new opportunities and collaborations. Feel free to reach
out through the contact form or connect with me on LinkedIn." />
                <TextBox radius={18} theta={Math.PI / 2} size={[5,2]} text="Scroll down!" />
</group>
</>
)
}
*/

/* Scrolling Script */
export const Experience = ({ position, size, color }) => {
    const sphereRef = useRef()
    const spriteRef = useRef()
    const scrollDelta = useRef(0)
    const { gl } = useThree()

    const texture = useTexture(gradientImage)
    const walkFrames = useLoader(TextureLoader, [walk1, walk2, walk3, walk4])
    const [frameIndex, setFrameIndex] = useState(0)
    const elapsedRef = useRef(0)
    const frameDuration = 0.15

    const lastScrollTime = useRef(0)
    const scrollCooldown = 0.1 // seconds the sprite animates after a scroll

    // Scroll event setup
    useEffect(() => {
        const handleScroll = (e) => {
            scrollDelta.current += e.deltaY * 0.001
        }

        const canvas = gl.domElement
        canvas.addEventListener("wheel", handleScroll)

        return () => {
            canvas.removeEventListener("wheel", handleScroll)
        }
    }, [gl])

    useFrame((state, delta) => {
        // Rotate sphere
        sphereRef.current.rotation.x -= delta * 0.1

        // Animate sprite
        elapsedRef.current += delta
        if (elapsedRef.current >= frameDuration) {
            elapsedRef.current = 0
            setFrameIndex((prev) => (prev + 1) % walkFrames.length)
        }

        // Scroll rotation
        if (scrollDelta.current !== 0) {
            sphereRef.current.rotation.x -= scrollDelta.current
            scrollDelta.current = 0

            lastScrollTime.current = state.clock.getElapsedTime() // mark scroll time
        }

        // Only animate sprite if scroll happened recently
        const timeSinceScroll = state.clock.getElapsedTime() - lastScrollTime.current
        if (timeSinceScroll < scrollCooldown) {
            elapsedRef.current += delta
            if (elapsedRef.current >= frameDuration) {
                elapsedRef.current = 0
                setFrameIndex((prev) => (prev + 1) % walkFrames.length)
            }
        }
    })

    return (
        <>
            <OrbitControls enableZoom={false} enableRotate={true} />

            {/* Walking Sprite */}
            <mesh ref={spriteRef} position={[0, -1.5, 0]}>
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial map={walkFrames[frameIndex]} transparent />
            </mesh>

            {/* Scene Group (rotated by scroll) */}
            <group position={position} ref={sphereRef} rotation={[0, 0, Math.PI / 2]}>
                {/* Solid sphere */}
                <mesh>
                    <sphereGeometry args={[14.9, 30, 30]} />
                    <meshStandardMaterial color={color} />
                </mesh>

                {/* Wireframe sphere */}
                <mesh>
                    <sphereGeometry args={size} />
                    <meshStandardMaterial map={texture} wireframe />
                </mesh>

                {/* Mountains */}
                <mesh rotation={[Math.PI / 2, 5, 0]}>
                    <boxGeometry args={[19.9, 19.9, 19.9]} />
                    <meshStandardMaterial color={color} />
                </mesh>

                <mesh rotation={[Math.PI / 2, 5, 0]}>
                    <boxGeometry args={[20, 20, 20, 10, 10, 10]} />
                    <meshStandardMaterial map={texture} wireframe />
                </mesh>

                <mesh rotation={[Math.PI / 9, 10, 5]}>
                    <boxGeometry args={[19.9, 19.9, 19.9]} />
                    <meshStandardMaterial color={color} />
                </mesh>

                <mesh rotation={[Math.PI / 9, 10, 5]}>
                    <boxGeometry args={[20, 20, 20, 10, 10, 10]} />
                    <meshStandardMaterial map={texture} wireframe />
                </mesh>

            </group>
        </>
    )
}

// Add this if you want textboxes
// <TextBox radius={18} theta={0} size={[5, 2]} text="Scroll down!" />
// <TextBox radius={18} theta={Math.PI / 2} size={[5, 2]} text="Scroll down!" />