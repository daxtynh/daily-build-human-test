"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Props {
  onComplete: (score: number, details: string) => void;
}

export default function ReactionChallenge({ onComplete }: Props) {
  const [phase, setPhase] = useState<"waiting" | "ready" | "go" | "clicked" | "early">("waiting");
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const goTimeRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startWaiting = useCallback(() => {
    setPhase("ready");
    const delay = 2000 + Math.random() * 3000;

    timeoutRef.current = setTimeout(() => {
      goTimeRef.current = Date.now();
      setPhase("go");
    }, delay);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(startWaiting, 1000);
    return () => {
      clearTimeout(timeout);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [startWaiting]);

  const handleClick = () => {
    if (phase === "waiting") {
      return;
    }

    if (phase === "ready") {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setPhase("early");
      setTimeout(() => {
        setPhase("waiting");
        setTimeout(startWaiting, 500);
      }, 1500);
      return;
    }

    if (phase === "go") {
      const time = Date.now() - goTimeRef.current;
      setReactionTime(time);
      setPhase("clicked");

      let humanityScore: number;
      let details: string;

      if (time < 150) {
        humanityScore = 20;
        details = "Impossibly fast! Are you a bot?";
      } else if (time < 200) {
        humanityScore = 40;
        details = "Lightning reflexes! Suspiciously quick.";
      } else if (time < 300) {
        humanityScore = 70;
        details = "Great reaction time! Very human range.";
      } else if (time < 500) {
        humanityScore = 90;
        details = "Solid human reflexes. Nothing robotic here.";
      } else {
        humanityScore = 100;
        details = "Relaxed response. Definitely not a machine.";
      }

      onComplete(humanityScore, details);
    }
  };

  const getBackgroundColor = () => {
    switch (phase) {
      case "waiting":
        return "bg-zinc-200 dark:bg-zinc-800";
      case "ready":
        return "bg-red-500";
      case "go":
        return "bg-green-500";
      case "early":
        return "bg-orange-500";
      case "clicked":
        return "bg-blue-500";
    }
  };

  const getMessage = () => {
    switch (phase) {
      case "waiting":
        return "Get ready...";
      case "ready":
        return "Wait for green...";
      case "go":
        return "CLICK NOW!";
      case "early":
        return "Too early! Wait for green.";
      case "clicked":
        return reactionTime + "ms";
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-center text-zinc-600 dark:text-zinc-400">
        Click as fast as you can when the box turns green.
      </p>

      <button
        onClick={handleClick}
        className={"w-64 h-64 rounded-2xl flex items-center justify-center text-white text-2xl font-bold transition-colors " + getBackgroundColor()}
      >
        {getMessage()}
      </button>

      <p className="text-sm text-zinc-500">
        {phase === "ready" ? "Don't click yet!" : phase === "waiting" ? "Starting soon..." : ""}
      </p>
    </div>
  );
}
