"use client";

import { useRef, useState, useEffect, useCallback } from "react";

interface Props {
  onComplete: (score: number, details: string) => void;
}

export default function LineChallenge({ onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const [hasStarted, setHasStarted] = useState(false);

  const getPos = useCallback(
    (e: React.MouseEvent | React.TouchEvent): { x: number; y: number } => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      if ("touches" in e) {
        return {
          x: (e.touches[0].clientX - rect.left) * scaleX,
          y: (e.touches[0].clientY - rect.top) * scaleY,
        };
      }
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#fafafa";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 5]);
    ctx.beginPath();
    ctx.moveTo(50, 150);
    ctx.lineTo(350, 150);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = "#22c55e";
    ctx.beginPath();
    ctx.arc(50, 150, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.arc(350, 150, 8, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDrawing(true);
    setHasStarted(true);
    const pos = getPos(e);
    setPoints([pos]);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const pos = getPos(e);
    setPoints((prev) => [...prev, pos]);

    if (points.length > 0) {
      ctx.strokeStyle = "#3b82f6";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(points[points.length - 1].x, points[points.length - 1].y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
  };

  const endDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (points.length < 5) return;

    const yValues = points.map((p) => p.y);
    const avgY = yValues.reduce((a, b) => a + b, 0) / yValues.length;
    const variance =
      yValues.reduce((sum, y) => sum + Math.pow(y - avgY, 2), 0) / yValues.length;
    const stdDev = Math.sqrt(variance);

    const perfectionScore = Math.max(0, 100 - stdDev * 3);
    const humanityScore = 100 - perfectionScore;

    let details = "";
    if (humanityScore > 80) {
      details = "Wonderfully wobbly! Definitely hand-drawn.";
    } else if (humanityScore > 50) {
      details = "Nice natural variance. Human confirmed.";
    } else if (humanityScore > 20) {
      details = "Pretty straight... do you use a ruler?";
    } else {
      details = "Suspiciously straight. Robot hands detected.";
    }

    onComplete(humanityScore, details);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-center text-zinc-600 dark:text-zinc-400">
        Draw a straight line from green to red. No rulers allowed.
      </p>
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        className="border-2 border-zinc-200 dark:border-zinc-700 rounded-xl cursor-crosshair touch-none bg-zinc-50 dark:bg-zinc-900"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={endDrawing}
      />
      {!hasStarted && (
        <p className="text-sm text-zinc-500">Click/tap on the green dot to start</p>
      )}
    </div>
  );
}
