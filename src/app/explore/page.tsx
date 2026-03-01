"use client";

import { useState, useCallback, useRef, TouchEvent } from "react";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Languages,
  ScrollText,
  Filter,
} from "lucide-react";
import { scriptureCards, type ScriptureCard } from "@/lib/scripture-data";

type CategoryFilter = "all" | "word" | "teaching" | "gnostic";

const categoryLabels: Record<CategoryFilter, string> = {
  all: "All",
  word: "Word Corrections",
  teaching: "Teachings",
  gnostic: "Gnostic Texts",
};

const categoryIcons: Record<CategoryFilter, React.ReactNode> = {
  all: <Filter className="w-4 h-4" />,
  word: <Languages className="w-4 h-4" />,
  teaching: <BookOpen className="w-4 h-4" />,
  gnostic: <ScrollText className="w-4 h-4" />,
};

function ScriptureCardView({
  card,
  direction,
}: {
  card: ScriptureCard;
  direction: "left" | "right" | "none";
}) {
  const animClass =
    direction === "none"
      ? "animate-fade-in"
      : direction === "right"
        ? "animate-slide-in"
        : "animate-fade-in";

  return (
    <div
      className={`bg-surface rounded-2xl border border-border p-6 sm:p-8 max-w-lg w-full mx-auto ${animClass}`}
    >
      {/* Category badge */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs uppercase tracking-widest text-accent font-medium">
          {card.category === "word"
            ? "Word Correction"
            : card.category === "teaching"
              ? "Teaching"
              : "Gnostic Text"}
        </span>
        <span className="text-xs text-text-muted">{card.verseRef}</span>
      </div>

      {/* Greek word (if applicable) */}
      {card.transliteration && (
        <div className="mb-6">
          <p className="text-xs text-text-muted uppercase tracking-widest mb-1">
            Greek
          </p>
          <p className="font-serif italic text-accent text-xl">
            {card.transliteration}
          </p>
          {card.commonTranslation && (
            <div className="flex items-center gap-3 mt-2">
              <span className="text-sm text-text-muted line-through">
                {card.commonTranslation}
              </span>
              <span className="text-text-muted">&rarr;</span>
              <span className="text-sm text-accent font-medium">
                {card.actualMeaning}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Verse */}
      <blockquote className="font-serif text-lg sm:text-xl leading-relaxed text-text-primary mb-6">
        &ldquo;{card.verse}&rdquo;
      </blockquote>

      {/* Context */}
      <div className="border-t border-border-light pt-4">
        <p className="text-sm text-text-secondary leading-relaxed">
          {card.context}
        </p>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | "none">(
    "none"
  );
  const [filter, setFilter] = useState<CategoryFilter>("all");
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const filteredCards =
    filter === "all"
      ? scriptureCards
      : scriptureCards.filter((c) => c.category === filter);

  const currentCard = filteredCards[currentIndex];

  const goNext = useCallback(() => {
    if (currentIndex < filteredCards.length - 1) {
      setDirection("right");
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, filteredCards.length]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection("left");
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (diff > threshold) {
      goNext();
    } else if (diff < -threshold) {
      goPrev();
    }
  };

  const handleFilterChange = (newFilter: CategoryFilter) => {
    setFilter(newFilter);
    setCurrentIndex(0);
    setDirection("none");
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-xs text-accent uppercase tracking-widest font-medium mb-2">
            Explore
          </p>
          <h1 className="text-3xl sm:text-4xl mb-3">Scripture Cards</h1>
          <p className="text-text-secondary text-sm">
            Swipe through teachings with their original meanings. No spin.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {(Object.keys(categoryLabels) as CategoryFilter[]).map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterChange(cat)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filter === cat
                  ? "bg-accent text-white"
                  : "bg-surface border border-border text-text-secondary hover:border-accent/30"
              }`}
            >
              {categoryIcons[cat]}
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* Card display */}
        {filteredCards.length > 0 ? (
          <>
            <div
              className="swipe-container min-h-[400px] flex items-center"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <ScriptureCardView
                key={`${filter}-${currentIndex}`}
                card={currentCard}
                direction={direction}
              />
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-6 mt-8">
              <button
                onClick={goPrev}
                disabled={currentIndex === 0}
                className="p-2 rounded-full bg-surface border border-border hover:border-accent/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous card"
              >
                <ChevronLeft className="w-5 h-5 text-text-secondary" />
              </button>

              <span className="text-sm text-text-muted tabular-nums">
                {currentIndex + 1} / {filteredCards.length}
              </span>

              <button
                onClick={goNext}
                disabled={currentIndex === filteredCards.length - 1}
                className="p-2 rounded-full bg-surface border border-border hover:border-accent/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Next card"
              >
                <ChevronRight className="w-5 h-5 text-text-secondary" />
              </button>
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-1.5 mt-4">
              {filteredCards.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentIndex ? "right" : "left");
                    setCurrentIndex(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentIndex
                      ? "bg-accent w-6"
                      : "bg-border hover:bg-warm-gray"
                  }`}
                  aria-label={`Go to card ${i + 1}`}
                />
              ))}
            </div>

            {/* Keyboard hint */}
            <p className="text-center text-xs text-text-muted mt-6 hidden sm:block">
              Use arrow keys or swipe to navigate
            </p>
          </>
        ) : (
          <div className="text-center py-16 text-text-muted">
            No cards in this category yet.
          </div>
        )}
      </div>
    </div>
  );
}
