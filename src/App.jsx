import './App.css'
import './index.css'
import { useEffect, useState, useRef } from 'react';
import { Canvas } from "@react-three/fiber"
import { Experience } from './components/Experience'
import Home from './components/Home'
import ExpandButton from './components/ExpandButton'
import BackgroundMusic from './components/BackgroundMusic'
import AboutMe from './components/AboutMe'
import Contact from './components/Contact'
import Portfolio from './components/Portfolio'


function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState('menu'); // 'menu', 'about'
  const [optionsVisible, setOptionsVisible] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [showAboutMe, setShowAboutMe] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);


  const musicRef = useRef();

  const handleStart = () => {
    if (musicRef.current) {
      musicRef.current.play();
    }
  };

  return (
    <>
      <div className="relative w-screen h-screen overflow-hidden">
        {/* UI Layer */}
        <div className="absolute z-10 w-full h-full pointer-events-auto">
          <Home
            isContactVisible={activeSection === 'contact' && showContact}
            isPortfolioVisible={activeSection === 'portfolio' && showPortfolio}
          />
          <BackgroundMusic
            ref={musicRef}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          {activeSection === 'menu' && (
            <ExpandButton
              onStart={handleStart}
              onAboutMeClick={() => {
                setActiveSection('about');
                setTimeout(() => setShowAboutMe(true), 10);
              }}
              onContactClick={() => {
                setActiveSection('contact');
                setTimeout(() => setShowContact(true), 10);
              }}
              onPortfolioClick={() => {
                setActiveSection('portfolio');
                setTimeout(() => setShowPortfolio(true), 10);
              }}
              optionsVisible={optionsVisible}
              setOptionsVisible={setOptionsVisible}
              showOptions={showOptions}
              setShowOptions={setShowOptions}
              musicRef={musicRef}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
          )}

          <AboutMe
            isVisible={activeSection === 'about' && showAboutMe}
            onBack={() => {
              setShowAboutMe(false); // Slide it down
              setTimeout(() => {
                setActiveSection('menu');
                setShowOptions(true); // Immediately show the buttons container
                setTimeout(() => {
                  setOptionsVisible(true); // Fade in after it's mounted
                }, 50); // Short delay to allow opacity transition
              }, 500); // Match AboutMe slide-out duration
            }}
          />

          <Portfolio
            isVisible={activeSection === 'portfolio' && showPortfolio}
            onBack={() => {
              setShowPortfolio(false);
              setTimeout(() => {
                setActiveSection('menu');
                setShowOptions(true);
                setTimeout(() => setOptionsVisible(true), 50);
              }, 500);
            }}
          />

          <Contact
            isVisible={activeSection === 'contact' && showContact}
            onBack={() => {
              setShowContact(false);
              setTimeout(() => {
                setActiveSection('menu');
                setShowOptions(true); // Mount the buttons
                setTimeout(() => {
                  setOptionsVisible(true); // Then fade them in
                }, 50);
              }, 500); // Wait for Contact to slide out
            }}
          />

        </div>

        <div className="absolute inset-x-0 bottom-0 w-full h-screen z-0 pointer-events-none">
          <Canvas>
            <directionalLight position={[0, 10, 10]} intensity={1.5} />
            <ambientLight intensity={0.8} />
            <Experience
              position={[0, -17, 0]}
              size={[15, 30, 30]}
              color="#000000"
              isStartZoomedOut={!showOptions}
              isContactZoomedOut={activeSection === 'contact' && showContact}
              isPortfolioVisible={activeSection === 'portfolio'}
            />

          </Canvas>
        </div>
      </div>
    </>
  )
}

export default App;
