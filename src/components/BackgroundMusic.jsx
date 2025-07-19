import { forwardRef, useImperativeHandle, useRef } from 'react'
import Changes from '../assets/changes.wav'
import { FaPlay, FaPause } from 'react-icons/fa'

const BackgroundMusic = forwardRef((props, ref) => {
  const audioRef = useRef(null)

  useImperativeHandle(ref, () => ({
    play: () => {
      if (audioRef.current) {
        audioRef.current.play().catch((err) => {
          console.warn("Playback failed:", err)
        })
      }
    }
  }))

  return (
    <div className="fixed top-5 right-5 z-50">
      <audio ref={audioRef} src={Changes} loop volume={0.5} />
    </div>
  )
})

export default BackgroundMusic
