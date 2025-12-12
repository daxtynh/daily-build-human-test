"use client";

import { useState, useEffect } from "react";

interface Props {
  onComplete: (score: number, details: string) => void;
}

export default function MemoryChallenge({ onComplete }: Props) {
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [phase, setPhase] = useState<"showing" | "input">("showing");
  const [showingIndex, setShowingIndex] = useState(-1);
  const [highlightedTile, setHighlightedTile] = useState<number | null>(null);

  useEffect(() => {
    const newSequence = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 9)
    );
    setSequence(newSequence);

    let index = 0;
    const interval = setInterval(() => {
      if (index < newSequence.length) {
        setShowingIndex(index);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setPhase("input");
          setShowingIndex(-1);
        }, 500);
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const handleTileClick = (tileIndex: number) => {
    if (phase !== "input") return;

    setHighlightedTile(tileIndex);
    setTimeout(() => setHighlightedTile(null), 150);

    const newUserSequence = [...userSequence, tileIndex];
    setUserSequence(newUserSequence);

    if (newUserSequence.length >= sequence.length) {
      let correct = 0;
      for (let i = 0; i < sequence.length; i++) {
        if (newUserSequence[i] === sequence[i]) correct++;
      }

      const accuracy = (correct / sequence.length) * 100;
      const humanityScore = Math.round(100 - accuracy * 0.5);

      let details = "";
      if (correct === sequence.length) {
        details = "Perfect recall! Photographic memory or lucky guess?";
      } else if (correct >= sequence.length - 1) {
        details = "Almost perfect! One tiny slip.";
      } else if (correct >= sequence.length - 2) {
        details = "Pretty good! A couple mix-ups.";
      } else {
        details = "Beautifully forgetful. Very human.";
      }

      onComplete(humanityScore, details);
    }
  };

  const getTileColor = (index: number) => {
    if (phase === "showing" && sequence[showingIndex] === index) {
      return "bg-yellow-400 scale-110";
    }
    if (highlightedTile === index) {
      return "bg-blue-400 scale-105";
    }
    return "bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600";
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-center text-zinc-600 dark:text-zinc-400">
        {phase === "showing"
          ? "Watch the sequence..."
          : "Now repeat the pattern!"}
      </p>

      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <button
            key={i}
            onClick={() => handleTileClick(i)}
            disabled={phase === "showing"}
            className={"w-20 h-20 rounded-xl transition-all duration-150 " + getTileColor(i) + (phase === "input" ? " cursor-pointer" : " cursor-default")}
          />
        ))}
      </div>

      {phase === "input" && (
        <p className="text-sm text-zinc-500">
          {userSequence.length} / {sequence.length} tiles
        </p>
      )}
    </div>
  );
}
