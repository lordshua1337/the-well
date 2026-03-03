"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Search,
  ArrowLeft,
  BookOpen,
  Languages,
  ScrollText,
  FileText,
  X,
} from "lucide-react";
import {
  searchAll,
  getContentStats,
  type SearchResult,
  type SearchResultType,
} from "@/lib/search-engine";

// ---------------------------------------------------------------------------
// Type config
// ---------------------------------------------------------------------------

const TYPE_CONFIG: Record<
  SearchResultType,
  { label: string; color: string; icon: typeof BookOpen }
> = {
  concept: { label: "Concept", color: "#2D6A4F", icon: BookOpen },
  word: { label: "Word", color: "#B68D40", icon: Languages },
  card: { label: "Card", color: "#40916C", icon: ScrollText },
  passage: { label: "Passage", color: "#C1292E", icon: FileText },
};

// ---------------------------------------------------------------------------
// Result Card
// ---------------------------------------------------------------------------

function ResultCard({ result }: { readonly result: SearchResult }) {
  const config = TYPE_CONFIG[result.type];
  const Icon = config.icon;

  return (
    <Link
      href={result.href}
      className="block bg-surface border border-border rounded-xl p-4 hover:border-accent/30 hover:shadow-sm transition-all group"
    >
      <div className="flex items-start gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: config.color + "15", color: config.color }}
        >
          <Icon className="w-4 h-4" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors truncate">
              {result.title}
            </h3>
            <span
              className="text-[10px] font-medium px-1.5 py-0.5 rounded-full flex-shrink-0"
              style={{
                background: config.color + "15",
                color: config.color,
              }}
            >
              {config.label}
            </span>
          </div>

          {result.subtitle && (
            <p className="text-xs text-text-secondary mb-1.5 truncate">
              {result.subtitle}
            </p>
          )}

          <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
            {result.snippet}
          </p>
        </div>
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Filter Pills
// ---------------------------------------------------------------------------

function FilterPills({
  activeFilter,
  counts,
  onFilter,
}: {
  readonly activeFilter: SearchResultType | "all";
  readonly counts: Record<SearchResultType | "all", number>;
  readonly onFilter: (filter: SearchResultType | "all") => void;
}) {
  const filters: Array<{ key: SearchResultType | "all"; label: string }> = [
    { key: "all", label: "All" },
    { key: "concept", label: "Concepts" },
    { key: "word", label: "Words" },
    { key: "card", label: "Cards" },
    { key: "passage", label: "Passages" },
  ];

  return (
    <div className="flex gap-2 flex-wrap">
      {filters.map(({ key, label }) => {
        const count = counts[key];
        const isActive = activeFilter === key;
        const color =
          key === "all" ? "#2D6A4F" : TYPE_CONFIG[key as SearchResultType].color;

        return (
          <button
            key={key}
            onClick={() => onFilter(key)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg transition-colors"
            style={{
              background: isActive ? color + "20" : "transparent",
              color: isActive ? color : "#8A8A8A",
              border: `1px solid ${isActive ? color + "40" : "#E8E2D9"}`,
            }}
          >
            {label} ({count})
          </button>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<SearchResultType | "all">("all");
  const inputRef = useRef<HTMLInputElement>(null);
  const stats = useMemo(() => getContentStats(), []);

  // Focus search input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Check URL for query param
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q) setQuery(q);
  }, []);

  const results = useMemo(() => searchAll(query), [query]);

  const filteredResults = useMemo(() => {
    if (activeFilter === "all") return results;
    return results.filter((r) => r.type === activeFilter);
  }, [results, activeFilter]);

  const counts = useMemo(() => {
    const c: Record<SearchResultType | "all", number> = {
      all: results.length,
      concept: 0,
      word: 0,
      card: 0,
      passage: 0,
    };
    for (const r of results) {
      c[r.type]++;
    }
    return c;
  }, [results]);

  // Reset filter when query changes
  useEffect(() => {
    setActiveFilter("all");
  }, [query]);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link
            href="/"
            className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-warm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-serif font-semibold">Search</h1>
            <p className="text-xs text-text-muted">
              {stats.total} entries across concepts, words, cards, and passages
            </p>
          </div>
        </div>

        {/* Search input */}
        <div className="relative mb-6">
          <div className="flex items-center gap-3 px-4 py-3 bg-surface border border-border rounded-xl focus-within:border-accent/40 focus-within:shadow-sm transition-all">
            <Search className="w-5 h-5 text-text-muted flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search concepts, words, passages..."
              className="flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                className="p-1 rounded text-text-muted hover:text-text-primary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        {query.trim().length >= 2 ? (
          <>
            {/* Filter pills + count */}
            {results.length > 0 && (
              <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
                <FilterPills
                  activeFilter={activeFilter}
                  counts={counts}
                  onFilter={setActiveFilter}
                />
                <p className="text-xs text-text-muted">
                  {filteredResults.length} result
                  {filteredResults.length !== 1 ? "s" : ""}
                </p>
              </div>
            )}

            {/* Result list */}
            {filteredResults.length > 0 ? (
              <div className="flex flex-col gap-2">
                {filteredResults.map((result) => (
                  <ResultCard key={`${result.type}-${result.id}`} result={result} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Search className="w-10 h-10 text-text-muted/30 mx-auto mb-4" />
                <p className="text-sm text-text-muted mb-2">
                  No results for &ldquo;{query}&rdquo;
                </p>
                <p className="text-xs text-text-muted">
                  Try different keywords or check your spelling
                </p>
              </div>
            )}
          </>
        ) : query.trim().length > 0 ? (
          <p className="text-xs text-text-muted text-center py-8">
            Type at least 2 characters to search
          </p>
        ) : (
          /* Empty state -- suggestions */
          <div className="py-8">
            <p className="text-sm text-text-secondary mb-4 text-center">
              Try searching for:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "metanoia",
                "gehenna",
                "love",
                "atonement",
                "hell",
                "sin",
                "grace",
                "baptism",
                "trinity",
                "gnostic",
              ].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-surface border border-border text-text-secondary hover:text-accent hover:border-accent/30 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-2 gap-3">
              <div className="bg-surface border border-border rounded-xl p-4 text-center">
                <p className="text-2xl font-serif font-bold text-accent">
                  {stats.concepts}
                </p>
                <p className="text-xs text-text-muted">Concepts</p>
              </div>
              <div className="bg-surface border border-border rounded-xl p-4 text-center">
                <p className="text-2xl font-serif font-bold text-gold">
                  {stats.words}
                </p>
                <p className="text-xs text-text-muted">Word Corrections</p>
              </div>
              <div className="bg-surface border border-border rounded-xl p-4 text-center">
                <p className="text-2xl font-serif font-bold text-accent-light">
                  {stats.cards}
                </p>
                <p className="text-xs text-text-muted">Scripture Cards</p>
              </div>
              <div className="bg-surface border border-border rounded-xl p-4 text-center">
                <p className="text-2xl font-serif font-bold text-error">
                  {stats.passages}
                </p>
                <p className="text-xs text-text-muted">Passage Dossiers</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
