"use client";

import { useMemo } from "react";

interface ChallengeResult {
  name: string;
  score: number;
  details: string;
}

interface Props {
  results: ChallengeResult[];
  onRestart: () => void;
}

export default function Results({ results, onRestart }: Props) {
  const overallScore = useMemo(() => {
    const total = results.reduce((sum, r) => sum + r.score, 0);
    return Math.round(total / results.length);
  }, [results]);

  const getVerdict = (score: number): { title: string; description: string; emoji: string } => {
    if (score >= 80) {
      return {
        title: "Certified Human",
        description: "Your beautiful imperfections prove you're gloriously, wonderfully human.",
        emoji: "heart",
      };
    } else if (score >= 60) {
      return {
        title: "Probably Human",
        description: "You've got some suspiciously good skills, but we'll give you the benefit of the doubt.",
        emoji: "thinking",
      };
    } else if (score >= 40) {
      return {
        title: "Suspiciously Perfect",
        description: "Your precision is... concerning. Are you sure you're not running on batteries?",
        emoji: "robot",
      };
    } else {
      return {
        title: "Beep Boop?",
        description: "Your inhuman perfection has been noted. The resistance is watching.",
        emoji: "warning",
      };
    }
  };

  const verdict = getVerdict(overallScore);

  const getShareText = () => {
    const text = "I scored " + overallScore + "% on The Human Test! " + verdict.title + " - Prove you're gloriously imperfect too:";
    return encodeURIComponent(text);
  };

  const shareUrl = typeof window !== "undefined" ? encodeURIComponent(window.location.href) : "";

  return (
    <div className="flex flex-col items-center gap-8 max-w-md mx-auto">
      <div className="text-center">
        <div className="text-8xl mb-4">
          {verdict.emoji === "heart" && "❤️"}
          {verdict.emoji === "thinking" && "🤔"}
          {verdict.emoji === "robot" && "🤖"}
          {verdict.emoji === "warning" && "⚠️"}
        </div>
        <h2 className="text-3xl font-bold mb-2">{verdict.title}</h2>
        <p className="text-zinc-600 dark:text-zinc-400">{verdict.description}</p>
      </div>

      <div className="relative w-48 h-48">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
            className="text-zinc-200 dark:text-zinc-700"
          />
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 88}
            strokeDashoffset={2 * Math.PI * 88 * (1 - overallScore / 100)}
            className="text-blue-500 transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-4xl font-bold">{overallScore}%</span>
            <p className="text-sm text-zinc-500">Human</p>
          </div>
        </div>
      </div>

      <div className="w-full space-y-3">
        <h3 className="font-semibold text-lg">Your Results</h3>
        {results.map((result, index) => (
          <div
            key={index}
            className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium">{result.name}</span>
              <span className={"font-bold " + (result.score >= 60 ? "text-emerald-500" : result.score >= 30 ? "text-yellow-500" : "text-red-500")}>
                {result.score}%
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {result.details}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 w-full">
        <a
          href={"https://twitter.com/intent/tweet?text=" + getShareText() + "&url=" + shareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 p-3 bg-black text-white rounded-xl font-medium hover:bg-zinc-800 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Share on X
        </a>

        <button
          onClick={onRestart}
          className="p-3 border-2 border-zinc-200 dark:border-zinc-700 rounded-xl font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          Take the Test Again
        </button>
      </div>

      <p className="text-center text-xs text-zinc-400 dark:text-zinc-600">
        In a world of perfect AI, celebrate your beautiful imperfections.
      </p>
    </div>
  );
}
