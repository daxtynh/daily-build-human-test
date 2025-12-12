"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Props {
  onComplete: (score: number, details: string) => void;
}

export default function ClickChallenge({ onComplete }: Props) {
  const TARGET_CLICKS = 10;
  const [clicks, setClicks] = useState(0);
  const [intervals, setIntervals] = useState<number[]>([]);
  const lastClickRef = useRef<number | null>(null);

  const handleClick = useCallback(() => {
    const now = Date.now();

    if (lastClickRef.current !== null) {
      setIntervals(prev => [...prev, now - lastClickRef.current!]);
    }
    lastClickRef.current = now;

    setClicks(prev => prev + 1);
  }, []);

  useEffect(() => {
    if (clicks >= TARGET_CLICKS && intervals.length >= TARGET_CLICKS - 1) {
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const variance = intervals.reduce((sum, int) => sum + Math.pow(int - avgInterval, 2), 0) / intervals.length;
      const stdDev = Math.sqrt(variance);

      const coeffOfVariation = (stdDev / avgInterval) * 100;

      const humanityScore = Math.min(100, Math.round(coeffOfVariation * 2));

      let details = "";
      if (coeffOfVariation < 5) {
        details = "Machine-like precision. Are you a metronome?";
      } else if (coeffOfVariation < 15) {
        details = "Pretty consistent. Almost too consistent...";
      } else if (coeffOfVariation < 30) {
        details = "Nice human rhythm! Perfectly imperfect.";
      } else {
        details = "Wonderfully chaotic clicking pattern!";
      }

      onComplete(humanityScore, details);
    }
  }, [clicks, intervals, onComplete]);

  const progress = (clicks / TARGET_CLICKS) * 100;

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-center text-zinc-600 dark:text-zinc-400">
        Click exactly {TARGET_CLICKS} times. Try to keep a steady rhythm.
      </p>

      <button
        onClick={handleClick}
        disabled={clicks >= TARGET_CLICKS}
        className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-6xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {clicks}
      </button>

      <div className="w-64 h-3 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-100"
          style={{ width: progress + "%" }}
        />
      </div>

      <p className="text-sm text-zinc-500">
        {TARGET_CLICKS - clicks} clicks remaining
      </p>
    </div>
  );
}
