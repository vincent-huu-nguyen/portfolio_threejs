import { useState, useEffect } from 'react';

export default function ExpandButton() {
    const [startVisible, setStartVisible] = useState(false);
    const [hideStart, setHideStart] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [optionsVisible, setOptionsVisible] = useState(false);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

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
        setHideStart(true);
        setTimeout(() => {
            setShowOptions(true);
            setTimeout(() => setOptionsVisible(true), 100);
        }, 500);
    };

    const handleBackClick = () => {
        setOptionsVisible(false);
        setTimeout(() => {
            setShowOptions(false);
            setStartVisible(false); // Reset visibility
            setHideStart(false); // Show Start button again
            setTimeout(() => setStartVisible(true), 50); // Trigger fade-in
        }, 500); // Wait for options to fade out
    };

    const baseButtonStyle =
        'w-40 h-12 text-white border-2 border-white transition duration-500 hover:scale-110 ' +
        'hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-green-500 via-indigo-500 to-purple-500 ' +
        'hover:border-transparent hover:ring-2 hover:ring-offset-2 hover:ring-transparent';

    return (
        <div className="fixed inset-0 flex items-center justify-center z-10 mb-20">
            {!showOptions ? (
                <button
                    onClick={handleStartClick}
                    className={`${baseButtonStyle} ${startVisible && !hideStart ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    Start
                </button>
            ) : (
                <div
                    className={`flex ${windowHeight < 500 ? 'flex-row' : 'flex-col'
                        } items-center gap-4 transition-opacity duration-500 ${optionsVisible ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <button className={baseButtonStyle}>About Me</button>
                    <button className={baseButtonStyle}>Portfolio</button>
                    <button className={baseButtonStyle}>Contact Me</button>
                    <button className={baseButtonStyle}>Music Player</button>
                    <button className={baseButtonStyle} onClick={handleBackClick}>
                        Back
                    </button>
                </div>
            )}
        </div>
    );
}
