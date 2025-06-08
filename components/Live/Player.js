"use client";

import { useState, useRef, useEffect } from "react";

export default function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (audio.paused) {
            audio.play();
            setIsPlaying(true);
        } else {
            audio.pause();
            setIsPlaying(false);
        }
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.5;
        }
    }, []);

    return (
        <div>
            {/* Hidden audio element */}
            <audio ref={audioRef} loop>
                <source
                    src="https://dc4.serverse.com/proxy/pearlfm/stream"
                    type="audio/mpeg"
                />
            </audio>

            {/* Live region for screen readers */}
            <div aria-live="polite" className="sr-only">
                {isPlaying ? "Radio is playing" : "Radio is paused"}
            </div>

            {/* Floating Button - Bottom Left */}
            <div className="fixed bottom-4 left-4 z-50">
                <div className="relative group">
                    {/* Tooltip (large screens only) */}
                    <div
                        className="
              hidden lg:flex 
              absolute -top-11 left-1/2 -translate-x-1/2 
              bg-black/90 text-white text-sm font-bold uppercase 
              whitespace-nowrap px-4 py-1 rounded-md shadow-lg
              opacity-0 group-hover:opacity-100 transition-opacity duration-200
              pointer-events-none select-none
            "
                    >
                        {isPlaying ? "PAUSE RADIO" : "PLAY RADIO"}
                        {/* Arrow below tooltip */}
                        <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-black rotate-45 shadow-md" />
                    </div>

                    <button
                        onClick={togglePlayPause}
                        aria-label={isPlaying ? "Pause Radio" : "Play Radio"}
                        aria-pressed={isPlaying}
                        title={isPlaying ? "Pause Radio" : "Play Radio"}
                        className="
              min-w-[44px] min-h-[44px] px-4 py-2 
              bg-[#ff7d1c]
              text-white rounded-full shadow-xl
              flex items-center gap-2 
              hover:scale-105 transition-transform
              focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#ff7d1c]
              text-xs sm:text-sm md:text-base
              font-bold uppercase tracking-wide select-none
            "
                    >
                        {/* Play/Pause Icon */}
                        {isPlaying ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 sm:w-5 sm:h-5"
                                fill="white"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <rect x="6" y="5" width="4" height="14" rx="1" />
                                <rect x="14" y="5" width="4" height="14" rx="1" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 sm:w-5 sm:h-5"
                                fill="white"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        )}

                        {/* Live Ping Dot with fade-in */}
                        {isPlaying && (
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-ping transition-opacity duration-500" />
                        )}

                        {/* Responsive Label */}
                        <span className="sm:hidden">Radio</span>
                        <span className="hidden sm:inline">Listen Live</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
