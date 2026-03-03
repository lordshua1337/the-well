"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Check,
  Flame,
  BookOpen,
  Archive,
} from "lucide-react";
import { getTodaysLivingWord } from "@/lib/living-words-engine";
import { CATEGORY_LABELS } from "@/lib/living-words-data";
import type { LivingWord } from "@/lib/living-words-data";
import {
  loadLivingWordProgress,
  saveLivingWordProgress,
  recordEngagement,
  completeMicroPractice,
  hasEngagedToday,
  getResponseForWord,
  hasCompletedPractice,
  type LivingWordProgress,
} from "@/lib/living-words-progress";

// ---------------------------------------------------------------------------
// Category color mapping
// ---------------------------------------------------------------------------

const CATEGORY_COLORS: Record<string, string> = {
  perception: "#2D6A4F",
  release: "#40916C",
  presence: "#74C69D",
  correction: "#B68D40",
  encounter: "#D4A853",
  justice: "#C1292E",
  body: "#8B5E3C",
  shadow: "#4A4E69",
  community: "#22577A",
  silence: "#6B7280",
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function CategoryBadge({ category }: { readonly category: string }) {
  const color = CATEGORY_COLORS[category] ?? "#2D6A4F";
  const label = CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS] ?? category;
  return (
    <span
      className="text-[10px] font-medium uppercase tracking-widest px-2.5 py-1 rounded-full"
      style={{ backgroundColor: `${color}18`, color }}
    >
      {label}
    </span>
  );
}

function StreakBar({ progress }: { readonly progress: LivingWordProgress }) {
  const { currentStreak, longestStreak, totalEngaged, totalPracticesCompleted } = progress;

  return (
    <div className="flex items-center gap-4 flex-wrap">
      <div className="flex items-center gap-1.5">
        <Flame
          className="w-4 h-4"
          style={{ color: currentStreak > 0 ? "#B68D40" : "#8A8A8A" }}
        />
        <span
          className="text-xs font-medium"
          style={{ color: currentStreak > 0 ? "#B68D40" : "#8A8A8A" }}
        >
          {currentStreak > 0 ? `${currentStreak}-day streak` : "No streak yet"}
        </span>
      </div>
      {longestStreak > 0 && (
        <span className="text-xs text-text-muted">Best: {longestStreak}</span>
      )}
      {totalEngaged > 0 && (
        <span className="text-xs text-text-muted">{totalEngaged} total days</span>
      )}
      {totalPracticesCompleted > 0 && (
        <span className="text-xs text-text-muted">
          {totalPracticesCompleted} practices done
        </span>
      )}
    </div>
  );
}

function RelatedLinks({ word }: { readonly word: LivingWord }) {
  const hasLinks =
    word.relatedWordId ||
    word.relatedConceptSlug ||
    word.relatedDossierId ||
    word.relatedPracticeSlug;

  if (!hasLinks) return null;

  return (
    <div className="pt-4 border-t border-border-light">
      <p className="text-xs text-text-muted uppercase tracking-widest font-medium mb-2">
        Go Deeper
      </p>
      <div className="flex flex-wrap gap-2">
        {word.relatedWordId && (
          <Link
            href={`/words#${word.relatedWordId}`}
            className="text-xs text-accent hover:text-accent-light transition-colors inline-flex items-center gap-1 bg-accent/8 px-3 py-1.5 rounded-full"
          >
            <BookOpen className="w-3 h-3" />
            Word: {word.relatedWordId}
          </Link>
        )}
        {word.relatedConceptSlug && (
          <Link
            href={`/concepts/${word.relatedConceptSlug}`}
            className="text-xs text-accent hover:text-accent-light transition-colors inline-flex items-center gap-1 bg-accent/8 px-3 py-1.5 rounded-full"
          >
            <BookOpen className="w-3 h-3" />
            Concept
          </Link>
        )}
        {word.relatedDossierId && (
          <Link
            href={`/passages/${word.relatedDossierId}`}
            className="text-xs text-accent hover:text-accent-light transition-colors inline-flex items-center gap-1 bg-accent/8 px-3 py-1.5 rounded-full"
          >
            <BookOpen className="w-3 h-3" />
            Passage dossier
          </Link>
        )}
        {word.relatedPracticeSlug && (
          <Link
            href={`/practices/${word.relatedPracticeSlug}`}
            className="text-xs text-accent hover:text-accent-light transition-colors inline-flex items-center gap-1 bg-accent/8 px-3 py-1.5 rounded-full"
          >
            <BookOpen className="w-3 h-3" />
            Practice
          </Link>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function LivingWordsPage() {
  const [word, setWord] = useState<LivingWord | null>(null);
  const [progress, setProgress] = useState<LivingWordProgress | null>(null);
  const [practiceOpen, setPracticeOpen] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const todaysWord = getTodaysLivingWord();
    const loaded = loadLivingWordProgress();
    setWord(todaysWord);
    setProgress(loaded);

    const existing = loaded.responses.find(
      (r) => r.livingWordId === todaysWord.id
    );
    if (existing) {
      setResponseText(existing.response);
    }
  }, []);

  function handleEngagement() {
    if (!word || !progress) return;
    const updated = recordEngagement(
      progress,
      word.id,
      word.day,
      responseText
    );
    saveLivingWordProgress(updated);
    setProgress(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handlePracticeComplete() {
    if (!word || !progress) return;
    const updated = completeMicroPractice(progress, word.id, word.day);
    saveLivingWordProgress(updated);
    setProgress(updated);
  }

  // SSR / loading placeholder
  if (!word || !progress) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto animate-pulse space-y-6">
          <div className="h-4 bg-border-light rounded w-32" />
          <div className="h-8 bg-border-light rounded w-3/4" />
          <div className="h-40 bg-border-light rounded" />
        </div>
      </div>
    );
  }

  const engagedToday = hasEngagedToday(progress);
  const practiceCompleted = hasCompletedPractice(progress, word.id);
  const existingResponse = getResponseForWord(progress, word.id);
  const categoryColor = CATEGORY_COLORS[word.category] ?? "#2D6A4F";

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Navigation */}
        <div className="flex items-center justify-between mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-secondary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>
          <Link
            href="/living-words/archive"
            className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-secondary transition-colors"
          >
            <Archive className="w-3.5 h-3.5" />
            Archive
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs text-text-muted uppercase tracking-widest font-medium mb-3">
            Day {word.day} of 60
          </p>
          <div className="flex items-center gap-3 mb-4">
            <CategoryBadge category={word.category} />
            {engagedToday && (
              <span className="text-xs text-accent flex items-center gap-1 font-medium">
                <Check className="w-3 h-3" />
                Engaged today
              </span>
            )}
          </div>
          <StreakBar progress={progress} />
        </div>

        <div className="divider-warm mb-8" />

        {/* Main prompt -- the heart of the page */}
        <section className="mb-10">
          <h1
            className="font-serif text-2xl sm:text-3xl leading-snug mb-6"
            style={{ color: "#1A1A1A" }}
          >
            {word.title}
          </h1>
          <p className="text-text-primary text-lg leading-relaxed">
            {word.prompt}
          </p>
        </section>

        {/* Grounding */}
        <section className="mb-8 bg-surface rounded-xl border border-border p-6">
          <p className="text-xs text-text-muted uppercase tracking-widest font-medium mb-3">
            Grounding
          </p>
          <p className="text-text-secondary text-sm leading-relaxed italic font-serif">
            {word.grounding}
          </p>
        </section>

        {/* Micro-practice -- expandable */}
        <section className="mb-8 bg-surface-warm rounded-xl border border-border overflow-hidden">
          <button
            onClick={() => setPracticeOpen((prev) => !prev)}
            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-border-light/30 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: categoryColor }}
              >
                Today&apos;s Practice
              </span>
              {practiceCompleted && (
                <span className="text-xs text-accent flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Done
                </span>
              )}
            </div>
            {practiceOpen ? (
              <ChevronUp className="w-4 h-4 text-text-muted" />
            ) : (
              <ChevronDown className="w-4 h-4 text-text-muted" />
            )}
          </button>

          {practiceOpen && (
            <div className="px-6 pb-6 border-t border-border-light">
              <p className="text-text-primary text-sm leading-relaxed pt-4 mb-5">
                {word.microPractice}
              </p>
              {!practiceCompleted ? (
                <button
                  onClick={handlePracticeComplete}
                  className="inline-flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-light transition-colors"
                >
                  <Check className="w-4 h-4" />
                  I did the practice
                </button>
              ) : (
                <div className="flex items-center gap-2 text-accent text-sm font-medium">
                  <Check className="w-4 h-4" />
                  Practice completed
                </div>
              )}
            </div>
          )}
        </section>

        {/* Reflection area */}
        <section className="mb-8">
          <label
            htmlFor="reflection"
            className="block text-xs text-text-muted uppercase tracking-widest font-medium mb-3"
          >
            Your Reflection
          </label>
          <textarea
            id="reflection"
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            placeholder="Write what comes up. You do not have to answer the question directly. Just write what is true."
            rows={5}
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary leading-relaxed placeholder:text-text-muted focus:outline-none focus:border-accent/40 transition-colors resize-none font-serif"
          />
          <div className="flex items-center justify-between mt-3">
            <p className="text-xs text-text-muted">
              Saved locally. No one else sees this.
            </p>
            <button
              onClick={handleEngagement}
              disabled={!responseText.trim()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                backgroundColor: responseText.trim() ? "#2D6A4F" : undefined,
                color: responseText.trim() ? "white" : undefined,
                border: responseText.trim() ? "none" : "1px solid #E8E2D9",
              }}
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4" />
                  Saved
                </>
              ) : (
                "Save reflection"
              )}
            </button>
          </div>
        </section>

        {/* Engagement button (without writing) */}
        {!engagedToday && !responseText.trim() && (
          <section className="mb-8">
            <button
              onClick={() => {
                if (!word || !progress) return;
                const updated = recordEngagement(progress, word.id, word.day, "");
                saveLivingWordProgress(updated);
                setProgress(updated);
              }}
              className="w-full py-3 rounded-xl border border-border text-sm text-text-secondary hover:border-accent/30 hover:text-accent transition-colors"
            >
              I engaged with this (no written reflection)
            </button>
          </section>
        )}

        {/* Related content */}
        <RelatedLinks word={word} />

        <div className="divider-warm mt-10 mb-8" />

        {/* Footer nav */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-text-muted">
            These rotate daily. Every 60 days the cycle completes.
          </p>
          <Link
            href="/living-words/archive"
            className="text-sm text-accent hover:text-accent-light transition-colors inline-flex items-center gap-1 font-medium"
          >
            Past entries
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
