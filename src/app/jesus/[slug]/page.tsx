"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import {
  getChapterBySlug,
  getNextChapter,
  getPreviousChapter,
  getAllChapters,
  type HumanJesusSection,
} from "@/lib/human-jesus-data";
import {
  loadHumanJesusProgress,
  saveHumanJesusProgress,
  markChapterRead,
  isChapterRead,
  type HumanJesusProgress,
} from "@/lib/human-jesus-progress";
import { GreekTooltip } from "@/components/greek-tooltip";
import { ScholarsNote } from "@/components/scholars-note";

// ---------------------------------------------------------------------------
// Inline Greek term renderer
// Replaces occurrences of transliterated terms in content with tooltip spans.
// This is a simple text-level replacement: if the exact transliteration string
// appears in content and a term is provided, wrap it. For safety, we render
// the content as plain text with terms highlighted at the section level.
// ---------------------------------------------------------------------------

function SectionBody({
  section,
}: {
  section: HumanJesusSection;
}) {
  const paragraphs = section.content.split("\n\n").filter(Boolean);

  return (
    <div className="space-y-5">
      {paragraphs.map((paragraph, i) => (
        <p key={i} className="text-text-secondary leading-relaxed text-base">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function SectionBlock({ section }: { section: HumanJesusSection }) {
  return (
    <div className="mb-16">
      {/* Section title */}
      <h3 className="font-serif font-semibold text-xl mb-6 text-text-primary">
        {section.title}
      </h3>

      {/* Body text */}
      <SectionBody section={section} />

      {/* Pull quote */}
      {section.pullQuote && (
        <blockquote className="my-8 border-l-4 border-accent pl-5">
          <p className="font-serif text-lg italic text-text-primary leading-relaxed">
            &ldquo;{section.pullQuote}&rdquo;
          </p>
        </blockquote>
      )}

      {/* Greek terms */}
      {section.greekTerms && section.greekTerms.length > 0 && (
        <div className="my-6 bg-surface-warm rounded-lg border border-border px-5 py-4">
          <p className="text-[10px] uppercase tracking-widest font-medium text-text-muted mb-3">
            Greek Terms
          </p>
          <div className="space-y-3">
            {section.greekTerms.map((term) => (
              <div key={term.transliteration} className="flex items-start gap-3">
                <span className="font-serif italic text-accent font-medium text-sm shrink-0">
                  <GreekTooltip term={term} />
                </span>
                <span className="text-sm text-text-muted">
                  {term.greek !== term.transliteration && (
                    <span className="font-serif italic text-text-secondary mr-2">
                      ({term.greek})
                    </span>
                  )}
                  {term.meaning}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scholarly note */}
      {section.scholarlyNote && (
        <ScholarsNote content={section.scholarlyNote} />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Related links panel
// ---------------------------------------------------------------------------

function RelatedPanel({
  concepts,
  words,
  dossiers,
}: {
  concepts: readonly string[];
  words: readonly string[];
  dossiers: readonly string[];
}) {
  const hasAny =
    concepts.length > 0 || words.length > 0 || dossiers.length > 0;
  if (!hasAny) return null;

  return (
    <div className="bg-surface-warm rounded-xl border border-border p-5 mt-12">
      <p className="text-xs uppercase tracking-widest font-medium text-text-muted mb-4">
        Dig Deeper
      </p>
      <div className="space-y-4">
        {concepts.length > 0 && (
          <div>
            <p className="text-xs font-medium text-text-secondary mb-2">
              Concepts
            </p>
            <div className="flex flex-wrap gap-2">
              {concepts.map((slug) => (
                <Link
                  key={slug}
                  href={`/concepts/${slug}`}
                  className="text-xs bg-surface border border-border rounded-full px-3 py-1 text-text-secondary hover:text-accent hover:border-accent/30 transition-colors"
                >
                  {slug.replace(/-/g, " ")}
                </Link>
              ))}
            </div>
          </div>
        )}

        {words.length > 0 && (
          <div>
            <p className="text-xs font-medium text-text-secondary mb-2">
              Words
            </p>
            <div className="flex flex-wrap gap-2">
              {words.map((slug) => (
                <Link
                  key={slug}
                  href={`/words/${slug}`}
                  className="text-xs bg-surface border border-border rounded-full px-3 py-1 text-text-secondary hover:text-accent hover:border-accent/30 transition-colors"
                >
                  {slug.replace(/-/g, " ")}
                </Link>
              ))}
            </div>
          </div>
        )}

        {dossiers.length > 0 && (
          <div>
            <p className="text-xs font-medium text-text-secondary mb-2">
              Passages
            </p>
            <div className="flex flex-wrap gap-2">
              {dossiers.map((slug) => (
                <Link
                  key={slug}
                  href={`/passages/${slug}`}
                  className="text-xs bg-surface border border-border rounded-full px-3 py-1 text-text-secondary hover:text-accent hover:border-accent/30 transition-colors"
                >
                  {slug.replace(/-/g, " ")}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Mark as read button
// ---------------------------------------------------------------------------

function MarkReadButton({
  chapterId,
  progress,
  onRead,
}: {
  chapterId: string;
  progress: HumanJesusProgress;
  onRead: (updated: HumanJesusProgress) => void;
}) {
  const alreadyRead = isChapterRead(progress, chapterId);

  function handleClick() {
    const updated = markChapterRead(progress, chapterId);
    saveHumanJesusProgress(updated);
    onRead(updated);
  }

  if (alreadyRead) {
    return (
      <div className="flex items-center gap-2 text-accent text-sm font-medium py-2.5">
        <CheckCircle2 className="w-4 h-4" />
        Chapter marked as read
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-accent-light transition-colors"
    >
      <BookOpen className="w-4 h-4" />
      Mark as Read
    </button>
  );
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const chapter = getChapterBySlug(slug);

  const [progress, setProgress] = useState<HumanJesusProgress | null>(null);

  useEffect(() => {
    setProgress(loadHumanJesusProgress());
  }, []);

  if (!chapter) {
    notFound();
  }

  const allChapters = getAllChapters();
  const nextChapter = getNextChapter(slug);
  const prevChapter = getPreviousChapter(slug);

  function handleRead(updated: HumanJesusProgress) {
    setProgress(updated);
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back link */}
        <Link
          href="/jesus"
          className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-secondary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          All Chapters
        </Link>

        {/* Chapter header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] uppercase tracking-widest font-medium text-text-muted">
              Chapter {chapter.order} of {allChapters.length}
            </span>
            <span
              className="text-[10px] uppercase tracking-widest font-medium px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: `${chapter.color}15`,
                color: chapter.color,
              }}
            >
              The Human Jesus
            </span>
          </div>

          <h1 className="mb-3">{chapter.title}</h1>
          <p className="text-text-secondary text-lg leading-relaxed mb-5">
            {chapter.subtitle}
          </p>

          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Clock className="w-4 h-4" />
            <span>{chapter.estimatedMinutes} min read</span>
            <span className="text-border">|</span>
            <span>{chapter.sections.length} sections</span>
          </div>
        </div>

        <div className="divider-warm mb-12" />

        {/* Sections */}
        <div>
          {chapter.sections.map((section) => (
            <SectionBlock key={section.id} section={section} />
          ))}
        </div>

        {/* Mark as read */}
        {progress && (
          <div className="mt-4 mb-10">
            <MarkReadButton
              chapterId={chapter.id}
              progress={progress}
              onRead={handleRead}
            />
          </div>
        )}

        {/* Related content */}
        <RelatedPanel
          concepts={chapter.linkedConcepts}
          words={chapter.linkedWords}
          dossiers={chapter.linkedDossiers}
        />

        <div className="divider-warm mt-12 mb-8" />

        {/* Prev / Next navigation */}
        <div className="flex items-center justify-between gap-4">
          {prevChapter ? (
            <Link
              href={`/jesus/${prevChapter.slug}`}
              className="group flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>
                <span className="block text-[10px] uppercase tracking-widest mb-0.5">
                  Previous
                </span>
                <span className="font-medium">{prevChapter.title}</span>
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextChapter ? (
            <Link
              href={`/jesus/${nextChapter.slug}`}
              className="group flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors text-right"
            >
              <span>
                <span className="block text-[10px] uppercase tracking-widest mb-0.5">
                  Next
                </span>
                <span className="font-medium">{nextChapter.title}</span>
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ) : (
            <Link
              href="/jesus"
              className="group flex items-center gap-2 text-sm text-accent hover:text-accent-light transition-colors"
            >
              <span className="font-medium">All Chapters</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
