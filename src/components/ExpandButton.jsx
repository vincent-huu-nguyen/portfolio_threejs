import { useState, useEffect } from 'react';
import hoverSoundFile from '../assets/hover.wav';
import clickSoundFile from '../assets/select.mp3';
import backSoundFile from '../assets/back.mp3';
import useSoundEffect from '../hooks/useSoundEffect';

export default function ExpandButton({ onStart, onAboutMeClick }) {
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

    const handleAboutClick = () => {
        playClick();
        setOptionsVisible(false);
        setTimeout(() => {
            setShowOptions(false);
            onAboutMeClick?.(); // Call parent to show AboutMe
        }, 500);
    };

    const baseButtonStyle =
        'w-40 h-12 text-white border-2 border-white transition duration-500 hover:scale-110 ' +
        'hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-green-500 via-indigo-500 to-purple-500 ' +
        'hover:border-transparent hover:ring-2 hover:ring-offset-2 hover:ring-transparent';

    return (
        <div className="flex items-center justify-center z-10 mt-5 sm:mt-15">
            {!showOptions ? (
                <button
                    onMouseEnter={playHover}
                    onClick={handleStartClick}
                    className={`mt-20 sm:mt-30 ${baseButtonStyle} ${startVisible && !hideStart ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    Start
                </button>
            ) : (
                <div
                    className={`grid gap-4 transition-opacity duration-500 ${windowHeight < 500 ? 'grid-cols-2 auto-rows-auto' : 'flex flex-col items-center'
                        } ${optionsVisible ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    {['About Me', 'Portfolio', 'Contact Me', 'Music Player'].map((label, index) => (
                        <button
                            key={index}
                            className={baseButtonStyle}
                            onMouseEnter={playHover}
                            onClick={() => {
                                playClick();
                                if (label === 'About Me') {
                                    setOptionsVisible(false);
                                    setTimeout(() => {
                                        setShowOptions(false);
                                        onAboutMeClick?.(); // trigger the prop
                                    }, 500); // wait for fade out
                                }
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
            )}
        </div>
    );
}
