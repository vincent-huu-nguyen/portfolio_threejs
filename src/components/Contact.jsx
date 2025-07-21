import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import hoverSoundFile from '../assets/hover.wav';
import clickSoundFile from '../assets/select.mp3';
import backSoundFile from '../assets/back.mp3';
import useSoundEffect from '../hooks/useSoundEffect';

const Contact = ({ isVisible, onBack }) => {
    const form = useRef();
    const [sentMessageVisible, setSentMessageVisible] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const playHover = useSoundEffect(hoverSoundFile);
    const playClick = useSoundEffect(clickSoundFile);
    const playBack = useSoundEffect(backSoundFile);

    const sendEmail = (e) => {
        e.preventDefault();
        setIsSending(true); // Show "Sending..." immediately

        emailjs.sendForm(
            '78963214',
            'template_luxjn3o',
            form.current,
            'd5p2EPhq-SKO-CKoV'
        ).then(
            (result) => {
                console.log(result.text);
                console.log('message sent');
                setIsSending(false);
                setSentMessageVisible(true);
                setTimeout(() => setSentMessageVisible(false), 1500);
            },
            (error) => {
                console.log(error.text);
                setIsSending(false);
            }
        );

        e.target.reset();
    };

    const handleBackClick = () => {
        playBack();
        onBack?.();
    };

    return (
        <div
            className={`fixed top-0 left-0 w-full h-full z-20 flex items-center justify-center transition-all duration-500 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
                }`}
        >
            <div className="w-15/16 max-w-xl rounded-md bg-gradient-to-r from-green-500 via-indigo-500 to-purple-500 p-0.5 sm:p-0.5 opacity-75">
                <div className="bg-[#0b0b0b] rounded-md p-6 sm:p-8 opacity-90">
                    <h2 className="text-4xl font-bold text-center text-[#f7f8f8] mb-3">
                        Contact Me
                    </h2>

                    {/* Social Links */}
                    <div className="flex flex-wrap items-center text-center justify-center mb-7 gap-2">
                        <a href="https://www.linkedin.com/in/vincent-huu-nguyen/"
                            target="_blank"
                            className="bg-[#f0f0f0] p-2 font-semibold text-white inline-flex items-center space-x-2 rounded-full hover:scale-110 duration-200">
                            {/* LinkedIn Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                        </a>

                        <a href="https://github.com/vincent-huu-nguyen"
                            target="_blank"
                            className="bg-[#f0f0f0] p-2 font-semibold text-white inline-flex items-center space-x-2 rounded-full hover:scale-110 duration-200">
                            {/* GitHub Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                        </a>

                        <a href="https://github.com/vincent-huu-nguyen"
                            target="_blank"
                            className="bg-[#f0f0f0] p-2 font-semibold text-white inline-flex items-center space-x-2 rounded-full hover:scale-110 duration-200">
                            {/* Resume Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" viewBox="0 0 24 24"><path d="M11.362 2c4.156 0 2.638 6 2.638 6s6-1.65 6 2.457v11.543h-16v-20h7.362zm.827-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-10v-1h10v1zm0 2h-10v1h10v-1zm0 3h-10v1h10v-1z" /></svg>
                        </a>
                    </div>

                    {/* Email Form */}
                    <form ref={form} onSubmit={sendEmail} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-[#f7f8f8] mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="user_name"
                                required
                                className="w-full p-3 rounded-lg bg-[#0b0b0b] border border-gray-300 text-[#f7f8f8]"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#f7f8f8] mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="user_email"
                                required
                                className="w-full p-3 rounded-lg bg-[#0b0b0b] border border-gray-300 text-[#f7f8f8]"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-[#f7f8f8] mb-1">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                required
                                className="w-full p-3 rounded-lg bg-[#0b0b0b] border border-gray-300 text-[#f7f8f8]"
                            ></textarea>
                        </div>
                        <button
                            onMouseEnter={playHover}
                            onClick={playClick}
                            type="submit"
                            className="w-full bg-gradient-to-r from-green-500 via-indigo-500 to-purple-500 text-white font-bold py-2 px-4 rounded hover:scale-105 transition"
                        >
                            Send
                        </button>
                    </form>

                    {(isSending || sentMessageVisible) && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 text-white font-bold text-xl px-6 py-4 rounded-md shadow-lg z-50">
                            {isSending ? "Sending..." : "✅ Message sent successfully!"}
                        </div>
                    )}

                    <div className="flex justify-center mt-6">
                        <button
                            onMouseEnter={playHover}
                            onClick={handleBackClick}
                            className="w-40 h-12 text-white border-2 border-white rounded transition duration-500 hover:scale-110"
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
