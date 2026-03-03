"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Check, X, ChevronDown, ChevronUp } from "lucide-react";
import {
  getAllLivingWords,
  CATEGORY_LABELS,
  type LivingWordCategory,
  type LivingWord,
} from "@/lib/living-words-data";
import { getDayNumber } from "@/lib/living-words-engine";
import {
  loadLivingWordProgress,
  hasEngagedWithWord,
  hasCompletedPractice,
  type LivingWordProgress,
} from "@/lib/living-words-progress";

// ---------------------------------------------------------------------------
// Constants
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

type CategoryFilter = "all" | LivingWordCategory;

const CATEGORIES: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "perception", label: "Perception" },
  { id: "release", label: "Release" },
  { id: "presence", label: "Presence" },
  { id: "correction", label: "Correction" },
  { id: "encounter", label: "Encounter" },
  { id: "justice", label: "Justice" },
  { id: "body", label: "Body" },
  { id: "shadow", label: "Shadow" },
  { id: "community", label: "Community" },
  { id: "silence", label: "Silence" },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function CategoryBadge({ category }: { readonly category: string }) {
  const color = CATEGORY_COLORS[category] ?? "#2D6A4F";
  const label = CATEGORY_LABELS[category as LivingWordCategory] ?? category;
  return (
    <span
      className="text-[10px] font-medium uppercase tracking-widest px-2 py-0.5 rounded-full"
      style={{ backgroundColor: `${color}18`, color }}
    >
      {label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Expanded entry detail panel
// ---------------------------------------------------------------------------

function EntryDetail({
  word,
  onClose,
  engaged,
  practiceCompleted,
}: {
  readonly word: LivingWord;
  readonly onClose: () => void;
  readonly engaged: boolean;
  readonly practiceCompleted: boolean;
}) {
  const [practiceOpen, setPracticeOpen] = useState(false);
  const categoryColor = CATEGORY_COLORS[word.category] ?? "#2D6A4F";

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40">
      <div className="bg-background rounded-2xl border border-border w-full max-w-xl max-h-[85vh] overflow-y-auto shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4 border-b border-border-light">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <CategoryBadge category={word.category} />
              {engaged && (
                <span className="text-xs text-accent flex items-center gap-1 font-medium">
                  <Check className="w-3 h-3" />
                  Engaged
                </span>
              )}
            </div>
            <p className="text-xs text-text-muted">Day {word.day}</p>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors mt-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title + prompt */}
          <div>
            <h2 className="font-serif text-xl font-semibold mb-4 leading-snug">
              {word.title}
            </h2>
            <p className="text-text-primary text-sm leading-relaxed">
              {word.prompt}
            </p>
          </div>

          {/* Grounding */}
          <div className="bg-surface rounded-xl border border-border p-4">
            <p className="text-xs text-text-muted uppercase tracking-widest font-medium mb-2">
              Grounding
            </p>
            <p className="text-text-secondary text-xs leading-relaxed italic font-serif">
              {word.grounding}
            </p>
          </div>

          {/* Practice */}
          <div className="bg-surface-warm rounded-xl border border-border overflow-hidden">
            <button
              onClick={() => setPracticeOpen((p) => !p)}
              className="w-full flex items-center justify-between px-4 py-3 text-left"
            >
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: categoryColor }}
                >
                  Practice
                </span>
                {practiceCompleted && (
                  <span className="text-xs text-accent flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Done
                  </span>
                )}
              </div>
              {practiceOpen ? (
                <ChevronUp className="w-3.5 h-3.5 text-text-muted" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-text-muted" />
              )}
            </button>
            {practiceOpen && (
              <div className="px-4 pb-4 border-t border-border-light">
                <p className="text-text-primary text-xs leading-relaxed pt-3">
                  {word.microPractice}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main archive page
// ---------------------------------------------------------------------------

export default function LivingWordsArchivePage() {
  const [progress, setProgress] = useState<LivingWordProgress | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [selectedWord, setSelectedWord] = useState<LivingWord | null>(null);
  const todayDayNumber = getDayNumber(new Date());

  useEffect(() => {
    setProgress(loadLivingWordProgress());
  }, []);

  const allWords = getAllLivingWords();

  const filtered = useMemo(() => {
    if (activeCategory === "all") return allWords;
    return allWords.filter((w) => w.category === activeCategory);
  }, [allWords, activeCategory]);

  function isWordAccessible(dayNum: number): boolean {
    return dayNum <= todayDayNumber;
  }

  function handleCardClick(word: LivingWord, isToday: boolean, accessible: boolean) {
    if (isToday) return; // today card links to the main page
    if (!accessible) return;
    setSelectedWord(word);
  }

  if (!progress) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto animate-pulse space-y-4">
          <div className="h-6 bg-border-light rounded w-48" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-28 bg-border-light rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Navigation */}
        <Link
          href="/living-words"
          className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-secondary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Today&apos;s word
        </Link>

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs text-accent uppercase tracking-widest font-medium mb-2">
            60 Days
          </p>
          <h1 className="text-3xl sm:text-4xl mb-3">Archive</h1>
          <p className="text-text-secondary text-sm leading-relaxed mb-4">
            Every entry in the 60-day rotation. Click any accessible entry to revisit it.
          </p>
          {progress.totalEngaged > 0 && (
            <div className="flex items-center gap-4 text-xs text-text-muted">
              <span>{progress.totalEngaged} days engaged</span>
              <span>{progress.totalPracticesCompleted} practices completed</span>
            </div>
          )}
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                activeCategory === cat.id
                  ? "bg-accent text-white"
                  : "bg-surface border border-border text-text-secondary hover:text-accent hover:border-accent/30"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="divider-warm mb-6" />

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((word) => {
            const engaged = hasEngagedWithWord(progress, word.id);
            const practicesDone = hasCompletedPractice(progress, word.id);
            const isToday = word.day === todayDayNumber;
            const accessible = isToday || isWordAccessible(word.day) || engaged;
            const categoryColor = CATEGORY_COLORS[word.category] ?? "#2D6A4F";

            const cardContent = (
              <div
                className={`relative bg-surface rounded-xl border p-4 transition-all h-full ${
                  isToday
                    ? "border-accent/40 shadow-sm"
                    : accessible
                    ? "border-border card-hover cursor-pointer"
                    : "border-border opacity-45 cursor-default"
                }`}
                onClick={() => handleCardClick(word, isToday, accessible && !isToday)}
                role={accessible && !isToday ? "button" : undefined}
                tabIndex={accessible && !isToday ? 0 : undefined}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === " ") && accessible && !isToday) {
                    handleCardClick(word, false, true);
                  }
                }}
              >
                {/* Color accent line */}
                {(isToday || accessible) && (
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl"
                    style={{ backgroundColor: categoryColor, opacity: 0.4 }}
                  />
                )}

                {/* Top row */}
                <div className="flex items-start justify-between mb-3 pt-1">
                  <CategoryBadge category={word.category} />
                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    {engaged && (
                      <span
                        title="Engaged"
                        className="w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${categoryColor}20` }}
                      >
                        <Check className="w-3 h-3" style={{ color: categoryColor }} />
                      </span>
                    )}
                    {practicesDone && (
                      <span className="text-[9px] font-semibold text-gold bg-gold/15 px-1.5 py-0.5 rounded">
                        DONE
                      </span>
                    )}
                    {isToday && (
                      <span className="text-[9px] font-semibold text-accent bg-accent/10 px-1.5 py-0.5 rounded uppercase tracking-wide">
                        Today
                      </span>
                    )}
                  </div>
                </div>

                {/* Day */}
                <p className="text-[10px] text-text-muted mb-1">Day {word.day}</p>

                {/* Title */}
                <h3 className="text-sm font-serif font-semibold leading-snug mb-2">
                  {word.title}
                </h3>

                {/* Excerpt or locked state */}
                {accessible ? (
                  <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
                    {word.prompt.split(". ")[0]}.
                  </p>
                ) : (
                  <p className="text-xs text-text-muted italic">
                    Coming on day {word.day}
                  </p>
                )}

                {/* Today arrow */}
                {isToday && (
                  <p className="text-xs text-accent font-medium mt-3">
                    See today&apos;s word
                  </p>
                )}
              </div>
            );

            // Today card links to main page; others are divs with click
            if (isToday) {
              return (
                <Link key={word.id} href="/living-words" className="block h-full">
                  {cardContent}
                </Link>
              );
            }

            return <div key={word.id}>{cardContent}</div>;
          })}
        </div>

        {activeCategory !== "all" && (
          <p className="text-center text-xs text-text-muted mt-6">
            {filtered.length} entries in this category
          </p>
        )}

      </div>

      {/* Entry detail modal */}
      {selectedWord && progress && (
        <EntryDetail
          word={selectedWord}
          onClose={() => setSelectedWord(null)}
          engaged={hasEngagedWithWord(progress, selectedWord.id)}
          practiceCompleted={hasCompletedPractice(progress, selectedWord.id)}
        />
      )}

    </div>
  );
}
