import { useState } from 'react';
import AboutMeCard from '../assets/AboutMe_Card.png';
import TechStackCard from '../assets/TechStack_Card.png';
import useSoundEffect from '../hooks/useSoundEffect';
import hoverSoundFile from '../assets/hover.wav';
import clickSoundFile from '../assets/select.mp3';
import backSoundFile from '../assets/back.mp3';

export default function AboutMe({ onBack, isVisible }) {
  const [showFirst, setShowFirst] = useState(true);

  const playHover = useSoundEffect(hoverSoundFile);
  const playClick = useSoundEffect(clickSoundFile);
  const playBack = useSoundEffect(backSoundFile);

  const toggleImage = () => {
    playClick();
    setShowFirst(prev => !prev);
  };

  const handleBackClick = () => {
    playBack();
    onBack?.();
  };

  return (
    <div
      className={`transition-all duration-500 ease-in-out transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      } pt-3 flex flex-col items-center justify-center gap-2 text-white pointer-events-auto`}
    >
      <img
        src={showFirst ? TechStackCard : AboutMeCard}
        alt="About Visual"
        className="w-175 h-auto transition-opacity duration-500"
      />
      <div className="flex gap-4 mt-4">
        <button
          onMouseEnter={playHover}
          onClick={toggleImage}
          className="w-40 h-12 text-white border-2 border-white transition duration-500 hover:scale-110"
        >
          Flip
        </button>
        <button
          onMouseEnter={playHover}
          onClick={handleBackClick}
          className="w-40 h-12 text-white border-2 border-white transition duration-500 hover:scale-110"
        >
          Back
        </button>
      </div>
    </div>
  );
}
