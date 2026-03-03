"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getTodaysLivingWord } from "@/lib/living-words-engine";
import { CATEGORY_LABELS } from "@/lib/living-words-data";
import type { LivingWord } from "@/lib/living-words-data";

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

export default function LivingWordCard() {
  const [word, setWord] = useState<LivingWord | null>(null);

  useEffect(() => {
    setWord(getTodaysLivingWord());
  }, []);

  if (!word) {
    return (
      <div className="bg-surface rounded-xl border border-border p-5 animate-pulse">
        <div className="h-3 bg-border-light rounded w-20 mb-3" />
        <div className="h-5 bg-border-light rounded w-48 mb-2" />
        <div className="h-3 bg-border-light rounded w-full mb-1" />
        <div className="h-3 bg-border-light rounded w-3/4" />
      </div>
    );
  }

  const color = CATEGORY_COLORS[word.category] ?? "#2D6A4F";
  const label =
    CATEGORY_LABELS[word.category as keyof typeof CATEGORY_LABELS] ??
    word.category;
  const firstSentence = word.prompt.split(". ")[0] + ".";

  return (
    <div className="bg-surface rounded-xl border border-border p-5 card-hover relative overflow-hidden">
      {/* Subtle color accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl"
        style={{ backgroundColor: color }}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span
            className="text-[10px] font-medium uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{ backgroundColor: `${color}18`, color }}
          >
            {label}
          </span>
        </div>
        <span className="text-[10px] text-text-muted">Day {word.day}</span>
      </div>

      {/* Title */}
      <h3 className="font-serif text-base font-semibold text-text-primary mb-2 leading-snug">
        {word.title}
      </h3>

      {/* First line of prompt */}
      <p className="text-sm text-text-secondary leading-relaxed line-clamp-2 mb-4">
        {firstSentence}
      </p>

      {/* Link */}
      <Link
        href="/living-words"
        className="inline-flex items-center gap-1 text-sm font-medium transition-colors hover:gap-1.5"
        style={{ color }}
      >
        See today&apos;s word
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
