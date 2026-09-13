"use client";

import React, { useEffect, useState } from "react";
import NumberFlow from "@number-flow/react";
import Style from "./CountDown.module.css"

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface EventCountdownProps {
  /** Target date as an ISO string, date string (e.g., "2026-09-26T00:00:00"), or Date object */
  targetDate: string | Date;
  /** Optional title label displayed above the countdown */
  label?: string;
  /** Visual theme: 'default' (plain) or 'bubble' (ocean glass style) */
  variant?: "default" | "bubble";
}

function calculateTimeLeft(targetDate: string | Date): TimeRemaining {
  const targetTime = new Date(targetDate).getTime();
  const now = new Date().getTime();
  const difference = targetTime - now;

  if (isNaN(targetTime) || difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function EventCountdown({
  targetDate,
  label,
  variant = "default",
}: EventCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(() =>
    calculateTimeLeft(targetDate)
  );

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(targetDate));

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const isBubble = variant === "bubble";

  // Dynamic class sets based on variant
  const labelStyles = isBubble
    ? "text-xs tracking-widest text-cyan-600 uppercase font-semibold"
    : "text-xs tracking-widest text-neutral-400 uppercase font-medium";

  const separatorStyles = isBubble
    ? "text-2xl sm:text-4xl text-cyan-400 font-bold pb-2 drop-shadow-[0_2px_4px_rgba(0,168,232,0.3)]"
    : "text-neutral-300 pb-5";

  const itemContainerStyles = isBubble
    ? "relative flex flex-col items-center justify-center w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-b from-cyan-200/40 via-sky-300/30 to-blue-500/30 backdrop-blur-md border border-white/60 shadow-[0_8px_32px_0_rgba(0,168,232,0.25),inset_0_4px_12px_rgba(255,255,255,0.8),inset_0_-4px_8px_rgba(14,165,233,0.3)] transition-transform duration-300 hover:scale-105"
    : "flex flex-col items-center";

  const numberStyles = isBubble
    ? "text-2xl sm:text-4xl z-10 font-extrabold text-sky-900 drop-shadow-sm"
    : "text-4xl sm:text-6xl font-bold tracking-tight text-neutral-900";

  const unitLabelStyles = isBubble
    ? "text-[10px] sm:text-xs text-sky-700 font-semibold uppercase tracking-wider mt-0.5 z-10"
    : "text-xs text-neutral-400 font-normal uppercase tracking-wider mt-1";

  return (
    <div className={`${Style.timerContainer} flex flex-col items-center justify-center gap-6 font-sans py-6`}>
      {label && <span className={labelStyles}>{label}</span>}

      <div className={`flex items-center gap-3 ${isBubble ? "sm:gap-4 font-bold text-sky-950" : ""}`}>
        {/* DAYS */}
        <div className={itemContainerStyles}>
          {isBubble && (
            <div className="absolute top-2 left-4 w-5 h-2 sm:w-7 sm:h-3 rounded-full bg-white/70 blur-[0.5px] rotate-[-25deg] pointer-events-none" />
          )}
          <div className={numberStyles}>
            <NumberFlow value={timeLeft.days} format={{ minimumIntegerDigits: 2 }} />
          </div>
          <span className={unitLabelStyles}>Days</span>
        </div>

        <span className={separatorStyles}>:</span>

        {/* HOURS */}
        <div className={itemContainerStyles}>
          {isBubble && (
            <div className="absolute top-2 left-4 w-5 h-2 sm:w-7 sm:h-3 rounded-full bg-white/70 blur-[0.5px] rotate-[-25deg] pointer-events-none" />
          )}
          <div className={numberStyles}>
            <NumberFlow value={timeLeft.hours} format={{ minimumIntegerDigits: 2 }} />
          </div>
          <span className={unitLabelStyles}>Hours</span>
        </div>

        <span className={separatorStyles}>:</span>

        {/* MINUTES */}
        <div className={itemContainerStyles}>
          {isBubble && (
            <div className="absolute top-2 left-4 w-5 h-2 sm:w-7 sm:h-3 rounded-full bg-white/70 blur-[0.5px] rotate-[-25deg] pointer-events-none" />
          )}
          <div className={numberStyles}>
            <NumberFlow value={timeLeft.minutes} format={{ minimumIntegerDigits: 2 }} />
          </div>
          <span className={unitLabelStyles}>Mins</span>
        </div>

        <span className={separatorStyles}>:</span>

        {/* SECONDS */}
        <div className={itemContainerStyles}>
          {isBubble && (
            <div className="absolute top-2 left-4 w-5 h-2 sm:w-7 sm:h-3 rounded-full bg-white/70 blur-[0.5px] rotate-[-25deg] pointer-events-none" />
          )}
          <div className={numberStyles}>
            <NumberFlow value={timeLeft.seconds} format={{ minimumIntegerDigits: 2 }} />
          </div>
          <span className={unitLabelStyles}>Secs</span>
        </div>
      </div>
    </div>
  );
}