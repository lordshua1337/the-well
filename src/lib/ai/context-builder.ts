// Context builder for The Well's RAG system.
// Takes retrieved chunks and formats them into a context block,
// then combines that block with the base system prompt.

import { getBaseSystemPrompt } from "./system-prompt-base";
import { getDirectorSystemPrompt } from "./system-prompt-director";
import { retrieveRelevantChunks } from "./retrieval";
import type { KnowledgeChunk } from "./knowledge-index";

export type AskMode = "scholar" | "director";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ChunksByType = Partial<Record<KnowledgeChunk["type"], KnowledgeChunk[]>>;

// ---------------------------------------------------------------------------
// Context block formatter
// ---------------------------------------------------------------------------

export function buildContextBlock(chunks: readonly KnowledgeChunk[]): string {
  if (chunks.length === 0) return "";

  // Group chunks by type
  const grouped: ChunksByType = {};
  for (const chunk of chunks) {
    if (!grouped[chunk.type]) grouped[chunk.type] = [];
    grouped[chunk.type]!.push(chunk);
  }

  const sections: string[] = [];

  if (grouped.word?.length) {
    sections.push(formatSection("RELEVANT WORD CORRECTIONS", grouped.word));
  }

  if (grouped.card?.length) {
    sections.push(formatSection("RELEVANT SCRIPTURE CARDS", grouped.card));
  }

  if (grouped.passage?.length) {
    sections.push(formatSection("RELEVANT PASSAGE DOSSIERS", grouped.passage));
  }

  if (grouped.concept?.length) {
    sections.push(formatSection("RELEVANT CONCEPTS", grouped.concept));
  }

  if (grouped.practice?.length) {
    sections.push(formatSection("RELEVANT PRACTICES", grouped.practice));
  }

  if (grouped.chapter?.length) {
    sections.push(formatSection("RELEVANT HISTORICAL CHAPTERS", grouped.chapter));
  }

  if (grouped.livingword?.length) {
    sections.push(formatSection("RELEVANT LIVING WORDS", grouped.livingword));
  }

  if (sections.length === 0) return "";

  return `RETRIEVED KNOWLEDGE (use this context to answer the question accurately):\n\n${sections.join("\n\n")}`;
}

// Maximum characters per chunk entry in the context block.
// Keeps individual items readable without letting verbose concepts balloon the prompt.
const MAX_CONTENT_CHARS = 600;

function truncateContent(text: string): string {
  if (text.length <= MAX_CONTENT_CHARS) return text;
  return `${text.slice(0, MAX_CONTENT_CHARS)}...`;
}

function formatSection(heading: string, chunks: KnowledgeChunk[]): string {
  const items = chunks
    .map((c) => `- ${c.title}: ${truncateContent(c.content)}`)
    .join("\n");
  return `${heading}:\n${items}`;
}

// ---------------------------------------------------------------------------
// Full prompt assembler
// ---------------------------------------------------------------------------

export function buildEnhancedSystemPrompt(
  question: string,
  mode: AskMode = "scholar"
): string {
  const chunks = retrieveRelevantChunks(question);
  const contextBlock = buildContextBlock(chunks);

  const base =
    mode === "director" ? getDirectorSystemPrompt() : getBaseSystemPrompt();

  if (!contextBlock) return base;

  return `${base}\n\n${contextBlock}`;
}
