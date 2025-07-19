import './App.css'
import './index.css'
import { useEffect, useState } from 'react';
import { Canvas } from "@react-three/fiber"
import { Experience } from './components/Experience'
import { useRef } from 'react'
import Home from './components/Home'
import ExpandButton from './components/ExpandButton'
import BackgroundMusic from './components/BackgroundMusic'
import AboutMe from './components/AboutMe'

/* For cube
function App() {

  return (
    <Canvas>
        <Experience position={[0, 0, 0]} size={[1, 1, 1]} color={"orange"}/>
    </Canvas>
  )
}
*/

/* For sphere */
function App() {
  const [isMobile, setIsMobile] = useState(false);

  const musicRef = useRef()

  const handleStart = () => {
    if (musicRef.current) {
      musicRef.current.play()
    }
  }

  return (
    <>
      <div className="relative w-screen h-screen overflow-hidden">
        {/* UI Layer */}
        <div className="absolute z-10 w-full h-full pointer-events-auto">
          <Home />

          <BackgroundMusic ref={musicRef} />
          <ExpandButton onStart={handleStart} />
        </div>

        <div className='absolute inset-x-0 bottom-0 w-full h-screen z-0 pointer-events-none'>
          <Canvas>
            <directionalLight position={[0, 10, 10]} intensity={1.5} />
            <ambientLight intensity={0.8} />
            <Experience position={[0, -17, 0]} size={[15, 30, 30]} color='#000000' scale={isMobile ? [0.6, 0.6, 0.6] : [1, 1, 1]}/>
          </Canvas>
        </div>
      </div>
    </>
  )
}

export default App
