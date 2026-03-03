// Retrieval engine for The Well's RAG system
// Keyword + tag matching -- no external deps, runs at request time.
// Strategy: tokenize the question, score every chunk, return top N.

import { knowledgeIndex, type KnowledgeChunk } from "./knowledge-index";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DEFAULT_MAX_CHUNKS = 10;

// Words too common to be useful search signals
const STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for",
  "of", "with", "by", "from", "is", "was", "are", "were", "be", "been",
  "have", "has", "had", "do", "does", "did", "will", "would", "could",
  "should", "may", "might", "can", "what", "which", "who", "how", "why",
  "when", "where", "that", "this", "these", "those", "it", "its", "i",
  "you", "he", "she", "we", "they", "me", "him", "her", "us", "them",
  "my", "your", "his", "our", "their", "about", "up", "out", "so", "if",
  "as", "not", "no", "than", "then", "just", "also", "more", "some",
  "any", "all", "said", "say", "says", "like", "really", "actually",
  "mean", "means", "tell", "explain", "know", "think", "jesus", "god",
  "bible", "scripture", "text", "verse", "word", "greek",
]);

// Cross-reference map: if these exact terms appear in the question, also pull
// chunks of these types so the response is richer.
const CROSS_REF_TRIGGERS: Record<string, readonly KnowledgeChunk["type"][]> = {
  sin: ["word", "passage", "card"],
  hamartia: ["word", "passage", "card"],
  repent: ["word", "passage"],
  metanoia: ["word", "passage"],
  hell: ["word", "card"],
  gehenna: ["word", "card"],
  love: ["word", "card"],
  agape: ["word", "card"],
  faith: ["word", "card"],
  pistis: ["word", "card"],
  salvation: ["word", "concept"],
  "kingdom of god": ["card", "concept", "passage"],
  kingdom: ["card", "concept", "passage"],
  forgive: ["word", "passage"],
  church: ["word", "concept"],
  ekklesia: ["word"],
  logos: ["word", "card"],
  eternal: ["word", "card"],
  aionios: ["word"],
  perfect: ["word", "card"],
  teleios: ["word"],
  power: ["word"],
  sozo: ["word"],
  "turn the other cheek": ["passage"],
  slave: ["word", "card"],
  doulos: ["word", "card"],
  thomas: ["card", "concept"],
  "gospel of thomas": ["card", "concept"],
  gnostic: ["card", "concept"],
  documentary: ["concept"],
  "documentary hypothesis": ["concept"],
  paul: ["concept"],
  historical: ["chapter", "concept"],
  practice: ["practice"],
  meditation: ["practice"],
  prayer: ["practice"],
  silence: ["practice"],
  contemplative: ["practice", "concept"],
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function extractSearchTerms(question: string): readonly string[] {
  const lowered = question.toLowerCase();

  // Pull multi-word phrases first (check against cross-ref triggers)
  const phrases: string[] = [];
  for (const phrase of Object.keys(CROSS_REF_TRIGGERS)) {
    if (phrase.includes(" ") && lowered.includes(phrase)) {
      phrases.push(phrase);
    }
  }

  // Tokenize: split on non-word chars, drop stop words and short tokens
  const tokens = lowered
    .split(/[^a-z0-9'-]+/)
    .filter((t) => t.length >= 3 && !STOP_WORDS.has(t));

  // Deduplicate while preserving order
  const seen = new Set<string>();
  const unique: string[] = [];
  for (const t of [...phrases, ...tokens]) {
    if (!seen.has(t)) {
      seen.add(t);
      unique.push(t);
    }
  }

  return unique;
}

export function retrieveRelevantChunks(
  question: string,
  maxChunks: number = DEFAULT_MAX_CHUNKS,
): readonly KnowledgeChunk[] {
  const terms = extractSearchTerms(question);

  if (terms.length === 0) {
    // Fall back to a broad set of high-relevance word and passage chunks
    return knowledgeIndex
      .filter((c) => c.type === "word" || c.type === "passage")
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, maxChunks);
  }

  // Score every chunk against extracted terms
  const scored = scoreChunks(knowledgeIndex, terms);

  // Determine which cross-ref types to add based on matched trigger terms
  const crossRefTypes = getCrossRefTypes(terms);

  // Collect cross-reference boosts: pull top chunks of triggered types
  // that weren't already in the top scored set
  const topIds = new Set(scored.slice(0, maxChunks).map((s) => s.chunk.id));
  const crossRefBoosts = collectCrossRefChunks(crossRefTypes, topIds, scored);

  // Merge: scored results + cross-ref boosts, then trim to maxChunks
  const merged = mergeResults(scored, crossRefBoosts, maxChunks);

  return merged.map((s) => s.chunk);
}

// ---------------------------------------------------------------------------
// Scoring logic
// ---------------------------------------------------------------------------

interface ScoredChunk {
  readonly chunk: KnowledgeChunk;
  readonly score: number;
}

function scoreChunks(
  chunks: readonly KnowledgeChunk[],
  terms: readonly string[],
): ScoredChunk[] {
  const results: ScoredChunk[] = [];

  for (const chunk of chunks) {
    const score = computeScore(chunk, terms);
    if (score > 0) {
      results.push({ chunk, score });
    }
  }

  // Sort by score DESC, then by base relevance DESC as tiebreaker
  return results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.chunk.relevance - a.chunk.relevance;
  });
}

function computeScore(chunk: KnowledgeChunk, terms: readonly string[]): number {
  let score = 0;
  const tagSet = chunk.tags;

  for (const term of terms) {
    for (const tag of tagSet) {
      if (tag === term) {
        // Exact match is highest value
        score += 10;
      } else if (tag.includes(term) && !tag.startsWith(term)) {
        // Mid-string substring match (lower confidence)
        score += 3;
      } else if (tag.startsWith(term) || term.startsWith(tag)) {
        // Prefix match (word boundary approximation, higher confidence than mid-string)
        score += 5;
      }
    }

    // Also check the chunk title for matches (case insensitive)
    const titleLower = chunk.title.toLowerCase();
    if (titleLower === term) {
      score += 8;
    } else if (titleLower.includes(term)) {
      score += 4;
    }
  }

  // Weight by the chunk's base relevance (0.5 - 1.0 multiplier range)
  const relevanceMultiplier = 0.5 + chunk.relevance / 20;
  return Math.round(score * relevanceMultiplier);
}

// ---------------------------------------------------------------------------
// Cross-reference expansion
// ---------------------------------------------------------------------------

function getCrossRefTypes(terms: readonly string[]): Set<KnowledgeChunk["type"]> {
  const types = new Set<KnowledgeChunk["type"]>();
  for (const term of terms) {
    const triggered = CROSS_REF_TRIGGERS[term];
    if (triggered) {
      for (const t of triggered) types.add(t);
    }
  }
  return types;
}

function collectCrossRefChunks(
  crossRefTypes: Set<KnowledgeChunk["type"]>,
  primaryIds: ReadonlySet<string>,
  allScored: ScoredChunk[],
): ScoredChunk[] {
  if (crossRefTypes.size === 0) return [];

  // Pull up to 2 additional chunks per triggered type, preferring scored ones.
  // mergeResults handles final deduplication -- no mutation needed here.
  const extras: ScoredChunk[] = [];
  const addedIds = new Set<string>(primaryIds);

  for (const type of crossRefTypes) {
    const typed = allScored.filter(
      (s) => s.chunk.type === type && !addedIds.has(s.chunk.id),
    );
    // Take the best scoring from this type that isn't already captured
    const toAdd = typed.slice(0, 2);
    for (const item of toAdd) {
      extras.push(item);
      addedIds.add(item.chunk.id);
    }
  }
  return extras;
}

function mergeResults(
  scored: ScoredChunk[],
  crossRefBoosts: ScoredChunk[],
  maxChunks: number,
): ScoredChunk[] {
  const seen = new Set<string>();
  const merged: ScoredChunk[] = [];

  // Add top scored first
  for (const s of scored) {
    if (merged.length >= maxChunks) break;
    if (!seen.has(s.chunk.id)) {
      merged.push(s);
      seen.add(s.chunk.id);
    }
  }

  // Fill remaining slots with cross-ref boosts
  for (const s of crossRefBoosts) {
    if (merged.length >= maxChunks) break;
    if (!seen.has(s.chunk.id)) {
      merged.push(s);
      seen.add(s.chunk.id);
    }
  }

  return merged;
}
