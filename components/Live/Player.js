"use client";

import { useState, useRef, useEffect } from "react";

const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef(null);

    // Play/Pause toggle function
    const togglePlayPause = () => {
        const audioElement = audioRef.current;
        if (audioElement) {
            if (audioElement.paused) {
                audioElement.play();
                setIsPlaying(true);
            } else {
                audioElement.pause();
                setIsPlaying(false);
            }
        }
    };

    // Volume change handler
    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    // Update current time based on audio playback
    const updateCurrentTime = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    // Handle seekbar interaction
    const handleSeek = (e) => {
        const seekTo = (e.target.value / 100) * audioRef.current.duration;

        if (audioRef.current && isFinite(seekTo)) {
            audioRef.current.currentTime = seekTo;
        }
    };

    // Set up time update listener on mount, and clean up on unmount
    useEffect(() => {
        const audioElement = audioRef.current;

        if (audioElement) {
            audioElement.addEventListener("timeupdate", updateCurrentTime);
            return () => {
                audioElement.removeEventListener("timeupdate", updateCurrentTime);
            };
        }
    }, []);

    // Return the JSX for the player
    return (
        <div className="audio-player fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#ff7e1c] to-[#030268] p-4 rounded-full shadow-lg w-72 sm:w-80 md:w-96 z-50 flex items-center justify-between">
            {/* Audio element */}
            <audio ref={audioRef} loop>
                <source
                    src="https://dc4.serverse.com/proxy/pearlfm/stream"
                    type="audio/mpeg"
                />
                Your browser does not support the audio element.
            </audio>

            {/* Play/Pause Button */}
            <button
                onClick={togglePlayPause}
                className="text-white text-lg sm:text-xl font-semibold py-2 px-3 bg-[#030268] hover:bg-[#ff7e1c] rounded-full transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#ff7e1c] focus:ring-opacity-50"
                aria-label={isPlaying ? "Pause" : "Play"}
            >
                {isPlaying ? "Pause" : "Play"}
            </button>

            {/* Progress Bar */}
            <div className="flex-1 mx-4">
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={(currentTime / (audioRef.current?.duration || 1)) * 100 || 0}
                    onChange={handleSeek}
                    className="w-full bg-[#ff7e1c] rounded-full h-1 mt-1 focus:outline-none"
                />
            </div>

            {/* Volume Control */}
            <div className="flex items-center">
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-12 sm:w-16 mt-1 bg-[#ff7e1c] rounded-full focus:outline-none"
                />
            </div>
        </div>
    );
};

export default AudioPlayer;
