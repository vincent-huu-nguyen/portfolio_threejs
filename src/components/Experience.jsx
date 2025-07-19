import { OrbitControls } from "@react-three/drei"
import { useFrame, useLoader } from "@react-three/fiber"
import { useRef, useState } from "react"
import { useTexture } from "@react-three/drei"
import { TextureLoader } from "three"
import gradientImage from '../assets/gradient.png'
import walk1 from '../assets/TrainerFrame1.png'
import walk2 from '../assets/TrainerFrame2.png'
import walk3 from '../assets/TrainerFrame3.png'
import walk4 from '../assets/TrainerFrame4.png'

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
            <OrbitControls enableZoom={true} />

            {/* Walking Sprite */}
            <mesh ref={spriteRef}>
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial
                    map={walkFrames[frameIndex]}
                    transparent
                />
            </mesh>

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

                {/* Mountains / Solid Cube */}
                <mesh rotation={[Math.PI / 2, 5, 0]}>
                    <boxGeometry args={[19.9, 19.9, 19.9]} />
                    <meshStandardMaterial color={color} />
                </mesh>

                {/* Wireframe Mountains / Cube */}
                <mesh rotation={[Math.PI / 2, 5, 0]}>
                    <boxGeometry args={[20, 20, 20, 10, 10, 10]} />
                    <meshStandardMaterial map={texture} wireframe/>
                </mesh>

                {/* Mountains / Solid Cube */}
                <mesh rotation={[Math.PI / 9, 10, 5]}>
                    <boxGeometry args={[19.9, 19.9, 19.9]} />
                    <meshStandardMaterial color={color} />
                </mesh>

                {/* Wireframe Mountains / Cube */}
                <mesh rotation={[Math.PI / 9, 10, 5]}>
                    <boxGeometry args={[20, 20, 20, 10, 10, 10]} />
                    <meshStandardMaterial map={texture} wireframe/>
                </mesh>
            </group>

        </>
    )
}

/*
export const Experience = ({ position, size, color }) => {
  const ref = useRef()
  const scrollDelta = useRef(0)
  const { gl } = useThree()

  useEffect(() => {
    const handleScroll = (e) => {
      scrollDelta.current += e.deltaY * 0.001 // Adjust sensitivity here
    }

    // Attach scroll listener to canvas' DOM element
    const canvas = gl.domElement
    canvas.addEventListener("wheel", handleScroll)

    return () => {
      canvas.removeEventListener("wheel", handleScroll)
    }
  }, [gl])

  useFrame(() => {
    if (scrollDelta.current !== 0) {
      ref.current.rotation.x -= scrollDelta.current
      scrollDelta.current = 0 // Reset after applying
    }
  })

  return (
    <>
      <OrbitControls enableZoom={false}/>
      <mesh position={position} ref={ref}>
        <sphereGeometry args={size} />
        <meshStandardMaterial color={color} wireframe />
      </mesh>
    </>
  )
}
  */