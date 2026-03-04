"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  AlertTriangle,
  BookOpen,
  Languages,
  ArrowRight,
  CheckCircle2,
  Bookmark,
  ChevronDown,
  Heart,
  Sparkles,
} from "lucide-react";
import { getDossierBySlug, allDossiers } from "@/lib/passages";
import { misuseTypes } from "@/lib/misuse-types";
import { getRelatedWords, getRelatedCardsForPassage } from "@/lib/cross-links";
import { loadProgress, markPassageRead, saveProgress } from "@/lib/reading-progress";
import {
  loadBookmarks,
  saveBookmarks,
  togglePassageBookmark,
  isPassageBookmarked,
  type Bookmarks,
} from "@/lib/bookmarks";

function getMisuseType(id: string) {
  return misuseTypes.find((m) => m.id === id);
}

// ---------------------------------------------------------------------------
// Collapsible section component
// ---------------------------------------------------------------------------

function DisclosureSection({
  icon,
  title,
  preview,
  children,
  defaultOpen = false,
  variant = "default",
}: {
  icon: React.ReactNode;
  title: string;
  preview: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  variant?: "default" | "warning" | "accent";
}) {
  const [open, setOpen] = useState(defaultOpen);

  const borderClass =
    variant === "warning"
      ? "border-red-400/20"
      : variant === "accent"
        ? "border-accent/20"
        : "border-border";
  const bgClass =
    variant === "warning"
      ? "bg-red-400/5"
      : variant === "accent"
        ? "bg-accent/5"
        : "bg-surface";

  return (
    <section className={`rounded-xl border ${borderClass} ${bgClass} mb-4 overflow-hidden`}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-start gap-3 p-6 text-left group"
        aria-expanded={open}
      >
        <span className="shrink-0 mt-0.5">{icon}</span>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-serif mb-1">{title}</h2>
          {!open && (
            <p className="text-sm text-text-muted line-clamp-1">
              {preview}
            </p>
          )}
        </div>
        <ChevronDown
          className={`w-5 h-5 text-text-muted shrink-0 mt-1 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="px-6 pb-6 -mt-2">
          {children}
        </div>
      )}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Utility: truncate text for preview snippets
// ---------------------------------------------------------------------------

function truncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).trimEnd() + "...";
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function PassageDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const dossier = getDossierBySlug(slug);

  const [bookmarks, setBookmarks] = useState<Bookmarks | null>(null);

  // Mark passage as read on visit + load bookmarks
  useEffect(() => {
    if (!dossier) return;
    const progress = loadProgress();
    const updated = markPassageRead(progress, dossier.id);
    if (updated !== progress) {
      saveProgress(updated);
    }
    setBookmarks(loadBookmarks());
  }, [dossier]);

  const handleToggleBookmark = useCallback(() => {
    if (!bookmarks || !dossier) return;
    const updated = togglePassageBookmark(bookmarks, dossier.id);
    saveBookmarks(updated);
    setBookmarks(updated);
  }, [bookmarks, dossier]);

  if (!dossier) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 text-center">
        <h1 className="text-2xl mb-4">Passage not found</h1>
        <Link href="/passages" className="text-accent hover:underline">
          Back to all passages
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back link */}
        <Link
          href="/passages"
          className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          All Passages
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            {dossier.priority === "P1" && (
              <span className="text-[10px] uppercase tracking-widest font-bold text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full">
                High Risk
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
              <CheckCircle2 className="w-3 h-3" />
              Read
            </span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-serif mb-2">
                {dossier.passage}
              </h1>
              <p className="text-lg text-text-muted italic">
                &ldquo;{dossier.commonQuoteForm}&rdquo;
              </p>
            </div>
            <button
              onClick={handleToggleBookmark}
              className={`p-2.5 rounded-xl border transition-colors shrink-0 mt-1 ${
                bookmarks && isPassageBookmarked(bookmarks, dossier.id)
                  ? "bg-accent/10 border-accent/20 text-accent"
                  : "bg-surface border-border text-text-muted hover:text-accent hover:border-accent/30"
              }`}
              aria-label={
                bookmarks && isPassageBookmarked(bookmarks, dossier.id)
                  ? "Remove bookmark"
                  : "Save for later"
              }
              title={
                bookmarks && isPassageBookmarked(bookmarks, dossier.id)
                  ? "Saved"
                  : "Save for later"
              }
            >
              <Bookmark
                className={`w-5 h-5 ${
                  bookmarks && isPassageBookmarked(bookmarks, dossier.id)
                    ? "fill-current"
                    : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Misuse types */}
        <div className="flex flex-wrap gap-2 mb-8">
          {dossier.misuses.types.map((typeId) => {
            const mt = getMisuseType(typeId);
            if (!mt) return null;
            return (
              <span
                key={typeId}
                className="inline-flex items-center gap-1.5 text-xs font-medium bg-red-400/10 text-red-300 px-3 py-1 rounded-full"
              >
                <AlertTriangle className="w-3 h-3" />
                {mt.name}
              </span>
            );
          })}
        </div>

        {/* Historical / Linguistic Context -- starts open (core content) */}
        <DisclosureSection
          icon={<BookOpen className="w-5 h-5 text-accent" />}
          title="What the Text Actually Says"
          preview={truncate(dossier.context.historicalLinguistic, 120)}
          defaultOpen={true}
        >
          <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
            {dossier.context.historicalLinguistic}
          </p>
        </DisclosureSection>

        {/* Key Terms */}
        {dossier.context.keyTerms.length > 0 && (
          <DisclosureSection
            icon={<Languages className="w-5 h-5 text-accent" />}
            title="Key Terms"
            preview={dossier.context.keyTerms
              .map((t) => `${t.transliteration} (${t.glossRange})`)
              .join(", ")}
          >
            <div className="space-y-4">
              {dossier.context.keyTerms.map((term) => (
                <div
                  key={term.transliteration}
                  className="bg-background rounded-lg p-4"
                >
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="font-serif text-accent text-lg">
                      {term.original}
                    </span>
                    <span className="text-sm text-text-muted italic">
                      {term.transliteration}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-text-muted">
                      {term.language}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mb-1">
                    <span className="font-medium text-text-primary">Range:</span>{" "}
                    {term.glossRange}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {term.significance}
                  </p>
                </div>
              ))}
            </div>
          </DisclosureSection>
        )}

        {/* Translation Issues */}
        {dossier.context.translationIssues && (
          <DisclosureSection
            icon={<BookOpen className="w-5 h-5 text-text-muted" />}
            title="Translation Issues"
            preview={truncate(dossier.context.translationIssues, 120)}
          >
            <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
              {dossier.context.translationIssues}
            </p>
          </DisclosureSection>
        )}

        {/* How It Gets Misused */}
        <DisclosureSection
          icon={<AlertTriangle className="w-5 h-5 text-red-400" />}
          title="How It Gets Misused"
          preview={truncate(dossier.misuses.description, 120)}
          variant="warning"
        >
          <p className="text-sm text-text-secondary leading-relaxed mb-4">
            {dossier.misuses.description}
          </p>
          <div className="bg-background/50 rounded-lg p-4">
            <p className="text-xs uppercase tracking-widest text-text-muted mb-2">
              Real-World Examples
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              {dossier.misuses.concreteExamples}
            </p>
          </div>
        </DisclosureSection>

        {/* Love Impact */}
        <DisclosureSection
          icon={<Heart className="w-5 h-5 text-red-400" />}
          title="How This Distorts Access to God's Love"
          preview={truncate(dossier.loveImpact, 120)}
        >
          <p className="text-sm text-text-secondary leading-relaxed">
            {dossier.loveImpact}
          </p>
        </DisclosureSection>

        {/* Clarified Reading */}
        <DisclosureSection
          icon={<Sparkles className="w-5 h-5 text-accent" />}
          title="A Faithful Reading"
          preview={truncate(dossier.clarifiedReading.reframe, 120)}
          variant="accent"
        >
          <p className="text-sm text-text-secondary leading-relaxed mb-4">
            {dossier.clarifiedReading.reframe}
          </p>
          <blockquote className="border-l-2 border-accent pl-4">
            <p className="font-serif text-text-primary leading-relaxed">
              {dossier.clarifiedReading.appResponse}
            </p>
          </blockquote>
        </DisclosureSection>

        {/* Cross-links */}
        {(() => {
          const relatedWords = getRelatedWords(dossier);
          const relatedCards = getRelatedCardsForPassage(dossier);
          if (relatedWords.length === 0 && relatedCards.length === 0) return null;
          return (
            <section className="bg-surface rounded-xl border border-border p-6 mb-8">
              <h2 className="text-lg font-serif mb-4">Related in The Well</h2>
              {relatedWords.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-accent uppercase tracking-widest font-medium mb-3">
                    Word Corrections
                  </p>
                  <div className="space-y-2">
                    {relatedWords.map((word) => (
                      <Link
                        key={word.id}
                        href={`/words#${word.id}`}
                        className="flex items-center justify-between bg-background rounded-lg p-3 card-hover group"
                      >
                        <div className="flex items-baseline gap-2">
                          <span className="font-serif italic text-accent">
                            {word.transliteration}
                          </span>
                          <span className="text-xs text-text-muted">
                            {word.commonTranslation}
                          </span>
                          <ArrowRight className="w-3 h-3 text-text-muted" />
                          <span className="text-xs text-accent font-medium">
                            {word.actualMeaning}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {relatedCards.length > 0 && (
                <div>
                  <p className="text-xs text-accent uppercase tracking-widest font-medium mb-3">
                    Scripture Cards
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {relatedCards.map((card) => (
                      <Link
                        key={card.id}
                        href="/cards"
                        className="text-xs bg-accent/10 text-accent px-3 py-1.5 rounded-full hover:bg-accent/20 transition-colors"
                      >
                        {card.transliteration || card.verseRef}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </section>
          );
        })()}

        {/* Navigation */}
        <div className="divider-warm mb-4" />
        <div className="flex justify-between items-center pt-4">
          {(() => {
            const idx = allDossiers.findIndex((d) => d.id === dossier.id);
            const prev = idx > 0 ? allDossiers[idx - 1] : null;
            const next = idx < allDossiers.length - 1 ? allDossiers[idx + 1] : null;
            return (
              <>
                {prev ? (
                  <Link
                    href={`/passages/${prev.id}`}
                    className="text-sm text-text-muted hover:text-accent transition-colors"
                  >
                    &larr; {prev.passage}
                  </Link>
                ) : (
                  <span />
                )}
                {next ? (
                  <Link
                    href={`/passages/${next.id}`}
                    className="text-sm text-text-muted hover:text-accent transition-colors"
                  >
                    {next.passage} &rarr;
                  </Link>
                ) : (
                  <span />
                )}
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
