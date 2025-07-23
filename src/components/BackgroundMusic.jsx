import { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react';
import Changes from '../assets/changes.wav';
import Journey from '../assets/Journey.wav';
import BackToGold from '../assets/BackToGold.wav'; 
import Cold from '../assets/Cold.wav';
import Distorted from '../assets/Distorted.wav';
import DizzyCity from '../assets/dizzycity.wav';
import Drive from '../assets/Drive.wav';
import Livin from '../assets/livin.wav';
import Starburst from '../assets/Starburst.wav';


const tracks = [
  { title: "Changes", src: Changes },
  { title: "Drive", src: Drive },
  { title: "Starburst", src: Starburst },
  { title: "Dizzy City", src: DizzyCity },
  { title: "Journey", src: Journey },
  { title: "Distorted", src: Distorted },
  { title: "Back To Gold", src: BackToGold },
  { title: "Cold", src: Cold },
  { title: "Livin'", src: Livin },
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
    const handleEnded = () => {
      const nextIndex = (currentIndex + 1) % tracks.length;
      setCurrentIndex(nextIndex);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded); // ✅ Add ended listener

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded); // ✅ Remove it too
    };
  }, [currentIndex]);

  // Play track automatically when currentIndex changes
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.load(); // Load new source
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Auto-play failed:", error);
        });
      }
    }
  }, [currentIndex]);

  return (
    <div className="fixed top-5 right-5 z-50">
      <audio ref={audioRef} src={tracks[currentIndex].src} loop={false} volume={0.5} />
    </div>
  );
});

export default BackgroundMusic;
