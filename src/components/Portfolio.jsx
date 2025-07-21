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

const Portfolio = ({ isVisible, onBack }) => {
    const scrollRef = useRef(null);
    const [currentImageIndices, setCurrentImageIndices] = useState([]);


    const portfolio = useMemo(() => [
        {
            img: musicChanges,
            title: "Cents Music Player",
            desc: "A fully functional web-based music player featuring original tracks produced by me.",
            live: "https://vincent-huu-nguyen.github.io/Cents_Music_Player/",
            git: "https://github.com/vincent-huu-nguyen/Cents_Music_Player",
            slideshowImages: [musicJourney, musicProm, musicChanges],
        },
        {
            img: redPandaBash,
            title: "Red Panda Bash",
            desc: "Platformer arcade game built in Godot. Use bamboos to duel with others in action-packed matches.",
            live: "https://cents808.itch.io/red-panda-bash",
            git: "https://github.com/vincent-huu-nguyen/platform_game",
            slideshowImages: [redPandaBash, battleRPB, battleRPB2],
        },
        {
            img: snatched,
            title: "Snatched",
            desc: "Action horror RPG game made in Unity. Search for your missing daughter in a cursed orphanage.",
            live: "https://salslinger.itch.io/snatched",
            git: "https://github.com/Salslinger/CSE-4304-Team-Project",
            slideshowImages: [snatched, snatched1, snatched2, snatched3, snatched4, snatched5],
        },
        {
            img: PortfolioWebsite,
            title: "Portfolio Website",
            desc: "My personal website built with React, Three.js, TailwindCSS, and Framer Motion.",
            live: "https://vincent-nguyen.vercel.app/",
            git: "https://github.com/vincent-huu-nguyen/vincent_nguyen_website",
            slideshowImages: [PortfolioWebsite],
        },
        {
            img: vgdoWebsite,
            title: "VGDO Website",
            desc: "Official site for the VGDO club at UTA, housing events and submission tools.",
            live: "https://uta-vgdo.github.io/website/",
            git: "https://github.com/uta-vgdo/website",
            slideshowImages: [vgdoWebsite],
        },
        {
            img: rhythmixLogo,
            title: "Rhythmix",
            desc: "A Unity rhythm game where you tap in sync with music. Multiple difficulty levels.",
            live: "https://salslinger.itch.io/rhythmix",
            git: "https://github.com/Salslinger/Rhythmix",
            slideshowImages: [rhythmixLogo, rhythmix1, rhythmix2, rhythmix3],
        },
        {
            img: statefarmLogo,
            title: "Statefarm Hazard Game",
            desc: "Godot-made Hackathon game. Spot home hazards in different rooms.",
            live: "https://salslinger.itch.io/statefarm-interactive-hazard-game",
            git: "https://github.com/KehniWind/Statefarm-Game",
            slideshowImages: [Statefarm, Kitchen, Livingroom],
        },
    ], []);

    useEffect(() => {
        const scrollToCenter = () => {
            if (scrollRef.current) {
                const container = scrollRef.current;
                const firstCard = container.querySelector(".card");
                if (firstCard) {
                    const containerCenter = container.offsetWidth / 2;
                    const cardCenter = firstCard.offsetLeft + firstCard.offsetWidth / 2;
                    container.scrollLeft = cardCenter - containerCenter;
                }
            }
        };
        const timeout = setTimeout(scrollToCenter, 100); // after mount
        return () => clearTimeout(timeout);
    }, []);

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



    return (
        <div
            className={`fixed top-0 left-0 w-full h-full z-20 px-4 transition-all duration-500 ease-in-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
                }`}
        >
            <section className="py-10 max-w-6xl mx-auto">
                <h1 className="text-4xl text-center text-[#f7f8f8] font-bold mb-8 hover:bg-gradient-to-r from-green-500 via-indigo-500 to-purple-500 hover:text-transparent hover:bg-clip-text hover:scale-110 duration-200">
                    PORTFOLIO
                </h1>

                <div ref={scrollRef} className="overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory">
                    <div className="flex gap-6 w-max pb-6 px-4">
                        {/* Spacer to allow first card to center */}
                        <div className="w-[50vw] shrink-0"></div>

                        {portfolio.map((item, index) => (
                            <div
                                key={index}
                                className="card flex-shrink-0 snap-center w-96 bg-gradient-to-r from-green-500 via-indigo-500 to-purple-500 p-0.5 rounded-md"
                            >
                                <div className="bg-[#0a0a0a] p-6 rounded-md shadow-md h-[400px] flex flex-col justify-between">
                                    <img
                                        src={item.slideshowImages[currentImageIndices[index] || 0]}
                                        alt={item.title}
                                        className="object-contain rounded-md mb-2 h-64 w-full"
                                    />
                                    <p className="text-md text-[#f7f8f8] font-semibold">{item.title}</p>
                                    <p className="text-xs text-gray-400 line-clamp-3">{item.desc}</p>
                                    <div className="mt-4 flex justify-center gap-2">
                                        <a href={item.live} target="_blank" rel="noreferrer" className="text-white underline text-sm">Live</a>
                                        <a href={item.git} target="_blank" rel="noreferrer" className="text-white underline text-sm">GitHub</a>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Spacer to allow last card to center */}
                        <div className="w-[50vw] shrink-0"></div>
                    </div>
                </div>

                {/* Centered Back Button */}
                <div className="flex justify-center">
                    <button
                        onClick={onBack}
                        className="text-white text-sm border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
                    >
                        Back
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Portfolio;
