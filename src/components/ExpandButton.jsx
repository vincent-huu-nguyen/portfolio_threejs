import { useState, useEffect } from 'react';
import hoverSoundFile from '../assets/hover.wav';
import clickSoundFile from '../assets/select.mp3';
import backSoundFile from '../assets/back.mp3';
import useSoundEffect from '../hooks/useSoundEffect';

export default function ExpandButton({ onStart }) {
  const [startVisible, setStartVisible] = useState(false);
  const [hideStart, setHideStart] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const playHover = useSoundEffect(hoverSoundFile);
  const playClick = useSoundEffect(clickSoundFile);
  const playBack = useSoundEffect(backSoundFile);

  useEffect(() => {
    const timer = setTimeout(() => setStartVisible(true), 1000);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleStartClick = () => {
    playClick();
    onStart?.();
    setHideStart(true);
    setTimeout(() => {
      setShowOptions(true);
      setTimeout(() => setOptionsVisible(true), 100);
    }, 500);
  };

  const handleBackClick = () => {
    playBack();
    setOptionsVisible(false);
    setTimeout(() => {
      setShowOptions(false);
      setStartVisible(false);
      setHideStart(false);
      setTimeout(() => setStartVisible(true), 50);
    }, 500);
  };

  const baseButtonStyle =
    'w-40 h-12 text-white border-2 border-white transition duration-500 hover:scale-110 ' +
    'hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-green-500 via-indigo-500 to-purple-500 ' +
    'hover:border-transparent hover:ring-2 hover:ring-offset-2 hover:ring-transparent';

  return (
    <div className="flex items-center justify-center z-10 mt-20 md:mt-10">
      {!showOptions ? (
        <button
          onMouseEnter={playHover}
          onClick={handleStartClick}
          className={`mt-30 ${baseButtonStyle} ${
            startVisible && !hideStart ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Start
        </button>
      ) : (
        <div
          className={`flex ${
            windowHeight < 500 ? 'flex-row' : 'flex-col'
          } items-center gap-4 transition-opacity duration-500 ${
            optionsVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {['About Me', 'Portfolio', 'Contact Me', 'Music Player'].map((label, index) => (
            <button
              key={index}
              className={baseButtonStyle}
              onMouseEnter={playHover}
              onClick={playClick}
            >
              {label}
            </button>
          ))}
          <button
            className={baseButtonStyle}
            onMouseEnter={playHover}
            onClick={handleBackClick}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
}
