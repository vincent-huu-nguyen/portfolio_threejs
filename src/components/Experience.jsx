import { OrbitControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { useTexture } from "@react-three/drei"
import gradientImage from '../assets/gradient.png'

export const Experience = ({position, size}) => {

    const texture = useTexture(gradientImage)
    const ref = useRef()
    useFrame((state, delta) => {
        ref.current.rotation.x -= delta * 0.5
    })
    return (
        <>
            <OrbitControls />
            <mesh position={position} ref={ref}>
                <sphereGeometry args={size} />
                <meshStandardMaterial map={texture} wireframe/>
            </mesh>
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