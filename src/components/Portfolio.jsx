import React, { useMemo, useRef, useEffect, useState } from "react";
import musicChanges from "../assets/musicChanges.png";
import musicJourney from "../assets/musicJourney.png";
import musicProm from "../assets/musicProm.png";
import redPandaBash from "../assets/redPandaBash.png";
import battleRPB from "../assets/battleRPB.gif";
import battleRPB2 from "../assets/battleRPB2.gif";
import snatched from "../assets/snatched.png";
import snatched1 from "../assets/snatched1.gif";
import snatched2 from "../assets/snatched2.gif";
import snatched3 from "../assets/snatched3.gif";
import snatched4 from "../assets/snatched4.gif";
import snatched5 from "../assets/snatched5.gif";
import PortfolioWebsite from "../assets/portfolioWebsite.jpg";
import vgdoWebsite from "../assets/VGDOwebsite.png";
import rhythmixLogo from "../assets/rhythmixLogo.png";
import rhythmix1 from "../assets/rhythmix1.gif";
import rhythmix2 from "../assets/rhythmix2.gif";
import rhythmix3 from "../assets/rhythmix3.gif";
import statefarmLogo from "../assets/statefarmLogo.png";
import Statefarm from "../assets/Statefarm.png";
import Kitchen from "../assets/kitchen.png";
import Livingroom from "../assets/livingroom.png";
import PortfolioThreeJS from "../assets/portfolioThreeJS.gif"
import PortfolioThreeJS1 from "../assets/portfolioThreeJS1.gif"
import PortfolioThreeJS2 from "../assets/portfolioThreeJS2.gif"
import PortfolioThreeJS3 from "../assets/portfolioThreeJS3.gif"

import useSoundEffect from '../hooks/useSoundEffect';
import backSoundFile from '../assets/back.mp3';
import hoverSoundFile from '../assets/hover.wav';

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Portfolio = ({ isVisible, onBack }) => {
    const scrollRef = useRef(null);
    const [currentImageIndices, setCurrentImageIndices] = useState([]);
    const [focusedIndex, setFocusedIndex] = useState(0);
    const playBack = useSoundEffect(backSoundFile);
    const playHover = useSoundEffect(hoverSoundFile);

    const [showSwipeHint, setShowSwipeHint] = useState(false);
    const scrollTimeoutRef = useRef(null);
    const [pulseOpacity, setPulseOpacity] = useState(true);


    const portfolio = useMemo(() => [
        {
            img: PortfolioThreeJS,
            title: "Interactive 3D Portfolio Website",
            tech: ["React", "Three.js", "React Three Fiber", "TailwindCSS", "Framer Motion", "JavaScript", "HTML", "CSS"],
            desc: "A 3D portfolio website using React, Three.js, and modern front-end technologies, blending web application interactivity with a clean UI.",
            live: "https://vincentnguyen.vercel.app/",
            git: "https://github.com/vincent-huu-nguyen/portfolio_threejs",
            slideshowImages: [PortfolioThreeJS1, PortfolioThreeJS2, PortfolioThreeJS3, PortfolioThreeJS],
        },
        {
            img: musicChanges,
            title: "Cents Music Player",
            tech: ["HTML", "CSS", "JavaScript", "Web Audio API"],
            desc: "A fully functional web-based music player featuring a curated collection of original tracks produced by me. Stream and explore my music directly from your browser.",
            live: "https://vincent-huu-nguyen.github.io/Cents_Music_Player/",
            git: "https://github.com/vincent-huu-nguyen/Cents_Music_Player",
            slideshowImages: [musicJourney, musicProm, musicChanges],
        },
        {
            img: redPandaBash,
            title: "Red Panda Bash",
            tech: ["Godot", "GDScript"],
            desc: "A platformer arcade-esque game built in the Godot Engine. Play as a skilled red panda, using your agility and precision to dodge and throw bamboos with pinpoint accuracy. Challenge other red pandas in fast-paced, action-packed duels.",
            live: "https://cents808.itch.io/red-panda-bash",
            git: "https://github.com/vincent-huu-nguyen/platform_game",
            slideshowImages: [redPandaBash, battleRPB, battleRPB2],
        },
        {
            img: snatched,
            title: "Snatched",
            tech: ["Unity", "C#"],
            desc: "An action RPG horror game built in the Unity Engine. Play as a detective searching for his missing daughter in a forgotten town and an eerie orphanage, The Happy Place. Battle twisted enemies and uncover the dark truth buried in its past.",
            live: "https://salslinger.itch.io/snatched",
            git: "https://github.com/Salslinger/CSE-4304-Team-Project",
            slideshowImages: [snatched, snatched1, snatched2, snatched3, snatched4, snatched5],
        },
        {
            img: PortfolioWebsite,
            title: "Simple Portfolio Website",
            tech: ["React", "TailwindCSS", "HTML", "CSS", "JavaScript"],
            desc: "My simple personal portfolio website showcasing projects in software engineering, web and game development.",
            live: "https://vincent-nguyen.vercel.app/",
            git: "https://github.com/vincent-huu-nguyen/vincent_nguyen_website",
            slideshowImages: [PortfolioWebsite],
        },
        {
            img: vgdoWebsite,
            title: "VGDO Website",
            tech: ["HTML", "CSS", "JavaScript"],
            desc: "The official website for the VGDO (Video Game Developers Organization) at UTA. It is a central hub for club updates, event details, jam submissions, and resources for students interested in game development.",
            live: "https://uta-vgdo.github.io/website/",
            git: "https://github.com/uta-vgdo/website",
            slideshowImages: [vgdoWebsite],
        },
        {
            img: rhythmixLogo,
            title: "Rhythmix",
            tech: ["Unity", "C#"],
            desc: "A rhythm game built in Unity where players tap keys in sync with the music to score points. Features multiple difficulty levels to test your timing, precision, and rhythm.",
            live: "https://salslinger.itch.io/rhythmix",
            git: "https://github.com/Salslinger/Rhythmix",
            slideshowImages: [rhythmixLogo, rhythmix1, rhythmix2, rhythmix3],
        },
        {
            img: statefarmLogo,
            title: "Statefarm Hazard Game",
            tech: ["Godot", "GDScript"],
            desc: "An interactive game using the Godot Engine. Created in HackUTA 2023. The game brings awareness to the player about hazards in homes.",
            live: "https://salslinger.itch.io/statefarm-interactive-hazard-game",
            git: "https://github.com/KehniWind/Statefarm-Game",
            slideshowImages: [Statefarm, Kitchen, Livingroom],
        },
    ], []);

    const handleBackClick = () => {
        playBack();
        onBack?.();
    };

    useEffect(() => {
        setCurrentImageIndices(Array(portfolio.length).fill(0));
    }, [portfolio]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndices((prev) =>
                prev.map((index, i) => (index + 1) % portfolio[i].slideshowImages.length)
            );
        }, 2000);
        return () => clearInterval(intervalId);
    }, [portfolio]);

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const handleScroll = () => {
            const cards = container.querySelectorAll(".card");
            const viewportCenter = window.innerWidth / 2;

            let closestIndex = 0;
            let closestDistance = Infinity;

            cards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                const cardCenter = rect.left + rect.width / 2;
                const distance = Math.abs(viewportCenter - cardCenter);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }
            });

            setFocusedIndex(closestIndex);

            // 🧠 Reset swipe hint timer on scroll
            setShowSwipeHint(false);
            clearTimeout(scrollTimeoutRef.current);
            scrollTimeoutRef.current = setTimeout(() => {
                setShowSwipeHint(true);
            }, 1000); 

            return () => {
                container.removeEventListener("scroll", handleScroll);
                clearTimeout(scrollTimeoutRef.current);
            };

        };


        container.addEventListener("scroll", handleScroll, { passive: true });
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isVisible && scrollRef.current) {
            const container = scrollRef.current;

            // Manually call the scroll handler once to update focusedIndex and showSwipeHint
            const cards = container.querySelectorAll(".card");
            const viewportCenter = window.innerWidth / 2;

            let closestIndex = 0;
            let closestDistance = Infinity;

            cards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                const cardCenter = rect.left + rect.width / 2;
                const distance = Math.abs(viewportCenter - cardCenter);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }
            });

            setFocusedIndex(closestIndex);
            setShowSwipeHint(true); // Show hint on first load
        }
    }, [isVisible]);

    useEffect(() => {
        let pulseInterval;

        if (showSwipeHint) {
            pulseInterval = setInterval(() => {
                setPulseOpacity((prev) => !prev);
            }, 700); // every 1 second
        } else {
            setPulseOpacity(true); // reset to visible when hidden
        }

        return () => clearInterval(pulseInterval);
    }, [showSwipeHint]);


    /*
    useEffect(() => {
        if (isVisible && scrollRef.current) {
            const container = scrollRef.current;
            const cards = container.querySelectorAll(".card");

            if (cards.length > 0) {
                const lastCard = cards[cards.length - 1];
                const firstCard = cards[0];

                // Step 1: Get the center position of the last card
                const containerCenter = container.offsetWidth / 2;
                const lastCardCenter = lastCard.offsetLeft + lastCard.offsetWidth / 2;
                const scrollTo = lastCardCenter - containerCenter;

                // Step 2: Instantly jump scroll to last card
                requestAnimationFrame(() => {
                    container.scrollLeft = scrollTo;
                });


                // Step 3: Smooth scroll to first card after delay
                setTimeout(() => {
                    firstCard.scrollIntoView({ behavior: "smooth", inline: "center" });
                }, 800);
            }
        }
    }, [isVisible]);
*/



    return (
        <div
            className={`fixed top-10 left-0 w-full h-full z-20 px-4 transition-all duration-500 ease-in-out ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
                }`}
        >
            <section className="py-1 md:py-10 max-w-6xl mx-auto">
                <h1 className="flex items-center justify-center flex-col text-center opacity-100 text-4xl md:text-5xl font-bold mb-1 bg-gradient-to-r from-green-500 via-indigo-500 to-purple-500 text-transparent bg-clip-text hover:scale-110 duration-200">
                    PORTFOLIO
                </h1>

                <div className="h-6 md:h-8 flex justify-center items-center transition-all duration-500 mb-3 overflow-hidden">
                    <div
                        className={`text-white text-sm md:text-base text-center flex items-center gap-2 
    transition-opacity duration-500 ease-in-out 
    ${showSwipeHint ? (pulseOpacity ? 'opacity-100' : 'opacity-50') : 'opacity-0'}
  `}
                    >
                        <FaArrowLeft className="text-sm text-indigo-400" />
                        <span className="bg-gradient-to-r from-indigo-500 via-indigo-500 to-indigo-500 text-transparent bg-clip-text">Swipe</span>
                        <FaArrowRight className="text-sm text-indigo-400" />
                    </div>
                </div>


                <div ref={scrollRef} className="custom-scrollbar overflow-x-auto scroll-smooth snap-x snap-mandatory">
                    <div className="flex w-max pb-6 px-4">
                        {/* Spacer to center first card */}
                        <div className="shrink-0 w-[calc(50vw-150px)]"></div>

                        {portfolio.map((item, index) => (
                            <div
                                key={index}
                                className={`card flex-shrink-0 snap-center w-[350px] transform transition-all duration-300 ease-out 
    ${Math.abs(focusedIndex - index) <= 1
                                        ? `${focusedIndex === index ? "scale-100 z-10 opacity-100" : "scale-75 z-0 opacity-100"}`
                                        : "scale-75 z-0 opacity-0 pointer-events-none"
                                    }
    bg-gradient-to-r from-green-500 via-indigo-500 to-purple-500 p-0.25 rounded-md`}

                            >
                                <div className="bg-[#030303] p-2 rounded-md shadow-md h-[425px] flex flex-col justify-between">
                                    <img
                                        src={item.slideshowImages[currentImageIndices[index] || 0]}
                                        alt={item.title}
                                        className="object-contain rounded-lg h-64 w-full"
                                    />
                                    <p className="text-md text-[#f7f8f8] font-semibold">{item.title}</p>
                                    <div className="flex flex-wrap gap-1 mt-1 mb-2">
                                        {item.tech.map((tech, i) => (
                                            <span
                                                key={i}
                                                className="bg-gray-800 text-white text-[10px] px-2 py-0.5 rounded-full"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-400 line-clamp-4 flex-grow">{item.desc}</p>
                                    <div className="mt-4 flex justify-center gap-2">
                                        <a href={item.live} target="_blank" rel="noreferrer" className="text-white underline text-sm">Live</a>
                                        <a href={item.git} target="_blank" rel="noreferrer" className="text-white underline text-sm">GitHub</a>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Spacer to center last card */}
                        <div className="shrink-0 w-[calc(50vw-150px)]"></div>
                    </div>
                </div>

                {/* Back Button */}
                <div className="flex justify-center">
                    <button
                        onMouseEnter={playHover}
                        onClick={handleBackClick}
                        className="w-40 h-12 text-white border-2 border-white transition duration-500 hover:scale-110"
                    >
                        Back
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Portfolio;
