"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, Search, CheckCircle2, Bookmark } from "lucide-react";
import Link from "next/link";
import { wordCorrections, type WordCorrection, type WordCategory } from "@/lib/words";
import { getRelatedPassages } from "@/lib/cross-links";
import { loadProgress, markWordRead, saveProgress, type ReadingProgress } from "@/lib/reading-progress";
import {
  loadBookmarks,
  saveBookmarks,
  toggleWordBookmark,
  isWordBookmarked,
  type Bookmarks,
} from "@/lib/bookmarks";

const CATEGORIES: { id: WordCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "theological", label: "Theological" },
  { id: "salvation", label: "Salvation" },
  { id: "power", label: "Power" },
  { id: "relational", label: "Relational" },
  { id: "prayer", label: "Prayer" },
  { id: "kingdom", label: "Kingdom" },
];

function WordCard({
  word,
  isExpanded,
  isRead,
  isBookmarked,
  onToggle,
  onToggleBookmark,
}: {
  word: WordCorrection;
  isExpanded: boolean;
  isRead: boolean;
  isBookmarked: boolean;
  onToggle: () => void;
  onToggleBookmark: () => void;
}) {
  return (
    <div id={word.id} className="bg-surface rounded-xl border border-border overflow-hidden card-hover scroll-mt-24">
      {/* Header -- always visible */}
      <button
        onClick={onToggle}
        className="w-full text-left p-6 flex items-start justify-between gap-4"
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-serif italic text-accent text-lg">
              {word.transliteration}
            </span>
            {isRead && <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />}
            <span className="text-text-muted">&mdash;</span>
            <span className="text-sm text-text-muted">
              ({word.greek})
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <span className="text-text-muted line-through">
              &ldquo;{word.commonTranslation}&rdquo;
            </span>
            <ArrowRight className="w-3 h-3 text-accent" />
            <span className="text-accent font-medium">
              {word.actualMeaning}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 mt-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark();
            }}
            className={`p-1 rounded-lg transition-colors ${
              isBookmarked
                ? "text-accent"
                : "text-text-muted hover:text-accent"
            } hover:bg-accent/10`}
            aria-label={isBookmarked ? "Remove bookmark" : "Save for later"}
          >
            <Bookmark
              className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`}
            />
          </button>
          <span className="text-text-muted">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </span>
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-border-light pt-4 animate-fade-in">
          {/* Explanation */}
          <p className="text-text-secondary leading-relaxed mb-6">
            {word.explanation}
          </p>

          {/* Key verses */}
          <div className="mb-6">
            <p className="text-xs text-accent uppercase tracking-widest font-medium mb-3">
              Key Verses (Corrected)
            </p>
            <div className="space-y-3">
              {word.keyVerses.map((verse) => (
                <div
                  key={verse.ref}
                  className="bg-surface-warm rounded-lg p-4"
                >
                  <blockquote className="font-serif text-base text-text-primary leading-relaxed mb-2">
                    &ldquo;{verse.text}&rdquo;
                  </blockquote>
                  <p className="text-xs text-text-muted">{verse.ref}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why it matters */}
          <div className="bg-accent/5 rounded-lg p-4 border border-accent/10">
            <p className="text-xs text-accent uppercase tracking-widest font-medium mb-2">
              Why It Matters
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              {word.whyItMatters}
            </p>
          </div>

          {/* Related passages (cross-link) */}
          {(() => {
            const passages = getRelatedPassages(word);
            if (passages.length === 0) return null;
            return (
              <div className="mt-6 pt-4 border-t border-border-light">
                <p className="text-xs text-accent uppercase tracking-widest font-medium mb-3">
                  Related Passages
                </p>
                <div className="space-y-2">
                  {passages.map((p) => (
                    <Link
                      key={p.id}
                      href={`/passages/${p.id}`}
                      className="flex items-center justify-between bg-surface-warm rounded-lg p-3 hover:bg-accent/5 transition-colors group"
                    >
                      <div>
                        <span className="text-sm font-serif text-text-primary group-hover:text-accent transition-colors">
                          {p.passage}
                        </span>
                        {p.priority === "P1" && (
                          <span className="ml-2 text-[9px] uppercase tracking-widest font-bold text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded-full">
                            High Risk
                          </span>
                        )}
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}

export default function WordsPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<WordCategory | "all">("all");
  const [progress, setProgress] = useState<ReadingProgress | null>(null);
  const [bookmarks, setBookmarks] = useState<Bookmarks | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
    setBookmarks(loadBookmarks());
  }, []);

  const handleToggleBookmark = useCallback((wordId: string) => {
    const current = loadBookmarks();
    const updated = toggleWordBookmark(current, wordId);
    saveBookmarks(updated);
    setBookmarks(updated);
  }, []);

  const toggleWord = useCallback((id: string) => {
    setExpanded((prev) => {
      const next = prev === id ? null : id;
      // Mark as read when expanding
      if (next !== null) {
        const current = loadProgress();
        const updated = markWordRead(current, id);
        if (updated !== current) {
          saveProgress(updated);
          setProgress(updated);
        }
      }
      return next;
    });
  }, []);

  const filteredWords = useMemo(() => {
    let words = wordCorrections;

    // Filter by category
    if (activeCategory !== "all") {
      words = words.filter((w) => w.category === activeCategory);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      words = words.filter(
        (w) =>
          w.transliteration.toLowerCase().includes(q) ||
          w.commonTranslation.toLowerCase().includes(q) ||
          w.actualMeaning.toLowerCase().includes(q) ||
          w.greek.toLowerCase().includes(q)
      );
    }

    return words;
  }, [searchQuery, activeCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: wordCorrections.length };
    for (const w of wordCorrections) {
      counts[w.category] = (counts[w.category] || 0) + 1;
    }
    return counts;
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-secondary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Home
        </Link>

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs text-accent uppercase tracking-widest font-medium mb-2">
            {wordCorrections.length} Word Corrections
          </p>
          <h1 className="text-3xl sm:text-4xl mb-4">
            The Words That Got Lost in Translation
          </h1>
          <p className="text-text-secondary leading-relaxed">
            These words travel through Greek, Latin, Old English, and
            centuries of institutional interpretation before they reach you.
            Here&apos;s what they actually said.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
                activeCategory === cat.id
                  ? "bg-accent text-white"
                  : "bg-surface border border-border text-text-secondary hover:text-accent hover:border-accent/30"
              }`}
            >
              {cat.label}
              <span className="ml-1.5 text-xs opacity-70">
                {categoryCounts[cat.id] || 0}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search words, translations, meanings..."
            className="w-full bg-surface border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/40 transition-colors"
          />
        </div>

        <div className="divider-warm mb-6" />

        {/* Word list */}
        <div className="space-y-3">
          {filteredWords.map((word) => (
            <WordCard
              key={word.id}
              word={word}
              isExpanded={expanded === word.id}
              isRead={progress?.words.includes(word.id) ?? false}
              isBookmarked={bookmarks ? isWordBookmarked(bookmarks, word.id) : false}
              onToggle={() => toggleWord(word.id)}
              onToggleBookmark={() => handleToggleBookmark(word.id)}
            />
          ))}
          {filteredWords.length === 0 && (
            <div className="text-center py-12 text-text-muted text-sm">
              No words match your search.
            </div>
          )}
        </div>

        <div className="divider-warm mt-12 mb-8" />

        {/* Bottom CTA */}
        <div className="text-center bg-surface-warm rounded-xl p-8">
          <h3 className="text-xl mb-3">Have a Question About a Word?</h3>
          <p className="text-text-secondary text-sm mb-6">
            Ask about any Greek word, verse, or teaching and get an answer
            based on the original text.
          </p>
          <Link
            href="/ask"
            className="bg-accent text-white px-6 py-2.5 rounded-lg font-medium hover:bg-accent-light transition-colors inline-flex items-center gap-2"
          >
            Ask a Question
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
