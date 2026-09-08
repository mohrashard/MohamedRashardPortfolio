"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Sparkles, X, Loader2, Volume2, VolumeX, Maximize } from 'lucide-react';

export default function VideoPlayer({ src }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [showControls, setShowControls] = useState(false);
    
    // Transcript states
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [showTranscript, setShowTranscript] = useState(false);
    
    const videoRef = useRef(null);
    const containerRef = useRef(null);

    // Prevent default controls from showing
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.controls = false;
        }
    }, []);

    const togglePlay = (e) => {
        if (e) e.stopPropagation();
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        setCurrentTime(videoRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        setDuration(videoRef.current.duration);
    };

    const handleSeek = (e) => {
        const time = parseFloat(e.target.value);
        setCurrentTime(time);
        videoRef.current.currentTime = time;
    };

    const toggleMute = (e) => {
        if (e) e.stopPropagation();
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    const toggleFullscreen = (e) => {
        if (e) e.stopPropagation();
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    const handleTranscribe = (e) => {
        e.stopPropagation();
        if (showTranscript) {
            setShowTranscript(false);
            return;
        }
        setIsTranscribing(true);
        // Mock 1.5s loading
        setTimeout(() => {
            setIsTranscribing(false);
            setShowTranscript(true);
        }, 1500);
    };

    const formatTime = (timeInSeconds) => {
        if (isNaN(timeInSeconds)) return "0:00";
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div 
            ref={containerRef}
            className="w-full h-full relative group/video cursor-pointer rounded-2xl overflow-hidden bg-black" 
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
        >
            <video 
                ref={videoRef}
                className="w-full h-auto aspect-[4/3] relative z-0 bg-black"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                onClick={togglePlay}
                playsInline
            >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Big Initial Play Overlay */}
            {!isPlaying && currentTime === 0 && (
                <div 
                    className="absolute inset-0 z-20 flex items-center justify-center bg-[#050505]/30 backdrop-blur-[2px] transition-all duration-500 group-hover/video:bg-[#050505]/50 group-hover/video:backdrop-blur-[4px]"
                    onClick={togglePlay}
                >
                    {/* Glowing Play Button Wrapper */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-[var(--primary)] rounded-full blur-[40px] opacity-40 group-hover/video:opacity-70 transition-opacity duration-500"></div>
                        <div className="relative w-24 h-24 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center transform transition-all duration-500 group-hover/video:scale-110 group-hover/video:border-[var(--primary)]/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]">
                            <Play className="w-10 h-10 ml-1.5 text-white fill-white drop-shadow-md transition-transform duration-500 group-hover/video:scale-110" />
                        </div>
                    </div>
                </div>
            )}

            {/* AI Transcript Panel (Sleek Sidebar Style) */}
            <div 
                className={`absolute top-0 right-0 bottom-0 w-full sm:w-[300px] md:w-[340px] bg-[#050505]/60 backdrop-blur-2xl border-l border-white/[0.05] shadow-[-30px_0_50px_rgba(0,0,0,0.5)] transition-all duration-500 z-40 flex flex-col ${showTranscript ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-8 pointer-events-none'}`} 
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.05] bg-[#050505]/40">
                    <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-[var(--primary)]/10 flex items-center justify-center border border-[var(--primary)]/20 shadow-md border border-white/5">
                            <Sparkles className="w-3.5 h-3.5 text-[var(--primary)]" />
                        </div>
                        <span className="text-white text-[11px] font-bold tracking-[0.2em] uppercase">Transcript</span>
                    </div>
                    <button onClick={() => setShowTranscript(false)} className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors border border-white/5" aria-label="Close transcript">
                        <X className="w-3.5 h-3.5" />
                    </button>
                </div>
                
                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 py-6 relative [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full">
                    <div className="text-zinc-400 text-[13px] leading-[1.8] font-['Inter',sans-serif] space-y-4 pb-24">
                        <p className="text-zinc-200 font-medium">Hi guys, first of all I just want to thank Mr. Mohamed Rashard, also known as Mr² Labs, for delivering our app on time.</p>
                        <p>And I just want to mention that he actually underpromised and overdelivered. I am just satisfied with the UI, UX, and AI-powered integrations and smoothness throughout the app. And working with him was very smooth, it was very on time, and quite affordable as well.</p>
                        <p>So I just want to thank him again, and if you want to work or if you want to build an app or website, you just want to contact Mr² Labs. He will take care of everything. So guys, just give it a try.</p>
                    </div>
                </div>
                
                {/* Bottom Gradient Fade to seamlessly blend text scrolling */}
                <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#050505]/90 via-[#050505]/50 to-transparent pointer-events-none"></div>
            </div>

            {/* Custom Control Bar */}
            <div 
                className={`absolute bottom-0 left-0 right-0 z-30 transition-opacity duration-300 ${((isPlaying && showControls) || (!isPlaying && currentTime > 0) || isTranscribing || showTranscript) ? 'opacity-100' : 'opacity-0'}`}
                onClick={(e) => e.stopPropagation()} 
            >
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none"></div>
                
                <div className="relative flex flex-col justify-end p-5 pt-8 gap-3">
                    
                    {/* Progress Bar Track */}
                    <div className="w-full flex items-center group/progress h-5 cursor-pointer">
                        <input 
                            type="range" 
                            min="0" 
                            max={duration || 100} 
                            value={currentTime} 
                            onChange={handleSeek}
                            className="w-full h-[3px] bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:scale-0 group-hover/progress:[&::-webkit-slider-thumb]:scale-100 [&::-webkit-slider-thumb]:transition-transform hover:h-1.5 transition-all"
                            style={{
                                background: `linear-gradient(to right, var(--primary) ${progressPercentage}%, rgba(255, 255, 255, 0.2) ${progressPercentage}%)`
                            }}
                        />
                    </div>
                    
                    {/* Controls Row */}
                    <div className="flex items-center justify-between text-white">
                        <div className="flex items-center gap-5">
                            <button onClick={togglePlay} className="hover:text-[var(--primary)] transition-colors w-6 h-6 flex items-center justify-center" aria-label={isPlaying ? "Pause" : "Play"}>
                                {isPlaying ? (
                                    <Pause className="w-5 h-5 fill-current" />
                                ) : (
                                    <Play className="w-5 h-5 fill-current ml-0.5" />
                                )}
                            </button>
                            
                            <div className="text-sm font-medium tracking-wide tabular-nums font-['Inter',sans-serif] opacity-90">
                                {formatTime(currentTime)} <span className="opacity-50 mx-1">/</span> {formatTime(duration)}
                            </div>
                        </div>

                        <div className="flex items-center gap-5">
                            {/* AI Transcribe Button */}
                            <button onClick={handleTranscribe} className="hover:text-[var(--primary)] transition-colors w-6 h-6 flex items-center justify-center relative group/cc" title="AI Transcribe" aria-label="AI Transcribe">
                                {isTranscribing ? (
                                    <Loader2 className="w-4 h-4 animate-spin text-[var(--primary)]" />
                                ) : (
                                    <Sparkles className={`w-4 h-4 ${showTranscript ? 'text-[var(--primary)]' : ''}`} />
                                )}
                            </button>

                            <button onClick={toggleMute} className="hover:text-[var(--primary)] transition-colors w-6 h-6 flex items-center justify-center" aria-label={isMuted ? "Unmute" : "Mute"}>
                                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                            </button>
                            
                            <button onClick={toggleFullscreen} className="hover:text-[var(--primary)] transition-colors w-6 h-6 flex items-center justify-center" aria-label="Fullscreen">
                                <Maximize className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
