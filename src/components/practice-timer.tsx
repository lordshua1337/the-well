"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

interface PracticeTimerProps {
  readonly minutes: number;
  readonly onComplete?: () => void;
}

function formatTime(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export function PracticeTimer({ minutes, onComplete }: PracticeTimerProps) {
  const totalSeconds = minutes * 60;
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) return 0;
        return prev - 1;
      });
    }, 1000);

    return clearTimer;
  }, [isRunning, clearTimer]);

  // Detect completion by watching secondsLeft reach 0 while running
  useEffect(() => {
    if (secondsLeft === 0 && isRunning) {
      clearTimer();
      setIsRunning(false);
      setIsComplete(true);
      onComplete?.();
    }
  }, [secondsLeft, isRunning, clearTimer, onComplete]);

  const handleStartPause = useCallback(() => {
    if (isComplete) return;
    setIsRunning((prev) => !prev);
  }, [isComplete]);

  const handleReset = useCallback(() => {
    clearTimer();
    setIsRunning(false);
    setIsComplete(false);
    setSecondsLeft(totalSeconds);
  }, [clearTimer, totalSeconds]);

  const percentLeft = totalSeconds > 0 ? (secondsLeft / totalSeconds) * 100 : 0;
  const circumference = 2 * Math.PI * 36; // radius 36
  const strokeDashoffset = circumference * (1 - percentLeft / 100);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Circular progress */}
      <div className="relative w-24 h-24">
        <svg
          className="w-24 h-24 -rotate-90"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Track */}
          <circle
            cx="40"
            cy="40"
            r="36"
            stroke="var(--color-border)"
            strokeWidth="4"
          />
          {/* Progress */}
          <circle
            cx="40"
            cy="40"
            r="36"
            stroke={isComplete ? "var(--color-gold)" : "var(--color-accent)"}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={`transition-all duration-1000 ${isComplete ? "animate-pulse-glow" : ""}`}
            style={{ transition: isRunning ? "stroke-dashoffset 1s linear" : "stroke-dashoffset 0.3s ease" }}
          />
        </svg>
        {/* Time display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`text-sm font-mono font-medium tabular-nums ${
              isComplete ? "text-gold" : "text-text-primary"
            }`}
          >
            {formatTime(secondsLeft)}
          </span>
        </div>
      </div>

      {/* Complete message */}
      {isComplete && (
        <p className="text-xs text-gold font-medium animate-fade-in">
          Time complete
        </p>
      )}

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleStartPause}
          disabled={isComplete}
          className={`p-2.5 rounded-full border transition-colors ${
            isRunning
              ? "bg-accent/10 border-accent/20 text-accent hover:bg-accent/20"
              : "bg-accent text-white border-accent hover:bg-accent-light"
          } disabled:opacity-40 disabled:cursor-not-allowed`}
          aria-label={isRunning ? "Pause timer" : "Start timer"}
        >
          {isRunning ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </button>

        <button
          onClick={handleReset}
          className="p-2.5 rounded-full border border-border text-text-muted hover:text-text-secondary hover:border-accent/30 transition-colors"
          aria-label="Reset timer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
