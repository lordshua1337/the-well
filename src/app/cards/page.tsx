"use client";

import { useState, useCallback, useMemo, useRef, useEffect, TouchEvent } from "react";
import {
  ChevronUp,
  ChevronDown,
  BookOpen,
  Languages,
  ScrollText,
  Sparkles,
  Shuffle,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { scriptureCards, type ScriptureCard } from "@/lib/scripture-data";
import { CURATED_CARD_IDS } from "@/lib/curated-card-order";

type CategoryFilter = "curated" | "all" | "word" | "teaching" | "gnostic";

const categoryLabels: Record<CategoryFilter, string> = {
  curated: "The Story",
  all: "All",
  word: "Words",
  teaching: "Teachings",
  gnostic: "Gnostic",
};

const categoryIcons: Record<CategoryFilter, React.ReactNode> = {
  curated: <Sparkles className="w-3.5 h-3.5" />,
  all: <BookOpen className="w-3.5 h-3.5" />,
  word: <Languages className="w-3.5 h-3.5" />,
  teaching: <BookOpen className="w-3.5 h-3.5" />,
  gnostic: <ScrollText className="w-3.5 h-3.5" />,
};

// Build curated deck from IDs
function getCuratedCards(): ScriptureCard[] {
  const cardMap = new Map(scriptureCards.map((c) => [c.id, c]));
  return CURATED_CARD_IDS
    .map((id) => cardMap.get(id))
    .filter((c): c is ScriptureCard => c != null);
}

function FullScreenCard({
  card,
  index,
  total,
  direction,
}: {
  readonly card: ScriptureCard;
  readonly index: number;
  readonly total: number;
  readonly direction: "up" | "down" | "none";
}) {
  const animClass =
    direction === "none"
      ? "animate-fade-in"
      : direction === "down"
        ? "card-slide-up"
        : "card-slide-down";

  return (
    <div
      className={`min-h-[calc(100dvh-10rem)] md:min-h-[calc(100dvh-6rem)] flex flex-col items-center justify-center px-6 sm:px-8 ${animClass}`}
    >
      <div className="max-w-lg w-full text-center">
        {/* Counter */}
        <p className="text-xs text-text-muted mb-8 tracking-widest uppercase">
          {index + 1} of {total}
        </p>

        {/* The crossed-out English word */}
        {card.commonTranslation && (
          <p className="text-5xl sm:text-6xl font-serif text-text-muted/40 line-through mb-4 select-none">
            {card.commonTranslation.split("(")[0].trim()}
          </p>
        )}

        {/* Greek word */}
        {card.transliteration && (
          <p className="font-serif italic text-accent text-2xl sm:text-3xl mb-3">
            {card.transliteration}
          </p>
        )}

        {/* The real meaning -- the revelation */}
        <p className="text-xl sm:text-2xl font-medium text-text-primary leading-snug mb-8">
          {card.actualMeaning}
        </p>

        {/* The verse */}
        <blockquote className="font-serif text-base sm:text-lg leading-relaxed text-text-secondary mb-6 italic max-w-md mx-auto">
          &ldquo;{card.verse}&rdquo;
        </blockquote>
        <p className="text-xs text-text-muted mb-8">{card.verseRef}</p>

        {/* Context -- the "why this changes everything" */}
        <div className="bg-surface/60 rounded-xl border border-border-light px-5 py-4 text-left">
          <p className="text-sm text-text-secondary leading-relaxed">
            {card.context}
          </p>
        </div>
      </div>
    </div>
  );
}

function EndCard() {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6 sm:px-8">
      <div className="max-w-lg w-full text-center">
        <p className="text-xs text-accent uppercase tracking-widest font-medium mb-6">
          The original message
        </p>
        <h2 className="text-2xl sm:text-3xl font-serif mb-6 leading-snug">
          You&apos;re not broken. You&apos;re not condemned. You&apos;re being made whole.
        </h2>
        <p className="text-text-secondary leading-relaxed mb-10 max-w-md mx-auto">
          That&apos;s the story they changed. The original words were about
          release, trust, growth, and wholeness -- not guilt, fear, and
          punishment.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/ask"
            className="bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-accent-light transition-colors inline-flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Ask about any of these
          </Link>
          <Link
            href="/words"
            className="bg-surface border border-border text-text-primary px-6 py-3 rounded-lg font-medium hover:border-accent/30 transition-colors inline-flex items-center justify-center gap-2"
          >
            All 43 word corrections
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CardsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"up" | "down" | "none">("none");
  const [filter, setFilter] = useState<CategoryFilter>("curated");
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  const curatedCards = useMemo(() => getCuratedCards(), []);

  const filteredCards = useMemo(() => {
    if (filter === "curated") return curatedCards;
    if (filter === "all") return scriptureCards;
    return scriptureCards.filter((c) => c.category === filter);
  }, [filter, curatedCards]);

  const isLastCard = currentIndex >= filteredCards.length;
  const showEndCard = filter === "curated" && isLastCard;
  const currentCard = isLastCard ? null : filteredCards[currentIndex];

  const categoryCounts = useMemo(
    () => ({
      curated: curatedCards.length,
      all: scriptureCards.length,
      word: scriptureCards.filter((c) => c.category === "word").length,
      teaching: scriptureCards.filter((c) => c.category === "teaching").length,
      gnostic: scriptureCards.filter((c) => c.category === "gnostic").length,
    }),
    [curatedCards]
  );

  const goNext = useCallback(() => {
    const max = filter === "curated" ? filteredCards.length : filteredCards.length - 1;
    if (currentIndex < max) {
      setDirection("down");
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, filteredCards.length, filter]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection("up");
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const handleTouchStart = (e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const diff = touchStartY.current - touchEndY.current;
    const threshold = 50;

    if (diff > threshold) {
      goNext(); // swipe up = next
    } else if (diff < -threshold) {
      goPrev(); // swipe down = previous
    }
  };

  const handleFilterChange = (newFilter: CategoryFilter) => {
    setFilter(newFilter);
    setCurrentIndex(0);
    setDirection("none");
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  return (
    <div className="relative">
      {/* Sticky filter bar */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-background/90 backdrop-blur-sm border-b border-border-light">
        <div className="max-w-2xl mx-auto px-4 py-2 flex items-center gap-2 overflow-x-auto">
          {(Object.keys(categoryLabels) as CategoryFilter[]).map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterChange(cat)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                filter === cat
                  ? "bg-accent text-white"
                  : "bg-surface border border-border text-text-secondary hover:border-accent/30"
              }`}
            >
              {categoryIcons[cat]}
              {categoryLabels[cat]}
              <span className="opacity-70">{categoryCounts[cat]}</span>
            </button>
          ))}
          <button
            onClick={() => {
              const randomIdx = Math.floor(
                Math.random() * filteredCards.length
              );
              setDirection("down");
              setCurrentIndex(randomIdx);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-surface border border-border text-text-secondary hover:border-accent/30 transition-colors whitespace-nowrap"
          >
            <Shuffle className="w-3.5 h-3.5" />
            Shuffle
          </button>
        </div>
      </div>

      {/* Card area */}
      <div
        className="pt-28 pb-32 md:pb-16"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {showEndCard ? (
          <EndCard key="end" />
        ) : currentCard ? (
          <FullScreenCard
            key={`${filter}-${currentIndex}`}
            card={currentCard}
            index={currentIndex}
            total={filteredCards.length}
            direction={direction}
          />
        ) : (
          <div className="min-h-[80vh] flex items-center justify-center text-text-muted text-sm">
            No cards in this category yet.
          </div>
        )}
      </div>

      {/* Fixed bottom nav */}
      <div className="fixed bottom-14 left-0 right-0 z-40 bg-background/90 backdrop-blur-sm border-t border-border-light md:bottom-0 pb-[env(safe-area-inset-bottom)]">
        <div className="max-w-2xl mx-auto px-4 py-2 flex items-center justify-between">
          {/* Progress dots */}
          <div className="flex gap-1 items-center overflow-hidden max-w-[60%]">
            {filteredCards.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? "down" : "up");
                  setCurrentIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all flex-shrink-0 ${
                  i === currentIndex
                    ? "bg-accent w-5"
                    : i < currentIndex
                      ? "bg-accent/30 w-1.5"
                      : "bg-border w-1.5"
                }`}
                aria-label={`Go to card ${i + 1}`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={goPrev}
              disabled={currentIndex === 0}
              className="p-1.5 rounded-lg text-text-secondary hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous card"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
            <span className="text-xs text-text-muted tabular-nums min-w-[3rem] text-center">
              {Math.min(currentIndex + 1, filteredCards.length)}/{filteredCards.length}
            </span>
            <button
              onClick={goNext}
              disabled={filter === "curated" ? currentIndex > filteredCards.length - 1 : currentIndex >= filteredCards.length - 1}
              className="p-1.5 rounded-lg text-text-secondary hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Next card"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
