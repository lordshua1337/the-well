"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Clock,
  Languages,
} from "lucide-react";
import { timelineEras, type TimelineEra } from "@/lib/timeline-data";

function WordChip({ word }: { readonly word: string }) {
  return (
    <Link
      href={`/words#${word}`}
      className="inline-flex items-center gap-1 bg-accent/10 text-accent text-xs font-medium px-2.5 py-1 rounded-full hover:bg-accent/20 transition-colors"
    >
      <Languages className="w-3 h-3" />
      {word}
    </Link>
  );
}

function EraCard({ era, index }: { readonly era: TimelineEra; readonly index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLast = index === timelineEras.length - 1;

  return (
    <div className="relative flex gap-4 sm:gap-6">
      {/* Timeline spine */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Dot */}
        <div className="w-4 h-4 rounded-full bg-accent border-4 border-background z-10 mt-1.5" />
        {/* Line */}
        {!isLast && <div className="w-0.5 flex-1 bg-border-light" />}
      </div>

      {/* Content */}
      <div className="pb-10 sm:pb-14 flex-1 min-w-0">
        {/* Year badge */}
        <div className="inline-flex items-center gap-1.5 bg-surface border border-border text-text-muted text-xs font-mono px-2.5 py-1 rounded-full mb-3">
          <Clock className="w-3 h-3" />
          {era.yearRange}
        </div>

        <h2 className="text-xl sm:text-2xl font-serif font-semibold mb-2">
          {era.title}
        </h2>

        <p className="text-text-secondary text-sm leading-relaxed mb-4">
          {era.summary}
        </p>

        {/* Expand/collapse for details */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1.5 text-accent text-sm font-medium hover:text-accent-light transition-colors mb-4"
        >
          {isExpanded ? "Less" : "What changed"}
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {isExpanded && (
          <div className="animate-fade-in space-y-6">
            {/* What changed */}
            <div className="bg-surface/60 rounded-xl border border-border-light px-5 py-4">
              <p className="text-sm text-text-secondary leading-relaxed">
                {era.whatChanged}
              </p>
            </div>

            {/* Key events */}
            {era.keyEvents.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs text-text-muted uppercase tracking-widest font-medium">
                  Key Events
                </h3>
                {era.keyEvents.map((event) => (
                  <div
                    key={event.title}
                    className="bg-surface rounded-lg border border-border-light px-4 py-3"
                  >
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-xs font-mono text-accent font-medium">
                        {event.year}
                      </span>
                      <h4 className="text-sm font-semibold">{event.title}</h4>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed mb-1.5">
                      {event.description}
                    </p>
                    <p className="text-xs text-accent italic">
                      {event.significance}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Affected words */}
            {era.affectedWords.length > 0 && (
              <div>
                <h3 className="text-xs text-text-muted uppercase tracking-widest font-medium mb-2">
                  Words affected in this era
                </h3>
                <div className="flex flex-wrap gap-2">
                  {era.affectedWords.map((word) => (
                    <WordChip key={word} word={word} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TimelinePage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs text-accent uppercase tracking-widest font-medium mb-2">
            How history changed the message
          </p>
          <h1 className="text-3xl sm:text-4xl mb-3">
            The Timeline
          </h1>
          <p className="text-text-secondary text-sm max-w-lg mx-auto">
            2,000 years from the living voice of Jesus to the words on your
            screen. Here&apos;s what happened along the way -- and what was lost.
          </p>
        </div>

        {/* Timeline */}
        <div className="ml-2">
          {timelineEras.map((era, i) => (
            <EraCard key={era.id} era={era} index={i} />
          ))}
        </div>

        {/* End CTA */}
        <div className="text-center mt-8 pt-8 border-t border-border-light">
          <p className="text-text-secondary text-sm mb-6 max-w-md mx-auto">
            That&apos;s the story of how the words changed. Now see what they
            originally meant.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/cards"
              className="bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-accent-light transition-colors inline-flex items-center justify-center gap-2"
            >
              See the original words
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/ask"
              className="bg-surface border border-border text-text-primary px-6 py-3 rounded-lg font-medium hover:border-accent/30 transition-colors inline-flex items-center justify-center gap-2"
            >
              Ask about any of this
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
