"use client";

import { useState, useCallback } from "react";
import { X, ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";
import { type Practice } from "@/lib/practices-data";
import { PracticeTimer } from "@/components/practice-timer";

interface GuidedPracticeProps {
  readonly practice: Practice;
  readonly onClose: () => void;
  readonly onComplete: () => void;
}

export function GuidedPractice({ practice, onClose, onComplete }: GuidedPracticeProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [timerComplete, setTimerComplete] = useState(false);

  const steps = practice.steps;
  const currentStep = steps[currentStepIndex];
  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === steps.length - 1;

  const handleNext = useCallback(() => {
    if (isLast) {
      setIsDone(true);
      onComplete();
    } else {
      setCurrentStepIndex((prev) => prev + 1);
      setTimerComplete(false);
    }
  }, [isLast, onComplete]);

  const handlePrev = useCallback(() => {
    if (!isFirst) {
      setCurrentStepIndex((prev) => prev - 1);
      setTimerComplete(false);
    }
  }, [isFirst]);

  const handleTimerComplete = useCallback(() => {
    setTimerComplete(true);
  }, []);

  // Extract minutes from the step duration string.
  // Only returns a value if the duration explicitly says "minute" or "minutes"
  // to avoid showing timers for strings like "4 counts" or "Throughout".
  function parseStepMinutes(duration?: string): number | null {
    if (!duration) return null;
    if (!duration.toLowerCase().includes("minute")) return null;
    const match = duration.match(/^(\d+)/);
    if (!match) return null;
    const num = parseInt(match[1], 10);
    if (isNaN(num) || num <= 0) return null;
    return num;
  }

  const stepMinutes = parseStepMinutes(currentStep?.duration);

  if (isDone) {
    return (
      <div className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center px-6 animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-text-muted hover:text-text-secondary hover:bg-surface transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-accent" />
          </div>

          <h2 className="text-2xl mb-3">Practice complete</h2>
          <p className="text-text-secondary mb-2">
            You completed {practice.title}.
          </p>
          <p className="text-sm text-text-muted italic mb-10">
            Tradition holds that what happens after a practice matters as much as the practice itself. Sit for a moment before you move.
          </p>

          {/* Reflection prompt */}
          <div className="bg-surface rounded-xl border border-border p-5 mb-8 text-left">
            <p className="text-xs text-accent uppercase tracking-widest font-medium mb-3">
              Reflection
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              What was one moment during this practice that surprised you, moved you, or stayed with you? Name it -- even briefly. The naming is part of the practice.
            </p>
          </div>

          <button
            onClick={onClose}
            className="bg-accent text-white px-8 py-3 rounded-lg font-medium hover:bg-accent-light transition-colors"
          >
            Return
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Header bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border-light">
        <div>
          <p className="text-xs text-text-muted">{practice.title}</p>
          <p className="text-xs text-accent font-medium">
            Step {currentStepIndex + 1} of {steps.length}
          </p>
        </div>

        {/* Step progress dots */}
        <div className="flex items-center gap-1.5">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all ${
                i === currentStepIndex
                  ? "w-4 h-2 bg-accent"
                  : i < currentStepIndex
                  ? "w-2 h-2 bg-accent/40"
                  : "w-2 h-2 bg-border"
              }`}
            />
          ))}
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-full text-text-muted hover:text-text-secondary hover:bg-surface-warm transition-colors"
          aria-label="Exit guided practice"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 max-w-2xl mx-auto w-full">
        <div className="w-full animate-fade-in" key={currentStepIndex}>
          {/* Step number */}
          <p className="text-xs text-text-muted uppercase tracking-widest mb-4">
            Step {currentStepIndex + 1}
          </p>

          {/* Step title */}
          <h2 className="text-2xl sm:text-3xl mb-6">{currentStep.title}</h2>

          {/* Duration badge */}
          {currentStep.duration && (
            <span className="inline-block text-xs text-accent bg-accent/10 px-3 py-1 rounded-full mb-6">
              {currentStep.duration}
            </span>
          )}

          {/* Instruction */}
          <p className="text-text-secondary leading-relaxed text-lg mb-6">
            {currentStep.instruction}
          </p>

          {/* Note */}
          {currentStep.note && (
            <div className="bg-surface-warm rounded-lg p-4 border-l-2 border-accent/30 mb-6">
              <p className="text-sm text-text-secondary italic leading-relaxed">
                {currentStep.note}
              </p>
            </div>
          )}

          {/* Timer (if step has a duration in minutes) */}
          {stepMinutes !== null && (
            <div className="flex flex-col items-center py-6 border-t border-border-light">
              <p className="text-xs text-text-muted mb-4 uppercase tracking-widest">
                Timer for this step
              </p>
              <PracticeTimer minutes={stepMinutes} onComplete={handleTimerComplete} />
              {timerComplete && (
                <p className="text-sm text-accent mt-3 animate-fade-in">
                  Ready to continue when you are.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="px-6 py-4 border-t border-border-light">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={isFirst}
            className="flex items-center gap-2 text-sm text-text-muted hover:text-text-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 bg-accent text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-accent-light transition-colors"
          >
            {isLast ? "Complete practice" : "Next step"}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
