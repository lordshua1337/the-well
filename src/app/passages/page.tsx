"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import { AlertTriangle, BookOpen, Shield, Search, CheckCircle2, Bookmark } from "lucide-react";
import { allDossiers } from "@/lib/passages";
import { misuseTypes } from "@/lib/misuse-types";
import { loadProgress, type ReadingProgress } from "@/lib/reading-progress";
import {
  loadBookmarks,
  saveBookmarks,
  togglePassageBookmark,
  isPassageBookmarked,
  type Bookmarks,
} from "@/lib/bookmarks";

type FilterMode = "all" | "P1" | "P2" | "saved" | string;

const CATEGORY_LABELS: Record<string, string> = {
  "text-level": "Text-Level Errors",
  "context-level": "Context-Level Errors",
  "ethics-pastoral": "Ethics / Pastoral Errors",
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "text-level": <BookOpen className="w-4 h-4" />,
  "context-level": <AlertTriangle className="w-4 h-4" />,
  "ethics-pastoral": <Shield className="w-4 h-4" />,
};

function getMisuseTypeName(id: string): string {
  const mt = misuseTypes.find((m) => m.id === id);
  return mt ? mt.name : id;
}

function getMisuseTypeCategory(id: string): string {
  const mt = misuseTypes.find((m) => m.id === id);
  return mt ? mt.category : "text-level";
}

export default function PassagesPage() {
  const [filter, setFilter] = useState<FilterMode>("all");
  const [search, setSearch] = useState("");
  const [progress, setProgress] = useState<ReadingProgress | null>(null);
  const [bookmarks, setBookmarks] = useState<Bookmarks | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
    setBookmarks(loadBookmarks());
  }, []);

  const handleToggleBookmark = useCallback(
    (e: React.MouseEvent, passageId: string) => {
      e.preventDefault();
      e.stopPropagation();
      if (!bookmarks) return;
      const updated = togglePassageBookmark(bookmarks, passageId);
      saveBookmarks(updated);
      setBookmarks(updated);
    },
    [bookmarks],
  );

  const savedCount = bookmarks?.passages.length ?? 0;

  const filtered = useMemo(() => {
    let results = [...allDossiers];

    if (filter === "saved") {
      results = results.filter(
        (d) => bookmarks !== null && bookmarks.passages.includes(d.id),
      );
    } else if (filter === "P1") {
      results = results.filter((d) => d.priority === "P1");
    } else if (filter === "P2") {
      results = results.filter((d) => d.priority === "P2");
    } else if (filter !== "all") {
      results = results.filter((d) => d.misuses.types.includes(filter));
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(
        (d) =>
          d.passage.toLowerCase().includes(q) ||
          d.commonQuoteForm.toLowerCase().includes(q) ||
          d.clarifiedReading.appResponse.toLowerCase().includes(q),
      );
    }

    return results;
  }, [filter, search, bookmarks]);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs text-accent uppercase tracking-widest font-medium mb-2">
            Scripture Misuse Dossiers
          </p>
          <h1 className="text-3xl sm:text-4xl mb-3">
            Passages That Get Misused
          </h1>
          <p className="text-text-secondary text-sm max-w-lg mx-auto">
            Commonly quoted, frequently misapplied. Each dossier shows the
            original context, how the passage gets misused, and what a faithful
            reading looks like.
          </p>
        </div>

        {/* Progress bar */}
        {progress && progress.passages.length > 0 && (
          <div className="bg-surface rounded-xl border border-border p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-text-secondary">
                Reading Progress
              </span>
              <span className="text-xs text-accent font-medium">
                {progress.passages.length} / {allDossiers.length} read
              </span>
            </div>
            <div className="w-full h-1.5 bg-background rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-500"
                style={{
                  width: `${Math.round((progress.passages.length / allDossiers.length) * 100)}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search passages..."
            className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filter === "all"
                ? "bg-accent text-white"
                : "bg-surface border border-border text-text-secondary hover:border-accent/30"
            }`}
          >
            All ({allDossiers.length})
          </button>
          {savedCount > 0 && (
            <button
              onClick={() => setFilter("saved")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors inline-flex items-center gap-1 ${
                filter === "saved"
                  ? "bg-accent text-white"
                  : "bg-surface border border-border text-text-secondary hover:border-accent/30"
              }`}
            >
              <Bookmark className="w-3 h-3" />
              Saved ({savedCount})
            </button>
          )}
          <button
            onClick={() => setFilter("P1")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filter === "P1"
                ? "bg-accent text-white"
                : "bg-surface border border-border text-text-secondary hover:border-accent/30"
            }`}
          >
            High Risk ({allDossiers.filter((d) => d.priority === "P1").length})
          </button>
          {misuseTypes.slice(0, 6).map((mt) => {
            const count = allDossiers.filter((d) =>
              d.misuses.types.includes(mt.id),
            ).length;
            if (count === 0) return null;
            return (
              <button
                key={mt.id}
                onClick={() => setFilter(mt.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  filter === mt.id
                    ? "bg-accent text-white"
                    : "bg-surface border border-border text-text-secondary hover:border-accent/30"
                }`}
              >
                {mt.name} ({count})
              </button>
            );
          })}
        </div>

        <div className="divider-warm mb-6" />

        {/* Results */}
        <div className="space-y-3">
          {filtered.map((dossier) => (
            <Link
              key={dossier.id}
              href={`/passages/${dossier.id}`}
              className="block bg-surface rounded-xl border border-border p-5 card-hover group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="font-serif text-lg text-text-primary group-hover:text-accent transition-colors">
                      {dossier.passage}
                    </h3>
                    {dossier.priority === "P1" && (
                      <span className="text-[10px] uppercase tracking-widest font-bold text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full">
                        High Risk
                      </span>
                    )}
                    {progress?.passages.includes(dossier.id) && (
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-text-muted mb-2">
                    &ldquo;{dossier.commonQuoteForm}&rdquo;
                  </p>
                  <p className="text-sm text-text-secondary line-clamp-2">
                    {dossier.clarifiedReading.appResponse}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button
                    onClick={(e) => handleToggleBookmark(e, dossier.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      bookmarks && isPassageBookmarked(bookmarks, dossier.id)
                        ? "text-accent"
                        : "text-text-muted opacity-0 group-hover:opacity-100"
                    } hover:bg-accent/10`}
                    aria-label={
                      bookmarks && isPassageBookmarked(bookmarks, dossier.id)
                        ? "Remove bookmark"
                        : "Save for later"
                    }
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        bookmarks && isPassageBookmarked(bookmarks, dossier.id)
                          ? "fill-current"
                          : ""
                      }`}
                    />
                  </button>
                  <div className="flex flex-wrap gap-1 max-w-[140px]">
                    {dossier.misuses.types.map((typeId) => (
                      <span
                        key={typeId}
                        className="text-[10px] text-text-muted bg-background px-1.5 py-0.5 rounded"
                      >
                        {getMisuseTypeName(typeId)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-text-muted">
            No passages match your search.
          </div>
        )}

        {/* Count */}
        <p className="text-center text-xs text-text-muted mt-8">
          {filtered.length} of {allDossiers.length} passages shown
        </p>
      </div>
    </div>
  );
}
