"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Bookmark,
  BookOpen,
  Languages,
  ScrollText,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import {
  loadBookmarks,
  saveBookmarks,
  togglePassageBookmark,
  toggleWordBookmark,
  toggleConceptBookmark,
  type Bookmarks,
} from "@/lib/bookmarks";
import { allDossiers } from "@/lib/passages";
import { wordCorrections } from "@/lib/scripture-data";
import { concepts } from "@/lib/concepts";
import { domains } from "@/lib/domains";

type TabFilter = "all" | "passages" | "words" | "concepts";

function getDomainName(domainId: string): string {
  const domain = domains.find((d) => d.id === domainId);
  return domain ? domain.shortName : domainId;
}

export default function SavedPage() {
  const [bookmarks, setBookmarks] = useState<Bookmarks | null>(null);
  const [tab, setTab] = useState<TabFilter>("all");

  useEffect(() => {
    setBookmarks(loadBookmarks());
  }, []);

  const savedPassages = useMemo(() => {
    if (!bookmarks) return [];
    return allDossiers.filter((d) => bookmarks.passages.includes(d.id));
  }, [bookmarks]);

  const savedWords = useMemo(() => {
    if (!bookmarks) return [];
    return wordCorrections.filter((w) => bookmarks.words.includes(w.id));
  }, [bookmarks]);

  const savedConcepts = useMemo(() => {
    if (!bookmarks) return [];
    return concepts.filter((c) => bookmarks.concepts.includes(c.id));
  }, [bookmarks]);

  const totalSaved =
    savedPassages.length + savedWords.length + savedConcepts.length;

  function handleRemovePassage(passageId: string) {
    if (!bookmarks) return;
    const updated = togglePassageBookmark(bookmarks, passageId);
    saveBookmarks(updated);
    setBookmarks(updated);
  }

  function handleRemoveWord(wordId: string) {
    if (!bookmarks) return;
    const updated = toggleWordBookmark(bookmarks, wordId);
    saveBookmarks(updated);
    setBookmarks(updated);
  }

  function handleRemoveConcept(conceptId: string) {
    if (!bookmarks) return;
    const updated = toggleConceptBookmark(bookmarks, conceptId);
    saveBookmarks(updated);
    setBookmarks(updated);
  }

  const tabs: { key: TabFilter; label: string; count: number }[] = [
    { key: "all", label: "All", count: totalSaved },
    { key: "passages", label: "Passages", count: savedPassages.length },
    { key: "words", label: "Words", count: savedWords.length },
    { key: "concepts", label: "Concepts", count: savedConcepts.length },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs text-accent uppercase tracking-widest font-medium mb-2">
            Your Study List
          </p>
          <h1 className="text-3xl sm:text-4xl mb-3">Saved for Later</h1>
          <p className="text-text-secondary text-sm max-w-lg mx-auto">
            Passages, words, and concepts you&apos;ve bookmarked for deeper
            study. Everything stays on your device.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                tab === t.key
                  ? "bg-accent text-white"
                  : "bg-surface border border-border text-text-secondary hover:border-accent/30"
              }`}
            >
              {t.label} ({t.count})
            </button>
          ))}
        </div>

        <div className="divider-warm mb-6" />

        {/* Empty state */}
        {totalSaved === 0 && (
          <div className="text-center py-20">
            <Bookmark className="w-10 h-10 text-text-muted mx-auto mb-4" />
            <h3 className="text-lg mb-2">Nothing saved yet</h3>
            <p className="text-sm text-text-muted mb-6 max-w-sm mx-auto">
              Tap the bookmark icon on any passage, word, or concept to save it
              here for later study.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/passages"
                className="text-sm bg-surface border border-border px-4 py-2 rounded-lg text-text-secondary hover:border-accent/30 transition-colors"
              >
                Browse Passages
              </Link>
              <Link
                href="/words"
                className="text-sm bg-surface border border-border px-4 py-2 rounded-lg text-text-secondary hover:border-accent/30 transition-colors"
              >
                Browse Words
              </Link>
              <Link
                href="/explore"
                className="text-sm bg-surface border border-border px-4 py-2 rounded-lg text-text-secondary hover:border-accent/30 transition-colors"
              >
                Explore Concepts
              </Link>
            </div>
          </div>
        )}

        {/* Saved Passages */}
        {(tab === "all" || tab === "passages") && savedPassages.length > 0 && (
          <section className="mb-8">
            {tab === "all" && (
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-4 h-4 text-accent" />
                <h2 className="text-sm font-medium text-text-secondary uppercase tracking-wider">
                  Passages ({savedPassages.length})
                </h2>
              </div>
            )}
            <div className="space-y-3">
              {savedPassages.map((dossier) => (
                <div
                  key={dossier.id}
                  className="bg-surface rounded-xl border border-border p-5 card-hover group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <Link
                      href={`/passages/${dossier.id}`}
                      className="flex-1 min-w-0"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <h3 className="font-serif text-lg text-text-primary group-hover:text-accent transition-colors">
                          {dossier.passage}
                        </h3>
                        {dossier.priority === "P1" && (
                          <span className="text-[10px] uppercase tracking-widest font-bold text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full">
                            High Risk
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-text-muted mb-1">
                        &ldquo;{dossier.commonQuoteForm}&rdquo;
                      </p>
                      <p className="text-sm text-text-secondary line-clamp-2">
                        {dossier.clarifiedReading.appResponse}
                      </p>
                    </Link>
                    <button
                      onClick={() => handleRemovePassage(dossier.id)}
                      className="p-2 rounded-lg text-accent hover:bg-accent/10 transition-colors shrink-0"
                      aria-label="Remove bookmark"
                      title="Remove from saved"
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Saved Words */}
        {(tab === "all" || tab === "words") && savedWords.length > 0 && (
          <section className="mb-8">
            {tab === "all" && (
              <div className="flex items-center gap-2 mb-4">
                <Languages className="w-4 h-4 text-accent" />
                <h2 className="text-sm font-medium text-text-secondary uppercase tracking-wider">
                  Words ({savedWords.length})
                </h2>
              </div>
            )}
            <div className="space-y-3">
              {savedWords.map((word) => (
                <div
                  key={word.id}
                  className="bg-surface rounded-xl border border-border p-5 card-hover group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <Link href={`/words#${word.id}`} className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-serif italic text-accent text-lg">
                          {word.transliteration}
                        </span>
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
                    </Link>
                    <button
                      onClick={() => handleRemoveWord(word.id)}
                      className="p-2 rounded-lg text-accent hover:bg-accent/10 transition-colors shrink-0"
                      aria-label="Remove bookmark"
                      title="Remove from saved"
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Saved Concepts */}
        {(tab === "all" || tab === "concepts") &&
          savedConcepts.length > 0 && (
            <section className="mb-8">
              {tab === "all" && (
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-4 h-4 text-accent" />
                  <h2 className="text-sm font-medium text-text-secondary uppercase tracking-wider">
                    Concepts ({savedConcepts.length})
                  </h2>
                </div>
              )}
              <div className="space-y-3">
                {savedConcepts.map((concept) => (
                  <div
                    key={concept.id}
                    className="bg-surface rounded-xl border border-border p-5 card-hover group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <Link
                        href={`/concepts/${concept.slug}`}
                        className="flex-1 min-w-0"
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <h3 className="text-base text-text-primary group-hover:text-accent transition-colors font-medium">
                            {concept.name}
                          </h3>
                          <span className="text-[10px] text-text-muted bg-background px-1.5 py-0.5 rounded">
                            {getDomainName(concept.domainId)}
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary line-clamp-2">
                          {concept.summary}
                        </p>
                      </Link>
                      <button
                        onClick={() => handleRemoveConcept(concept.id)}
                        className="p-2 rounded-lg text-accent hover:bg-accent/10 transition-colors shrink-0"
                        aria-label="Remove bookmark"
                        title="Remove from saved"
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        {/* Count */}
        {totalSaved > 0 && (
          <p className="text-center text-xs text-text-muted mt-8">
            {totalSaved} item{totalSaved !== 1 ? "s" : ""} saved
          </p>
        )}
      </div>
    </div>
  );
}
