import { useRef } from 'react';

export default function useSoundEffect(soundPath) {
  const audioRef = useRef(new Audio(soundPath));

  const play = () => {
    const audio = audioRef.current;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  return play;
}
