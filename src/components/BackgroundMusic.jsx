import { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react';
import Changes from '../assets/changes.wav';
import Journey from '../assets/Journey.wav';
//import Track3 from '../assets/track3.wav'; // Add as needed

const tracks = [
  { title: "Changes", src: Changes },
  { title: "Journey", src: Journey },
];

const BackgroundMusic = forwardRef((props, ref) => {
  const audioRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useImperativeHandle(ref, () => ({
    play: () => {
      audioRef.current?.play();
    },
    pause: () => {
      audioRef.current?.pause();
    },
    isPlaying: () => isPlaying,
    next: () => {
      const nextIndex = (currentIndex + 1) % tracks.length;
      setCurrentIndex(nextIndex);
    },
    previous: () => {
      const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
      setCurrentIndex(prevIndex);
    },
    getCurrentTrackTitle: () => tracks[currentIndex].title
  }));

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  // Play track automatically when currentIndex changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [currentIndex]);

  return (
    <div className="fixed top-5 right-5 z-50">
      <audio ref={audioRef} src={tracks[currentIndex].src} loop={false} volume={0.5} />
    </div>
  );
});

export default BackgroundMusic;
