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
      <directionalLight position={[0, 0, 2]} />
        <Experience position={[0, -15, -10]} size={[15, 30, 30]}/>
    </Canvas>
  )
}

export default App
