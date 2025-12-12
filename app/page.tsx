"use client";

import { useState, useCallback } from "react";
import CircleChallenge from "./components/CircleChallenge";
import TypingChallenge from "./components/TypingChallenge";
import ClickChallenge from "./components/ClickChallenge";
import MemoryChallenge from "./components/MemoryChallenge";
import ReactionChallenge from "./components/ReactionChallenge";
import LineChallenge from "./components/LineChallenge";
import Results from "./components/Results";

interface ChallengeResult {
  name: string;
  score: number;
  details: string;
}

const CHALLENGES = [
  { id: "circle", name: "Circle Drawing", component: CircleChallenge },
  { id: "typing", name: "Typing Test", component: TypingChallenge },
  { id: "clicking", name: "Rhythm Test", component: ClickChallenge },
  { id: "memory", name: "Memory Test", component: MemoryChallenge },
  { id: "reaction", name: "Reaction Test", component: ReactionChallenge },
  { id: "line", name: "Straight Line", component: LineChallenge },
];

export default function Home() {
  const [phase, setPhase] = useState<"intro" | "testing" | "results">("intro");
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [results, setResults] = useState<ChallengeResult[]>([]);

  const handleStart = () => {
    setPhase("testing");
    setCurrentChallenge(0);
    setResults([]);
  };

  const handleChallengeComplete = useCallback(
    (score: number, details: string) => {
      const challenge = CHALLENGES[currentChallenge];
      const newResult: ChallengeResult = {
        name: challenge.name,
        score,
        details,
      };

      setResults((prev) => [...prev, newResult]);

      setTimeout(() => {
        if (currentChallenge < CHALLENGES.length - 1) {
          setCurrentChallenge((prev) => prev + 1);
        } else {
          setPhase("results");
        }
      }, 1500);
    },
    [currentChallenge]
  );

  const handleRestart = () => {
    setPhase("intro");
    setCurrentChallenge(0);
    setResults([]);
  };

  const CurrentChallengeComponent = CHALLENGES[currentChallenge]?.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-black">
      <main className="container mx-auto px-4 py-12 max-w-2xl">
        {phase === "intro" && (
          <div className="flex flex-col items-center gap-8 text-center">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                The Human Test
              </h1>
              <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-md">
                In a world of perfect AI, prove you&apos;re gloriously, imperfectly human.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-sm text-left">
              <div className="p-4 bg-white dark:bg-zinc-800 rounded-xl shadow-sm">
                <div className="text-2xl mb-1">✏️</div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Draw wobbly shapes</p>
              </div>
              <div className="p-4 bg-white dark:bg-zinc-800 rounded-xl shadow-sm">
                <div className="text-2xl mb-1">⌨️</div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Make typos</p>
              </div>
              <div className="p-4 bg-white dark:bg-zinc-800 rounded-xl shadow-sm">
                <div className="text-2xl mb-1">🧠</div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Forget things</p>
              </div>
              <div className="p-4 bg-white dark:bg-zinc-800 rounded-xl shadow-sm">
                <div className="text-2xl mb-1">⏱️</div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">React imperfectly</p>
              </div>
            </div>

            <button
              onClick={handleStart}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all"
            >
              Prove Your Humanity
            </button>

            <p className="text-sm text-zinc-500">
              6 quick challenges - ~2 minutes
            </p>
          </div>
        )}

        {phase === "testing" && CurrentChallengeComponent && (
          <div className="flex flex-col items-center gap-8">
            <div className="w-full">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-zinc-500">
                  Challenge {currentChallenge + 1} of {CHALLENGES.length}
                </span>
                <span className="text-sm font-medium">
                  {CHALLENGES[currentChallenge].name}
                </span>
              </div>
              <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                  style={{
                    width: ((currentChallenge + 1) / CHALLENGES.length) * 100 + "%",
                  }}
                />
              </div>
            </div>

            <div className="w-full p-6 bg-white dark:bg-zinc-800 rounded-2xl shadow-sm">
              <CurrentChallengeComponent
                key={currentChallenge}
                onComplete={handleChallengeComplete}
              />
            </div>
          </div>
        )}

        {phase === "results" && (
          <Results results={results} onRestart={handleRestart} />
        )}
      </main>

      <footer className="fixed bottom-4 left-0 right-0 text-center text-xs text-zinc-400">
        Made with imperfect human hands
      </footer>
    </div>
  );
}
