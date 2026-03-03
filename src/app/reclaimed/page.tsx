"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import {
  getAllRestorationCategories,
  type RestorationCategory,
} from "@/lib/restoration";

const categories = getAllRestorationCategories();

function EvidenceLinks({
  category,
}: {
  category: RestorationCategory;
}) {
  const hasEvidence =
    category.evidence.conceptSlugs.length > 0 ||
    category.evidence.wordIds.length > 0;

  if (!hasEvidence) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {category.evidence.conceptSlugs.map((slug) => (
        <Link
          key={slug}
          href={`/concepts/${slug}`}
          className="text-[10px] uppercase tracking-wider px-2 py-1 rounded border border-accent/30 text-accent hover:bg-accent/10 transition-colors font-medium"
        >
          {slug.replace(/-/g, " ")}
        </Link>
      ))}
      {category.evidence.wordIds.map((id) => (
        <Link
          key={id}
          href={`/words?word=${id}`}
          className="text-[10px] uppercase tracking-wider px-2 py-1 rounded border border-gold/30 text-gold hover:bg-gold/10 transition-colors font-medium"
        >
          {id}
        </Link>
      ))}
    </div>
  );
}

function CategoryCard({
  category,
  index,
}: {
  category: RestorationCategory;
  index: number;
}) {
  const [reclaimOpen, setReclaimOpen] = useState(false);
  const isAlt = index % 2 === 1;

  return (
    <div
      className={`rounded-2xl border border-border overflow-hidden ${
        isAlt ? "bg-surface-warm" : "bg-surface"
      }`}
    >
      {/* Top accent bar -- varies by index for rhythm */}
      <div
        className="h-0.5 w-full"
        style={{
          background: `linear-gradient(to right, var(--color-accent), var(--color-gold))`,
          opacity: isAlt ? 0.6 : 0.9,
        }}
      />

      <div className="p-6 sm:p-8">
        {/* Category number + name */}
        <div className="flex items-start gap-4 mb-6">
          <span className="text-3xl font-serif text-accent/30 leading-none select-none">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h2 className="text-xl sm:text-2xl font-serif text-text-primary leading-tight">
              {category.name}
            </h2>
          </div>
        </div>

        {/* Stolen vs Replaced -- two-column at sm+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* What was stolen */}
          <div className="bg-background rounded-xl border border-border-light p-5">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-accent mb-3">
              What Was Stolen
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              {category.whatWasStolen}
            </p>
          </div>

          {/* What replaced it */}
          <div className="bg-background rounded-xl border border-border-light p-5">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-gold mb-3">
              What Replaced It
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              {category.replacedWith}
            </p>
          </div>
        </div>

        {/* What it originally looked like */}
        <div className="bg-background rounded-xl border border-border-light p-5 mb-4">
          <p className="text-[10px] uppercase tracking-widest font-semibold text-text-muted mb-3">
            What It Originally Looked Like
          </p>
          <p className="text-sm text-text-secondary leading-relaxed">
            {category.whatItOriginallyLookedLike}
          </p>
        </div>

        {/* Evidence links */}
        <div className="mb-4">
          <p className="text-[10px] uppercase tracking-widest font-semibold text-text-muted mb-2">
            Evidence in the Library
          </p>
          <EvidenceLinks category={category} />
          {category.evidence.conceptSlugs.length === 0 &&
            category.evidence.wordIds.length === 0 && (
              <p className="text-xs text-text-muted italic">
                No linked entries yet -- content expanding.
              </p>
            )}
        </div>

        {/* How to reclaim it -- collapsible */}
        <div className="border-t border-border-light pt-4">
          <button
            onClick={() => setReclaimOpen((prev) => !prev)}
            className="flex items-center justify-between w-full text-left group"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-accent group-hover:text-accent-light transition-colors">
              How to Reclaim It
            </span>
            {reclaimOpen ? (
              <ChevronUp className="w-4 h-4 text-text-muted" />
            ) : (
              <ChevronDown className="w-4 h-4 text-text-muted" />
            )}
          </button>

          {reclaimOpen && (
            <div className="mt-3 animate-fade-in">
              <p className="text-sm text-text-secondary leading-relaxed">
                {category.howToReclaimIt}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ReclaimedPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs text-accent uppercase tracking-widest font-semibold mb-3">
            Restoration
          </p>
          <h1 className="text-3xl sm:text-5xl font-serif mb-5 leading-tight">
            What Was Stolen,
            <br />
            What Can Be Recovered
          </h1>
          <p className="text-text-secondary text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Institutional Christianity suppressed several dimensions of the original tradition
            -- not always through malice, but through the ordinary mechanics of power,
            consolidation, and fear of what it could not control. These seven categories
            name what was taken and point toward what can be reclaimed.
          </p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-border" />
            <span className="text-xs text-text-muted uppercase tracking-widest">
              Seven Categories
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-border" />
          </div>
        </div>

        {/* Category cards */}
        <div className="space-y-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={index}
            />
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-14 border-t border-border-light pt-10 text-center">
          <p className="text-sm text-text-muted max-w-xl mx-auto leading-relaxed mb-6">
            These are not charges against all Christians or all institutions. They
            are an honest account of what the historical record shows was lost, and
            a pointer toward what the texts themselves still contain.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:text-accent-light transition-colors"
            >
              Explore the knowledge library
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <span className="hidden sm:inline text-border">|</span>
            <Link
              href="/words"
              className="inline-flex items-center gap-2 text-gold text-sm font-medium hover:text-gold-light transition-colors"
            >
              Study the original words
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
