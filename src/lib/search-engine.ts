// Unified search engine for The Well
// Searches across all content types: concepts, word corrections,
// scripture cards, and passage dossiers

import { concepts } from "./concepts";
import { wordCorrections, scriptureCards } from "./scripture-data";
import { allDossiers } from "./passages";

// ---------------------------------------------------------------------------
// Search result types
// ---------------------------------------------------------------------------

export type SearchResultType = "concept" | "word" | "card" | "passage";

export interface SearchResult {
  readonly type: SearchResultType;
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly snippet: string;
  readonly href: string;
  readonly relevance: number; // higher = more relevant
  readonly meta?: string; // category, domain, etc.
}

// ---------------------------------------------------------------------------
// Scoring helpers
// ---------------------------------------------------------------------------

function scoreMatch(text: string, query: string): number {
  const lower = text.toLowerCase();
  const q = query.toLowerCase();

  // Exact match (highest)
  if (lower === q) return 100;

  // Starts with query
  if (lower.startsWith(q)) return 80;

  // Contains as a whole word
  const wordBoundary = new RegExp(`\\b${escapeRegex(q)}\\b`, "i");
  if (wordBoundary.test(text)) return 60;

  // Contains substring
  if (lower.includes(q)) return 40;

  return 0;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function bestScore(fields: string[], query: string): number {
  let best = 0;
  for (const field of fields) {
    const s = scoreMatch(field, query);
    if (s > best) best = s;
  }
  return best;
}

// ---------------------------------------------------------------------------
// Per-type search functions
// ---------------------------------------------------------------------------

function searchConceptsUnified(query: string): readonly SearchResult[] {
  const q = query.toLowerCase();
  const results: SearchResult[] = [];

  for (const c of concepts) {
    const fields = [c.name, c.summary, c.layers.accessible];
    const score = bestScore(fields, query);
    if (score === 0) {
      // Check tags
      const tagMatch = c.lensTags.some((t) => t.toLowerCase().includes(q));
      if (!tagMatch) continue;
    }

    results.push({
      type: "concept",
      id: c.id,
      title: c.name,
      subtitle: "Concept",
      snippet: c.summary,
      href: `/concepts/${c.slug}`,
      relevance: score || 20,
      meta: c.domainId,
    });
  }

  return results;
}

function searchWordsUnified(query: string): readonly SearchResult[] {
  const results: SearchResult[] = [];

  for (const w of wordCorrections) {
    const fields = [
      w.transliteration,
      w.commonTranslation,
      w.actualMeaning,
      w.greek,
      w.explanation,
    ];
    const score = bestScore(fields, query);
    if (score === 0) continue;

    results.push({
      type: "word",
      id: w.id,
      title: `${w.transliteration} (${w.greek})`,
      subtitle: `"${w.commonTranslation}" actually means "${w.actualMeaning}"`,
      snippet: w.explanation.slice(0, 150) + (w.explanation.length > 150 ? "..." : ""),
      href: "/words",
      relevance: score,
    });
  }

  return results;
}

function searchCardsUnified(query: string): readonly SearchResult[] {
  const results: SearchResult[] = [];

  for (const c of scriptureCards) {
    const fields = [
      c.transliteration,
      c.commonTranslation,
      c.actualMeaning,
      c.greek,
      c.verse,
      c.verseRef,
      c.context,
    ];
    const score = bestScore(fields, query);
    if (score === 0) continue;

    results.push({
      type: "card",
      id: c.id,
      title: `${c.transliteration}: ${c.verseRef}`,
      subtitle: `${c.commonTranslation} / ${c.actualMeaning}`,
      snippet: c.context.slice(0, 150) + (c.context.length > 150 ? "..." : ""),
      href: "/cards",
      relevance: score,
      meta: c.category,
    });
  }

  return results;
}

function searchPassagesUnified(query: string): readonly SearchResult[] {
  const results: SearchResult[] = [];

  for (const p of allDossiers) {
    const fields = [
      p.passage,
      p.commonQuoteForm,
      p.clarifiedReading.appResponse,
      p.misuses.description,
      p.loveImpact,
    ];
    const score = bestScore(fields, query);
    if (score === 0) {
      // Check key terms
      const termMatch = p.context.keyTerms.some(
        (t) =>
          t.transliteration.toLowerCase().includes(query.toLowerCase()) ||
          t.original.toLowerCase().includes(query.toLowerCase())
      );
      if (!termMatch) continue;
    }

    const slug = p.passage
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    results.push({
      type: "passage",
      id: p.id,
      title: p.passage,
      subtitle: p.commonQuoteForm.slice(0, 60) + (p.commonQuoteForm.length > 60 ? "..." : ""),
      snippet: p.clarifiedReading.appResponse.slice(0, 150) + "...",
      href: `/passages/${slug}`,
      relevance: score || 20,
      meta: p.priority,
    });
  }

  return results;
}

// ---------------------------------------------------------------------------
// Unified search
// ---------------------------------------------------------------------------

export function searchAll(query: string): readonly SearchResult[] {
  if (!query || query.trim().length < 2) return [];

  const q = query.trim();

  const all = [
    ...searchConceptsUnified(q),
    ...searchWordsUnified(q),
    ...searchCardsUnified(q),
    ...searchPassagesUnified(q),
  ];

  // Sort by relevance (highest first), then alphabetically within same score
  return [...all].sort((a, b) => {
    if (b.relevance !== a.relevance) return b.relevance - a.relevance;
    return a.title.localeCompare(b.title);
  });
}

// ---------------------------------------------------------------------------
// Content stats (for display)
// ---------------------------------------------------------------------------

export function getContentStats() {
  return {
    concepts: concepts.length,
    words: wordCorrections.length,
    cards: scriptureCards.length,
    passages: allDossiers.length,
    total: concepts.length + wordCorrections.length + scriptureCards.length + allDossiers.length,
  };
}
