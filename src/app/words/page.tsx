"use client";

import { useState, useMemo } from "react";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, Search } from "lucide-react";
import Link from "next/link";
import { wordCorrections, type WordCorrection } from "@/lib/scripture-data";

function WordCard({
  word,
  isExpanded,
  onToggle,
}: {
  word: WordCorrection;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-surface rounded-xl border border-border overflow-hidden card-hover">
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

        <div className="text-text-muted mt-1">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
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
        </div>
      )}
    </div>
  );
}

export default function WordsPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleWord = (id: string) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  const filteredWords = useMemo(() => {
    if (!searchQuery.trim()) return wordCorrections;
    const q = searchQuery.toLowerCase();
    return wordCorrections.filter(
      (w) =>
        w.transliteration.toLowerCase().includes(q) ||
        w.commonTranslation.toLowerCase().includes(q) ||
        w.actualMeaning.toLowerCase().includes(q)
    );
  }, [searchQuery]);

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

        {/* Word list */}
        <div className="space-y-3">
          {filteredWords.map((word) => (
            <WordCard
              key={word.id}
              word={word}
              isExpanded={expanded === word.id}
              onToggle={() => toggleWord(word.id)}
            />
          ))}
          {filteredWords.length === 0 && (
            <div className="text-center py-12 text-text-muted text-sm">
              No words match your search.
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center bg-surface-warm rounded-xl p-8">
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
