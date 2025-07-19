import { useState } from 'react';
import AboutMeCard from '../assets/AboutMe_Card.png';
import TechStackCard from '../assets/TechStack_Card.png';

export default function AboutMe({ onBack }) {
  const [showFirst, setShowFirst] = useState(true);

  const toggleImage = () => {
    setShowFirst((prev) => !prev);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center text-white gap-2 pointer-events-auto">
      <img
        src={showFirst ? TechStackCard : AboutMeCard}
        alt="About Visual"
        className="w-175 h-auto transition-opacity duration-500"
      />
      <button
        onClick={toggleImage}
        className="w-40 h-12 text-white border-2 border-white transition duration-500 hover:scale-110"
      >
        Flip
      </button>
      <button
          onClick={onBack}
          className="w-40 h-12 text-white border-2 border-white transition duration-500 hover:scale-110"
        >
          Back
        </button>
    </div>
  );
}
