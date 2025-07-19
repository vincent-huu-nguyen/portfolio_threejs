import './App.css'
import { Canvas } from "@react-three/fiber"
import { Experience } from './components/Experience'

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

  return (
    <Canvas>
      <directionalLight position={[0, 0, 2]} intensity={0.5}/>
      <ambientLight intensity={0.1} />
        <Experience position={[0, -15, -3.5]} size={[15, 30, 30]} color='#0c0c0c'/>
    </Canvas>
  )
}

export default App
