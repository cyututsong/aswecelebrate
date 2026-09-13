"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface MusicPlayerProps {
  /** Path or URL to the audio file */
  audioSrc: string;
  /** Song title */
  title?: string;
  /** Artist or subtitle name */
  subtitle?: string;
  /** Auto play music when component mounts or on initial user interaction */
  autoPlay?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  audioSrc,
  title = "Background Music",
  subtitle = "Celebration Theme",
  autoPlay = true,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (!autoPlay || !audioRef.current) return;

    const playAudio = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            removeInteractionListeners();
          })
          .catch(() => {
            // Autoplay blocked; waiting for user gesture
          });
      }
    };

    const removeInteractionListeners = () => {
      window.removeEventListener("click", playAudio);
      window.removeEventListener("touchstart", playAudio);
      window.removeEventListener("scroll", playAudio);
      window.removeEventListener("keydown", playAudio);
    };

    // 1. Try playing immediately on load
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        // 2. If blocked by browser, attach global event listeners for first interaction
        window.addEventListener("click", playAudio, { once: true });
        window.addEventListener("touchstart", playAudio, { once: true });
        window.addEventListener("scroll", playAudio, { once: true });
        window.addEventListener("keydown", playAudio, { once: true });
      });

    return () => {
      removeInteractionListeners();
    };
  }, [autoPlay, audioSrc]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true));
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-background/80 backdrop-blur-md border border-border/50 p-2 pr-3 rounded-full shadow-lg w-full max-w-[200px]">
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        loop
      />

      {/* Play/Pause Trigger Button */}
      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={togglePlay}
        className="relative flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground shadow-md transition-colors"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="pause"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
            >
              <Pause className="h-4 w-4 fill-current" />
            </motion.div>
          ) : (
            <motion.div
              key="play"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
            >
              <Play className="h-4 w-4 fill-current ml-0.5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Track Information & Progress bar */}
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-[11px] font-semibold truncate leading-tight text-foreground">
          {title}
        </span>
        <span className="text-[9px] text-muted-foreground truncate leading-tight">
          {subtitle}
        </span>
        <div className="w-full bg-secondary h-1 rounded-full mt-1 overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Mute/Unmute Toggle */}
      <button
        onClick={toggleMute}
        className="flex-shrink-0 p-1 text-muted-foreground hover:text-foreground transition-colors"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <VolumeX className="h-3.5 w-3.5" />
        ) : (
          <Volume2 className="h-3.5 w-3.5" />
        )}
      </button>
    </div>
  );
};