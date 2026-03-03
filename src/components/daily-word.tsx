"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Flame, BookOpen, Check, ArrowRight, Languages } from "lucide-react";
import {
  loadStreak,
  completeToday,
  getReachedMilestone,
  getNextMilestone,
  type StreakState,
} from "@/lib/daily-streak";
import { getDailyContent, type DailyContent } from "@/lib/daily-content";

const MILESTONE_LABELS: Record<number, string> = {
  3: "3-Day Scholar",
  7: "Week of Wisdom",
  14: "Fortnight of Faith",
  30: "Monthly Master",
  60: "Two-Month Sage",
  100: "Century of Study",
};

function StreakBadge({ streak }: { readonly streak: StreakState }) {
  const isActive = streak.currentStreak > 0;

  return (
    <div
      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
        isActive
          ? "bg-gold/15 text-gold"
          : "bg-border-light text-text-muted"
      }`}
    >
      <Flame className={`w-3.5 h-3.5 ${isActive ? "text-gold" : ""}`} />
      {streak.currentStreak > 0 ? (
        <span>{streak.currentStreak} day streak</span>
      ) : (
        <span>Start a streak</span>
      )}
    </div>
  );
}

function WordCard({
  content,
  streak,
  onComplete,
}: {
  readonly content: DailyContent & { type: "word" };
  readonly streak: StreakState;
  readonly onComplete: () => void;
}) {
  const { word } = content;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Languages className="w-4 h-4 text-accent" />
          <span className="text-xs text-accent uppercase tracking-widest font-medium">
            Today&apos;s Word
          </span>
        </div>
        {!streak.completedToday && (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-accent/15 text-accent">
            New
          </span>
        )}
      </div>

      <div>
        <p className="font-serif text-2xl text-accent italic mb-1">
          {word.greek}
        </p>
        <div className="flex items-center gap-3 mt-2">
          <div>
            <p className="text-[10px] text-text-muted uppercase tracking-widest">
              Commonly
            </p>
            <p className="text-sm text-text-primary line-through decoration-error/40">
              {word.commonTranslation}
            </p>
          </div>
          <ArrowRight className="w-3 h-3 text-text-muted" />
          <div>
            <p className="text-[10px] text-text-muted uppercase tracking-widest">
              Actually
            </p>
            <p className="text-sm font-medium text-accent">
              {word.actualMeaning.split("--")[0].trim()}
            </p>
          </div>
        </div>
      </div>

      <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
        {word.whyItMatters}
      </p>

      <div className="flex items-center justify-between pt-1">
        {streak.completedToday ? (
          <div className="flex items-center gap-1.5 text-accent text-sm font-medium">
            <Check className="w-4 h-4" />
            Read today
          </div>
        ) : (
          <button
            onClick={onComplete}
            className="bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-light transition-colors"
          >
            Mark as Read
          </button>
        )}
        <Link
          href={`/words#${word.id}`}
          className="text-accent text-sm font-medium hover:text-accent-light transition-colors inline-flex items-center gap-1"
        >
          Go deeper
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

function PassageCard({
  content,
  streak,
  onComplete,
}: {
  readonly content: DailyContent & { type: "passage" };
  readonly streak: StreakState;
  readonly onComplete: () => void;
}) {
  const { passage } = content;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-accent" />
          <span className="text-xs text-accent uppercase tracking-widest font-medium">
            Today&apos;s Passage
          </span>
        </div>
        {!streak.completedToday && (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-accent/15 text-accent">
            New
          </span>
        )}
      </div>

      <div>
        <p className="font-serif text-lg font-semibold text-text-primary mb-1">
          {passage.passage}
        </p>
        <p className="text-sm text-text-muted italic">
          &ldquo;{passage.commonQuoteForm}&rdquo;
        </p>
      </div>

      <div>
        <p className="text-[10px] text-text-muted uppercase tracking-widest mb-1">
          Clarified Reading
        </p>
        <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
          {passage.clarifiedReading.reframe}
        </p>
      </div>

      <div className="flex items-center justify-between pt-1">
        {streak.completedToday ? (
          <div className="flex items-center gap-1.5 text-accent text-sm font-medium">
            <Check className="w-4 h-4" />
            Read today
          </div>
        ) : (
          <button
            onClick={onComplete}
            className="bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-light transition-colors"
          >
            Mark as Read
          </button>
        )}
        <Link
          href={`/passages/${passage.id}`}
          className="text-accent text-sm font-medium hover:text-accent-light transition-colors inline-flex items-center gap-1"
        >
          Full dossier
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

export default function DailyWord() {
  const [streak, setStreak] = useState<StreakState | null>(null);
  const [content, setContent] = useState<DailyContent | null>(null);
  const [milestone, setMilestone] = useState<number | null>(null);

  useEffect(() => {
    setStreak(loadStreak());
    setContent(getDailyContent());
  }, []);

  function handleComplete() {
    if (!streak) return;
    const updated = completeToday(streak);
    setStreak(updated);

    const reached = getReachedMilestone(updated.currentStreak);
    if (reached) {
      setMilestone(reached);
      setTimeout(() => setMilestone(null), 3000);
    }
  }

  // SSR placeholder -- prevents hydration mismatch
  if (!streak || !content) {
    return (
      <div className="bg-surface rounded-xl border border-border p-6 animate-pulse">
        <div className="h-4 bg-border-light rounded w-24 mb-4" />
        <div className="h-8 bg-border-light rounded w-48 mb-3" />
        <div className="h-4 bg-border-light rounded w-full mb-2" />
        <div className="h-4 bg-border-light rounded w-3/4" />
      </div>
    );
  }

  const nextMilestone = getNextMilestone(streak.currentStreak);
  const progress = streak.currentStreak / nextMilestone;

  return (
    <div className="relative bg-surface rounded-xl border border-border p-6 card-hover overflow-hidden">
      {/* Milestone celebration overlay */}
      {milestone && (
        <div className="absolute inset-0 bg-accent/5 flex items-center justify-center z-10 rounded-xl animate-fade-in">
          <div className="text-center">
            <Flame className="w-8 h-8 text-gold mx-auto mb-2" />
            <p className="font-serif text-lg font-semibold text-accent">
              {MILESTONE_LABELS[milestone] || `${milestone}-Day Streak!`}
            </p>
            <p className="text-sm text-text-muted mt-1">Keep going!</p>
          </div>
        </div>
      )}

      {/* Header with streak badge */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-text-muted uppercase tracking-widest font-medium">
          Daily Word
        </p>
        <StreakBadge streak={streak} />
      </div>

      {/* Content */}
      {content.type === "word" ? (
        <WordCard
          content={content}
          streak={streak}
          onComplete={handleComplete}
        />
      ) : (
        <PassageCard
          content={content}
          streak={streak}
          onComplete={handleComplete}
        />
      )}

      {/* Progress bar to next milestone */}
      {streak.currentStreak > 0 && (
        <div className="mt-4 pt-3 border-t border-border-light">
          <div className="flex items-center justify-between text-[10px] text-text-muted mb-1.5">
            <span>{streak.totalDaysActive} words learned</span>
            <span>
              {nextMilestone - streak.currentStreak} to{" "}
              {MILESTONE_LABELS[nextMilestone] || `${nextMilestone}-day streak`}
            </span>
          </div>
          <div className="h-1.5 bg-border-light rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent to-gold rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progress * 100, 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
