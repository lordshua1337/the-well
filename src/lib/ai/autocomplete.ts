// Lightweight autocomplete suggestions for the ask page.
// Matches user input against word corrections and passage references.

import { wordCorrections } from "@/lib/words";
import { allDossiers } from "@/lib/passages";

export interface Suggestion {
  readonly type: "word" | "passage";
  readonly label: string;
  readonly query: string;
}

const MAX_SUGGESTIONS = 5;

export function getSuggestions(input: string): readonly Suggestion[] {
  const q = input.toLowerCase().trim();
  if (q.length < 2) return [];

  const results: Suggestion[] = [];

  // Match word corrections
  for (const word of wordCorrections) {
    if (results.length >= MAX_SUGGESTIONS) break;

    const matchesCommon = word.commonTranslation.toLowerCase().includes(q);
    const matchesGreek = word.transliteration.toLowerCase().includes(q);
    const matchesId = word.id.toLowerCase().includes(q);

    if (matchesCommon || matchesGreek || matchesId) {
      results.push({
        type: "word",
        label: `${word.commonTranslation} → ${word.actualMeaning.split("--")[0].trim()}`,
        query: `What does "${word.commonTranslation.toLowerCase()}" actually mean in Greek?`,
      });
    }
  }

  // Match passages
  for (const dossier of allDossiers) {
    if (results.length >= MAX_SUGGESTIONS) break;

    const matchesRef = dossier.passage.toLowerCase().includes(q);
    const matchesQuote = dossier.commonQuoteForm.toLowerCase().includes(q);

    if (matchesRef || matchesQuote) {
      results.push({
        type: "passage",
        label: `${dossier.passage}: "${dossier.commonQuoteForm.slice(0, 60)}${dossier.commonQuoteForm.length > 60 ? "..." : ""}"`,
        query: `"${dossier.commonQuoteForm}"`,
      });
    }
  }

  return results;
}
