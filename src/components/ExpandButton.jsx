import { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa'; // 🎵 Music icons
import hoverSoundFile from '../assets/hover.wav';
import clickSoundFile from '../assets/select.mp3';
import backSoundFile from '../assets/back.mp3';
import useSoundEffect from '../hooks/useSoundEffect';

export default function ExpandButton({
  onStart,
  onAboutMeClick,
  onContactClick,
  onPortfolioClick,
  optionsVisible,
  setOptionsVisible,
  showOptions,
  setShowOptions,
  musicRef, // 🎵 Add this prop to control music
}) {
  const [startVisible, setStartVisible] = useState(false);
  const [hideStart, setHideStart] = useState(false);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const [isPlaying, setIsPlaying] = useState(false); // 🎵 Track play/pause
  const [trackTitle, setTrackTitle] = useState(''); // 🎵 Now Playing

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

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTitle = musicRef?.current?.getCurrentTrackTitle?.();
      if (currentTitle && currentTitle !== trackTitle) {
        setTrackTitle(currentTitle);
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [musicRef, trackTitle]);

  useEffect(() => {
    if (showOptions && musicRef?.current?.isPlaying) {
      const playing = musicRef.current.isPlaying();
      setIsPlaying(playing);
    }
  }, [showOptions, musicRef]);


  const handleStartClick = () => {
    playClick();
    onStart?.();
    setIsPlaying(true);
    setTrackTitle(musicRef?.current?.getCurrentTrackTitle?.() || '');
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

  const handleAboutClick = () => {
    playClick();
    setOptionsVisible(false);
    setTimeout(() => {
      setShowOptions(false);
      onAboutMeClick?.();
    }, 500);
  };

  const toggleMusic = () => {
    if (!musicRef?.current) return;
    if (isPlaying) {
      musicRef.current.pause?.();
    } else {
      musicRef.current.play?.();
    }
    setIsPlaying(!isPlaying);
  };

  const baseButtonStyle =
    'w-40 h-12 text-white border-2 border-white transition duration-500 hover:scale-110 ' +
    'hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-green-500 via-indigo-500 to-purple-500 ' +
    'hover:border-transparent hover:ring-2 hover:ring-offset-2 hover:ring-transparent';

  return (
    <div className="flex flex-col items-center justify-center z-10 mt-5 sm:mt-15 space-y-6">
      {!showOptions ? (
        <button
          onMouseEnter={playHover}
          onClick={handleStartClick}
          className={`${baseButtonStyle} mt-25 ${startVisible && !hideStart ? 'opacity-100' : 'opacity-0'}`}
        >
          Start
        </button>
      ) : (
        <>
          {/* 🎵 Music controls fade in/out with the buttons */}
          <div
            className={`transition-all duration-500 ease-in-out transform ${optionsVisible ? 'opacity-100' : 'opacity-0'
              } flex flex-col items-center gap-2 text-white mb-4`}
          >
            <span className="text-sm font-semibold">
              Now Playing: "{musicRef?.current?.getCurrentTrackTitle?.() || '...'}" - Cents
            </span>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  musicRef?.current?.previous?.();
                  setTimeout(() => {
                    setTrackTitle(musicRef?.current?.getCurrentTrackTitle?.() || '');
                    setIsPlaying(true);
                  }, 100);
                }}
                className="text-white hover:scale-110 transition"
              >
                <FaStepBackward />
              </button>
              <button onClick={toggleMusic} onMouseEnter={playHover} className="hover:scale-110 transition">
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <button
                onClick={() => {
                  musicRef?.current?.next?.();
                  setTimeout(() => {
                    setTrackTitle(musicRef?.current?.getCurrentTrackTitle?.() || '');
                    setIsPlaying(true);
                  }, 100);
                }}
                className="text-white hover:scale-110 transition"
              >
                <FaStepForward />
              </button>
            </div>
          </div>

          <div
            className={`grid gap-4 transition-opacity duration-500 ${windowHeight < 500 ? 'grid-cols-2 auto-rows-auto' : 'flex flex-col items-center'
              } ${optionsVisible ? 'opacity-100' : 'opacity-0'}`}
          >
            {['About Me', 'Portfolio', 'Contact Me', 'Coming Soon'].map((label, index) => (
              <button
                key={index}
                className={baseButtonStyle}
                onMouseEnter={playHover}
                onClick={() => {
                  playClick();

                  // Only respond for the active buttons
                  if (label === 'About Me') {
                    setOptionsVisible(false);
                    setTimeout(() => {
                      setShowOptions(false);
                      onAboutMeClick?.();
                    }, 500);
                  } else if (label === 'Portfolio') {
                    setOptionsVisible(false);
                    setTimeout(() => {
                      setShowOptions(false);
                      onPortfolioClick?.();
                    }, 500);
                  } else if (label === 'Contact Me') {
                    setOptionsVisible(false);
                    setTimeout(() => {
                      setShowOptions(false);
                      onContactClick?.();
                    }, 500);
                  }

                  // 'Coming Soon' does nothing
                }}
              >
                {label}
              </button>
            ))}

            <div className="col-span-2 flex justify-center">
              <button
                className={baseButtonStyle}
                onMouseEnter={playHover}
                onClick={handleBackClick}
              >
                Back
              </button>
            </div>
          </div>
        </>
      )}
    </div>

  );
}
