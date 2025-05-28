"use client";

import { useState, useRef, useEffect } from "react";

export default function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [currentTime, setCurrentTime] = useState(0);
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

    const handleVolumeChange = (e) => {
        const vol = parseFloat(e.target.value);
        setVolume(vol);
        if (audioRef.current) audioRef.current.volume = vol;
    };

    const handleSeek = (e) => {
        if (!audioRef.current) return;
        const seekTo = (e.target.value / 100) * audioRef.current.duration;
        if (isFinite(seekTo)) audioRef.current.currentTime = seekTo;
    };

    const updateCurrentTime = () => {
        if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.volume = volume;
        audio.addEventListener("timeupdate", updateCurrentTime);
        return () => audio.removeEventListener("timeupdate", updateCurrentTime);
    }, []);

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-md px-3">
            <div className="bg-gradient-to-r from-[#ff7e1c] to-[#030268] rounded-full shadow-lg px-4 py-2 flex items-center gap-3">
                <audio ref={audioRef} loop>
                    <source
                        src="https://dc4.serverse.com/proxy/pearlfm/stream"
                        type="audio/mpeg"
                    />
                </audio>

                {/* Now Playing label */}
                <span className="text-white text-xs sm:text-sm font-medium hidden xs:block">
                    {isPlaying ? "Now Playing" : "Paused"}
                </span>

                {/* Play/Pause Button */}
                <button
                    onClick={togglePlayPause}
                    aria-label={isPlaying ? "Pause" : "Play"}
                    className="text-white hover:scale-110 transition-transform"
                >
                    {isPlaying ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 sm:w-6 sm:h-6"
                            fill="white"
                            viewBox="0 0 24 24"
                        >
                            <rect x="6" y="5" width="4" height="14" rx="1" />
                            <rect x="14" y="5" width="4" height="14" rx="1" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 sm:w-6 sm:h-6"
                            fill="white"
                            viewBox="0 0 24 24"
                        >
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    )}
                </button>

                {/* Progress */}
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={(currentTime / (audioRef.current?.duration || 1)) * 100 || 0}
                    onChange={handleSeek}
                    className="flex-1 h-1 accent-white cursor-pointer"
                />

                {/* Volume */}
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-14 h-1 accent-white cursor-pointer hidden sm:block"
                />
            </div>
        </div>
    );
}
