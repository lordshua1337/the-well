"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lock,
  Clock,
  ScrollText,
  Globe,
  MessageCircle,
  Zap,
  Users,
  Landmark,
  Sunrise,
  Eye,
} from "lucide-react";
import {
  getAllChapters,
  type HumanJesusChapter,
} from "@/lib/human-jesus-data";
import {
  loadHumanJesusProgress,
  isChapterRead,
  getProgressPercent,
  type HumanJesusProgress,
} from "@/lib/human-jesus-progress";

// Map icon string names to Lucide components
const iconMap: Record<string, React.ReactNode> = {
  ScrollText: <ScrollText className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
  MessageCircle: <MessageCircle className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  Landmark: <Landmark className="w-5 h-5" />,
  Sunrise: <Sunrise className="w-5 h-5" />,
  Eye: <Eye className="w-5 h-5" />,
};

function ChapterIcon({ name }: { name: string }) {
  return <>{iconMap[name] || <ScrollText className="w-5 h-5" />}</>;
}

// A chapter is unlocked if the previous chapter has been read (sequential unlock)
function isChapterUnlocked(
  chapter: HumanJesusChapter,
  chapters: readonly HumanJesusChapter[],
  progress: HumanJesusProgress
): boolean {
  if (chapter.order === 1) return true;
  const previous = chapters.find((c) => c.order === chapter.order - 1);
  if (!previous) return true;
  return isChapterRead(progress, previous.id);
}

function ChapterCard({
  chapter,
  index,
  progress,
  chapters,
}: {
  chapter: HumanJesusChapter;
  index: number;
  progress: HumanJesusProgress;
  chapters: readonly HumanJesusChapter[];
}) {
  const read = isChapterRead(progress, chapter.id);
  const unlocked = isChapterUnlocked(chapter, chapters, progress);
  const isCurrent = progress.currentChapterId === chapter.id && !read;

  return (
    <div className="relative">
      {/* Vertical connector line between chapters */}
      {index < chapters.length - 1 && (
        <div
          className={`absolute left-7 top-[4.5rem] w-0.5 h-6 ${
            read ? "bg-accent" : "bg-border"
          }`}
        />
      )}

      <Link
        href={unlocked ? `/jesus/${chapter.slug}` : "#"}
        onClick={(e) => {
          if (!unlocked) e.preventDefault();
        }}
        className={`group flex items-start gap-4 p-5 rounded-xl border transition-all ${
          !unlocked
            ? "opacity-40 cursor-not-allowed bg-surface/40 border-border"
            : read
              ? "bg-accent/5 border-accent/20 hover:border-accent/40"
              : isCurrent
                ? "bg-surface border-accent/40 shadow-sm"
                : "bg-surface border-border card-hover"
        }`}
      >
        {/* Chapter number / status icon */}
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 text-sm font-bold font-mono ${
            read
              ? "bg-accent text-white"
              : unlocked
                ? ""
                : "bg-surface-warm text-text-muted"
          }`}
          style={
            unlocked && !read
              ? {
                  backgroundColor: `${chapter.color}15`,
                  color: chapter.color,
                }
              : undefined
          }
        >
          {read ? (
            <CheckCircle2 className="w-6 h-6" />
          ) : !unlocked ? (
            <Lock className="w-4 h-4" />
          ) : (
            <ChapterIcon name={chapter.icon} />
          )}
        </div>

        {/* Chapter content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-widest font-medium text-text-muted">
              Chapter {chapter.order}
            </span>
            {read && (
              <span className="text-[10px] uppercase tracking-widest font-bold text-accent">
                Read
              </span>
            )}
            {isCurrent && (
              <span className="text-[10px] uppercase tracking-widest font-bold text-accent">
                Current
              </span>
            )}
          </div>

          <h3
            className={`font-serif font-semibold text-base mb-1 leading-snug ${
              unlocked
                ? "group-hover:text-accent transition-colors"
                : "text-text-muted"
            }`}
          >
            {chapter.title}
          </h3>

          <p className="text-xs text-text-muted leading-relaxed mb-3">
            {chapter.subtitle}
          </p>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[11px] text-text-muted">
              <Clock className="w-3 h-3" />
              {chapter.estimatedMinutes} min
            </span>
            <span className="text-[11px] text-text-muted">
              {chapter.sections.length} sections
            </span>
          </div>
        </div>

        {/* Arrow */}
        {unlocked && (
          <ArrowRight className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-5" />
        )}
      </Link>
    </div>
  );
}

export default function JesusIndexPage() {
  const [progress, setProgress] = useState<HumanJesusProgress | null>(null);
  const chapters = getAllChapters();

  useEffect(() => {
    setProgress(loadHumanJesusProgress());
  }, []);

  const totalChapters = chapters.length;
  const completionPercent = progress
    ? getProgressPercent(progress, totalChapters)
    : 0;
  const chaptersRead = progress?.chaptersRead.length ?? 0;

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
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
            Documentary Series
          </p>
          <h1 className="mb-4">The Human Jesus</h1>
          <p className="text-text-secondary leading-relaxed text-base max-w-xl">
            Eight chapters. One question: who was the actual person behind two
            thousand years of interpretation? This is a documentary, not a
            devotional. We follow the evidence.
          </p>
        </div>

        {/* Progress bar -- only shown once reading has started */}
        {progress && chaptersRead > 0 && (
          <div className="bg-surface rounded-xl border border-border p-5 mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">Your Progress</span>
              <span className="text-sm text-accent font-mono">
                {completionPercent}%
              </span>
            </div>
            <div className="w-full h-2 bg-surface-warm rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-500"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
            <p className="text-xs text-text-muted mt-2">
              {chaptersRead} of {totalChapters} chapters read
            </p>
          </div>
        )}

        {/* Chapter list */}
        <div className="space-y-3">
          {chapters.map((chapter, index) => (
            <ChapterCard
              key={chapter.id}
              chapter={chapter}
              index={index}
              progress={progress ?? loadHumanJesusProgress()}
              chapters={chapters}
            />
          ))}
        </div>

        <div className="divider-warm mt-12 mb-8" />

        {/* Footer note */}
        <div className="text-center">
          <p className="text-text-muted text-sm max-w-md mx-auto leading-relaxed">
            This series draws on the work of Bart Ehrman, John Dominic
            Crossan, E.P. Sanders, N.T. Wright, Amy-Jill Levine, and others.
            Scholarly sources are cited within each chapter.
          </p>
        </div>
      </div>
    </div>
  );
}
