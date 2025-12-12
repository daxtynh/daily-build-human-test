"use client";

import { useState, useEffect, useRef } from "react";

interface Props {
  onComplete: (score: number, details: string) => void;
}

const SENTENCES = [
  "The quick brown fox jumps over the lazy dog",
  "Pack my box with five dozen liquor jugs",
  "How vexingly quick daft zebras jump",
  "The five boxing wizards jump quickly",
  "Sphinx of black quartz judge my vow",
];

export default function TypingChallenge({ onComplete }: Props) {
  const [sentence] = useState(
    () => SENTENCES[Math.floor(Math.random() * SENTENCES.length)]
  );
  const [typed, setTyped] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!startTime) {
      setStartTime(Date.now());
    }

    setTyped(value);

    if (value.length >= sentence.length) {
      const timeElapsed = (Date.now() - (startTime || Date.now())) / 1000;

      let errors = 0;
      for (let i = 0; i < sentence.length; i++) {
        if (value[i] !== sentence[i]) errors++;
      }

      errors += Math.abs(value.length - sentence.length);

      const words = sentence.split(" ").length;
      const wpm = Math.round((words / timeElapsed) * 60);

      const errorHumanity = Math.min(100, errors * 20);
      const speedHumanity = wpm > 150 ? 0 : wpm < 20 ? 100 : 50;

      const humanityScore = Math.round((errorHumanity + speedHumanity) / 2);

      let details = "";
      if (errors === 0) {
        details = "Perfect accuracy at " + wpm + " WPM. Suspicious...";
      } else if (errors <= 2) {
        details = errors + " typo" + (errors > 1 ? "s" : "") + ". Beautifully human.";
      } else if (errors <= 5) {
        details = errors + " typos! Your fingers have personality.";
      } else {
        details = errors + " typos! Your keyboard is staging a rebellion.";
      }

      onComplete(humanityScore, details);
    }
  };

  const renderSentence = () => {
    return sentence.split("").map((char, i) => {
      let className = "text-zinc-400 dark:text-zinc-600";
      if (i < typed.length) {
        className =
          typed[i] === char
            ? "text-emerald-500"
            : "text-red-500 bg-red-100 dark:bg-red-900/30";
      }
      return (
        <span key={i} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md">
      <p className="text-center text-zinc-600 dark:text-zinc-400">
        Type this sentence. Typos welcome.
      </p>

      <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl font-mono text-lg leading-relaxed">
        {renderSentence()}
      </div>

      <input
        ref={inputRef}
        type="text"
        value={typed}
        onChange={handleChange}
        className="w-full p-3 text-lg border-2 border-zinc-200 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-900 focus:outline-none focus:border-blue-500"
        placeholder="Start typing..."
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />

      <p className="text-sm text-zinc-500">
        {typed.length} / {sentence.length} characters
      </p>
    </div>
  );
}
