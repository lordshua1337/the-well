// Unified search engine for The Well
// Searches across all content types: concepts, word corrections,
// scripture cards, and passage dossiers

import { concepts } from "./concepts";
import { wordCorrections, scriptureCards } from "./scripture-data";
import { allDossiers } from "./passages";
import { practices } from "./practices-data";
import { humanJesusChapters } from "./human-jesus-data";
import { livingWords } from "./living-words-data";

// ---------------------------------------------------------------------------
// Search result types
// ---------------------------------------------------------------------------

export type SearchResultType =
  | "concept"
  | "word"
  | "card"
  | "passage"
  | "practice"
  | "chapter"
  | "livingword";

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

function searchPracticesUnified(query: string): readonly SearchResult[] {
  const results: SearchResult[] = [];

  for (const p of practices) {
    const fields = [p.title, p.tradition, p.subtitle, p.purpose, p.origin];
    const score = bestScore(fields, query);
    if (score === 0) {
      const tagMatch = p.tags.some((t) =>
        t.toLowerCase().includes(query.toLowerCase())
      );
      if (!tagMatch) continue;
    }

    results.push({
      type: "practice",
      id: p.id,
      title: p.title,
      subtitle: `${p.tradition} tradition -- ${p.difficulty}`,
      snippet: p.subtitle,
      href: `/practices/${p.slug}`,
      relevance: score || 20,
      meta: p.category,
    });
  }

  return results;
}

function searchChaptersUnified(query: string): readonly SearchResult[] {
  const results: SearchResult[] = [];

  for (const ch of humanJesusChapters) {
    const sectionTexts = ch.sections.map((s) => s.title);
    const fields = [ch.title, ch.subtitle, ...sectionTexts];
    const score = bestScore(fields, query);
    if (score === 0) continue;

    results.push({
      type: "chapter",
      id: ch.id,
      title: ch.title,
      subtitle: "The Human Jesus",
      snippet: ch.subtitle,
      href: `/jesus/${ch.slug}`,
      relevance: score,
    });
  }

  return results;
}

function searchLivingWordsUnified(query: string): readonly SearchResult[] {
  const results: SearchResult[] = [];

  for (const lw of livingWords) {
    const fields = [lw.title, lw.prompt, lw.grounding, lw.microPractice];
    const score = bestScore(fields, query);
    if (score === 0) continue;

    results.push({
      type: "livingword",
      id: lw.id,
      title: lw.title,
      subtitle: `Living Word -- Day ${lw.day}`,
      snippet: lw.prompt.slice(0, 150) + (lw.prompt.length > 150 ? "..." : ""),
      href: "/living-words",
      relevance: score,
      meta: lw.category,
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
    ...searchPracticesUnified(q),
    ...searchChaptersUnified(q),
    ...searchLivingWordsUnified(q),
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
    practices: practices.length,
    chapters: humanJesusChapters.length,
    livingWords: livingWords.length,
    total:
      concepts.length +
      wordCorrections.length +
      scriptureCards.length +
      allDossiers.length +
      practices.length +
      humanJesusChapters.length +
      livingWords.length,
  };
}
