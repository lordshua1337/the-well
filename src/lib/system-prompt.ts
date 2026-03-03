// system-prompt.ts -- backward-compatible wrapper
// The RAG system in src/lib/ai/ now handles dynamic prompt assembly.
// This file is kept for backward compatibility and as a fallback.
// New code should use buildEnhancedSystemPrompt from @/lib/ai/context-builder.

import { getBaseSystemPrompt } from "./ai/system-prompt-base";
import { wordCorrections, scriptureCards } from "./scripture-data";
import { misuseTypes } from "./misuse-types";
import { allDossiers } from "./passages";

function buildWordContext(): string {
  return wordCorrections
    .map(
      (w) =>
        `- ${w.transliteration} (${w.greek}): commonly translated "${w.commonTranslation}" but actually means "${w.actualMeaning}". ${w.explanation}`
    )
    .join("\n");
}

function buildScriptureContext(): string {
  return scriptureCards
    .map((s) => {
      const prefix = s.transliteration
        ? `[${s.transliteration}: "${s.commonTranslation}" -> "${s.actualMeaning}"] `
        : "";
      return `${prefix}${s.verseRef}: "${s.verse}" -- ${s.context}`;
    })
    .join("\n");
}

function buildMisuseTypeContext(): string {
  return misuseTypes
    .map(
      (m) =>
        `- ${m.name} (${m.id}): ${m.definition}. Signature: ${m.userSignature}`,
    )
    .join("\n");
}

function buildPassageDossierContext(): string {
  return allDossiers
    .map(
      (d) =>
        `- ${d.passage} ("${d.commonQuoteForm}") [${d.priority}] misuse: ${d.misuses.types.join(", ")} -- Clarified: ${d.clarifiedReading.reframe}`,
    )
    .join("\n");
}

// Full monolithic prompt -- kept for backward compatibility.
// This injects ALL content and is not token-efficient for focused questions.
// Prefer buildEnhancedSystemPrompt() from @/lib/ai/context-builder for new usage.
export function getSystemPrompt(): string {
  const base = getBaseSystemPrompt();

  return `${base}

YOUR KNOWLEDGE BASE:

WORD CORRECTIONS (Greek -> English mistranslations):
${buildWordContext()}

KEY SCRIPTURE PASSAGES WITH ORIGINAL MEANINGS:
${buildScriptureContext()}

SCRIPTURE MISUSE TAXONOMY:
${buildMisuseTypeContext()}

PASSAGE DOSSIERS (commonly misused passages):
${buildPassageDossierContext()}`;
}
