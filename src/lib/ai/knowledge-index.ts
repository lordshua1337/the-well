// Knowledge index for RAG (Retrieval Augmented Generation) system
// Pre-computes a flat, searchable index of all content in The Well.
// No external dependencies -- pure in-memory keyword-match retrieval.

import { wordCorrections } from "../words";
import { scriptureCards } from "../scripture-data";
import { concepts } from "../concepts";
import { allDossiers } from "../passages";
import { practices } from "../practices-data";
import { humanJesusChapters } from "../human-jesus-data";
import { livingWords } from "../living-words-data";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface KnowledgeChunk {
  readonly id: string;
  readonly type:
    | "word"
    | "concept"
    | "passage"
    | "card"
    | "practice"
    | "chapter"
    | "livingword";
  readonly title: string;
  readonly tags: readonly string[];
  readonly content: string;
  readonly relevance: number; // Base weight 1-10
}

// ---------------------------------------------------------------------------
// Builders -- one function per content type
// ---------------------------------------------------------------------------

function buildWordChunks(): KnowledgeChunk[] {
  return wordCorrections.map((w) => ({
    id: `word:${w.id}`,
    type: "word" as const,
    title: `${w.transliteration} (${w.commonTranslation} -> ${w.actualMeaning})`,
    tags: [
      w.transliteration.toLowerCase(),
      w.greek.toLowerCase(),
      w.commonTranslation.toLowerCase(),
      w.actualMeaning.toLowerCase(),
      w.category.toLowerCase(),
      // Split multi-word meanings into individual searchable terms
      ...w.actualMeaning.toLowerCase().split(/\s+/),
      ...w.commonTranslation.toLowerCase().split(/\s+/),
      ...w.explanation.toLowerCase().split(/\s+/).slice(0, 20),
    ],
    content: `Greek word "${w.transliteration}" (${w.greek}): commonly translated "${w.commonTranslation}" but actually means "${w.actualMeaning}". ${w.explanation} Key verses: ${w.keyVerses.map((v) => `${v.ref}: "${v.text}"`).join("; ")}`,
    relevance: 9,
  }));
}

function buildCardChunks(): KnowledgeChunk[] {
  return scriptureCards
    .filter((s) => s.verseRef) // skip any blank entries
    .map((s) => ({
      id: `card:${s.id}`,
      type: "card" as const,
      title: `${s.verseRef}${s.transliteration ? ` (${s.transliteration})` : ""}`,
      tags: [
        s.verseRef.toLowerCase(),
        s.category.toLowerCase(),
        ...(s.transliteration ? [s.transliteration.toLowerCase()] : []),
        ...(s.greek ? [s.greek.toLowerCase()] : []),
        ...(s.commonTranslation ? [s.commonTranslation.toLowerCase()] : []),
        ...(s.actualMeaning ? [s.actualMeaning.toLowerCase()] : []),
        // Extract book name and chapter for broader matching
        ...s.verseRef.toLowerCase().split(/[\s:]+/),
      ],
      content: `${s.verseRef}: "${s.verse}". ${s.context}${s.transliteration ? ` [Greek: ${s.transliteration} = "${s.actualMeaning}"]` : ""}`,
      relevance: 8,
    }));
}

function buildConceptChunks(): KnowledgeChunk[] {
  return concepts.map((c) => ({
    id: `concept:${c.id}`,
    type: "concept" as const,
    title: c.name,
    tags: [
      c.name.toLowerCase(),
      c.slug.toLowerCase(),
      c.domainId.toLowerCase(),
      ...c.lensTags.map((t) => t.toLowerCase()),
      ...c.name.toLowerCase().split(/\s+/),
      ...c.summary.toLowerCase().split(/\s+/).slice(0, 25),
      ...c.layers.accessible.toLowerCase().split(/\s+/).slice(0, 30),
    ],
    content: `${c.name}: ${c.summary} ${c.layers.accessible}`,
    relevance: 7,
  }));
}

function buildPassageChunks(): KnowledgeChunk[] {
  return allDossiers.map((d) => ({
    id: `passage:${d.id}`,
    type: "passage" as const,
    title: `${d.passage} -- ${d.commonQuoteForm}`,
    tags: [
      d.passage.toLowerCase(),
      d.commonQuoteForm.toLowerCase(),
      d.id.toLowerCase(),
      ...d.passage.toLowerCase().split(/[\s:]+/),
      ...d.commonQuoteForm.toLowerCase().split(/\s+/),
      ...d.misuses.types.map((t) => t.toLowerCase()),
      ...d.context.keyTerms.map((k) => k.transliteration.toLowerCase()),
      ...d.context.keyTerms.map((k) => k.original.toLowerCase()),
      ...d.clarifiedReading.reframe.toLowerCase().split(/\s+/).slice(0, 20),
    ],
    content: `${d.passage} ("${d.commonQuoteForm}") [Priority: ${d.priority}]. Historical context: ${d.context.historicalLinguistic} Misuse patterns: ${d.misuses.description}. Clarified reading: ${d.clarifiedReading.reframe}`,
    relevance: 9,
  }));
}

function buildPracticeChunks(): KnowledgeChunk[] {
  return practices.map((p) => ({
    id: `practice:${p.id}`,
    type: "practice" as const,
    title: `${p.title} (${p.tradition})`,
    tags: [
      p.title.toLowerCase(),
      p.slug.toLowerCase(),
      p.tradition.toLowerCase(),
      p.category.toLowerCase(),
      ...p.tags.map((t) => t.toLowerCase()),
      ...p.title.toLowerCase().split(/\s+/),
      ...p.purpose.toLowerCase().split(/\s+/).slice(0, 20),
    ],
    content: `${p.title} -- ${p.subtitle}. Tradition: ${p.tradition}. Category: ${p.category}. Purpose: ${p.purpose} Origin: ${p.origin}`,
    relevance: 6,
  }));
}

function buildChapterChunks(): KnowledgeChunk[] {
  return humanJesusChapters.map((ch) => ({
    id: `chapter:${ch.id}`,
    type: "chapter" as const,
    title: `The Human Jesus -- ${ch.title}`,
    tags: [
      ch.title.toLowerCase(),
      ch.slug.toLowerCase(),
      ...ch.title.toLowerCase().split(/\s+/),
      ...ch.subtitle.toLowerCase().split(/\s+/),
      ...ch.linkedConcepts.map((s) => s.toLowerCase()),
      ...ch.linkedWords.map((w) => w.toLowerCase()),
      // Pull key terms from each section's Greek terms
      ...ch.sections.flatMap(
        (s) => s.greekTerms?.map((g) => g.transliteration.toLowerCase()) ?? [],
      ),
    ],
    content: `The Human Jesus, Chapter ${ch.order}: "${ch.title}" -- ${ch.subtitle}. ${ch.sections
      .map((s) => s.title)
      .join(", ")}. ${ch.sections[0]?.content.slice(0, 300) ?? ""}`,
    relevance: 6,
  }));
}

function buildLivingWordChunks(): KnowledgeChunk[] {
  return livingWords.map((lw) => ({
    id: `livingword:${lw.id}`,
    type: "livingword" as const,
    title: `Living Word Day ${lw.day}: ${lw.title}`,
    tags: [
      lw.title.toLowerCase(),
      lw.category.toLowerCase(),
      ...lw.title.toLowerCase().split(/\s+/),
      ...lw.prompt.toLowerCase().split(/\s+/).slice(0, 20),
      ...lw.grounding.toLowerCase().split(/\s+/).slice(0, 15),
      ...(lw.relatedWordId ? [lw.relatedWordId.toLowerCase()] : []),
      ...(lw.relatedConceptSlug ? [lw.relatedConceptSlug.toLowerCase()] : []),
    ],
    content: `${lw.title}: ${lw.prompt} Grounding: ${lw.grounding} Micro-practice: ${lw.microPractice}`,
    relevance: 5,
  }));
}

// ---------------------------------------------------------------------------
// Index assembly
// ---------------------------------------------------------------------------

function buildIndex(): readonly KnowledgeChunk[] {
  return [
    ...buildWordChunks(),
    ...buildCardChunks(),
    ...buildConceptChunks(),
    ...buildPassageChunks(),
    ...buildPracticeChunks(),
    ...buildChapterChunks(),
    ...buildLivingWordChunks(),
  ];
}

// Compute once at module load time -- this is fast, pure data transformation
export const knowledgeIndex: readonly KnowledgeChunk[] = buildIndex();

// ---------------------------------------------------------------------------
// Accessors
// ---------------------------------------------------------------------------

export function getChunkById(id: string): KnowledgeChunk | undefined {
  return knowledgeIndex.find((chunk) => chunk.id === id);
}

export function getChunksByType(
  type: KnowledgeChunk["type"],
): readonly KnowledgeChunk[] {
  return knowledgeIndex.filter((chunk) => chunk.type === type);
}
