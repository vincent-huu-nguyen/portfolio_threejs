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
import useSoundEffect from '../hooks/useSoundEffect';
import backSoundFile from '../assets/back.mp3';
import hoverSoundFile from '../assets/hover.wav';



const Portfolio = ({ isVisible, onBack }) => {
    const scrollRef = useRef(null);
    const [currentImageIndices, setCurrentImageIndices] = useState([]);
    const [focusedIndex, setFocusedIndex] = useState(0);
    const playBack = useSoundEffect(backSoundFile);
      const playHover = useSoundEffect(hoverSoundFile);
    

    const portfolio = useMemo(() => [
        {
            img: musicChanges,
            title: "Cents Music Player",
            tech: ["HTML", "CSS", "JavaScript", "Web Audio API"],
            desc: "A fully functional web-based music player featuring original tracks produced by me.",
            live: "https://vincent-huu-nguyen.github.io/Cents_Music_Player/",
            git: "https://github.com/vincent-huu-nguyen/Cents_Music_Player",
            slideshowImages: [musicJourney, musicProm, musicChanges],
        },
        {
            img: redPandaBash,
            title: "Red Panda Bash",
            tech: ["Godot", "GDScript"],
            desc: "Platformer arcade game built in Godot. Use bamboos to duel with others in action-packed matches.",
            live: "https://cents808.itch.io/red-panda-bash",
            git: "https://github.com/vincent-huu-nguyen/platform_game",
            slideshowImages: [redPandaBash, battleRPB, battleRPB2],
        },
        {
            img: snatched,
            title: "Snatched",
            tech: ["Unity", "C#"],
            desc: "Action horror RPG game made in Unity. Search for your missing daughter in a cursed orphanage.",
            live: "https://salslinger.itch.io/snatched",
            git: "https://github.com/Salslinger/CSE-4304-Team-Project",
            slideshowImages: [snatched, snatched1, snatched2, snatched3, snatched4, snatched5],
        },
        {
            img: PortfolioWebsite,
            title: "Portfolio Website",
            tech: ["React", "TailwindCSS"],
            desc: "My personal website built with React, Three.js, TailwindCSS, and Framer Motion.",
            live: "https://vincent-nguyen.vercel.app/",
            git: "https://github.com/vincent-huu-nguyen/vincent_nguyen_website",
            slideshowImages: [PortfolioWebsite],
        },
        {
            img: vgdoWebsite,
            title: "VGDO Website",
            tech: ["HTML", "CSS", "JavaScript"],
            desc: "Official site for the VGDO club at UTA, housing events and submission tools.",
            live: "https://uta-vgdo.github.io/website/",
            git: "https://github.com/uta-vgdo/website",
            slideshowImages: [vgdoWebsite],
        },
        {
            img: rhythmixLogo,
            title: "Rhythmix",
            tech: ["Unity", "C#"],
            desc: "A Unity rhythm game where you tap in sync with music. Multiple difficulty levels.",
            live: "https://salslinger.itch.io/rhythmix",
            git: "https://github.com/Salslinger/Rhythmix",
            slideshowImages: [rhythmixLogo, rhythmix1, rhythmix2, rhythmix3],
        },
        {
            img: statefarmLogo,
            title: "Statefarm Hazard Game",
            tech: ["Godot", "GDScript"],
            desc: "Godot-made Hackathon game. Spot home hazards in different rooms.",
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
        };

        container.addEventListener("scroll", handleScroll, { passive: true });
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

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




    return (
        <div
            className={`fixed top-30 left-0 w-full h-full z-20 px-4 transition-all duration-500 ease-in-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
                }`}
        >
            <section className="py-10 max-w-6xl mx-auto">
                <h1 className="opacity-0 text-4xl text-center text-[#f7f8f8] font-bold mb-2 hover:bg-gradient-to-r from-green-500 via-indigo-500 to-purple-500 hover:text-transparent hover:bg-clip-text hover:scale-110 duration-200">
                    PORTFOLIO
                </h1>

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
                                <div className="bg-[#0a0a0a] p-2 rounded-md shadow-md min-h-[325px] flex flex-col justify-between">
                                    <img
                                        src={item.slideshowImages[currentImageIndices[index] || 0]}
                                        alt={item.title}
                                        className="object-contain rounded-md h-64 w-full"
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
                                    <p className="text-xs text-gray-400 line-clamp-3">{item.desc}</p>
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
