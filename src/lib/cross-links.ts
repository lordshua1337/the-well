import { wordCorrections, scriptureCards, type WordCorrection, type ScriptureCard } from "./scripture-data";
import { allDossiers } from "./passages";
import type { PassageDossier } from "./passage-types";

/**
 * Find word corrections that share a transliteration with a passage's key terms.
 */
export function getRelatedWords(dossier: PassageDossier): WordCorrection[] {
  const termTranslits = new Set(
    dossier.context.keyTerms
      .map((t) => t.transliteration.toLowerCase())
      .filter(Boolean),
  );

  return wordCorrections.filter((w) =>
    termTranslits.has(w.transliteration.toLowerCase()),
  );
}

/**
 * Find passages whose key terms mention this word correction's transliteration.
 */
export function getRelatedPassages(word: WordCorrection): PassageDossier[] {
  const translit = word.transliteration.toLowerCase();
  if (!translit) return [];

  return allDossiers.filter((d) =>
    d.context.keyTerms.some(
      (t) => t.transliteration.toLowerCase() === translit,
    ),
  );
}

/**
 * Find scripture cards that share a transliteration with a word correction.
 */
export function getRelatedCards(word: WordCorrection): ScriptureCard[] {
  const translit = word.transliteration.toLowerCase();
  if (!translit) return [];

  return scriptureCards.filter(
    (c) => c.transliteration.toLowerCase() === translit,
  );
}

/**
 * Find scripture cards relevant to a passage (by matching key term transliterations).
 */
export function getRelatedCardsForPassage(dossier: PassageDossier): ScriptureCard[] {
  const termTranslits = new Set(
    dossier.context.keyTerms
      .map((t) => t.transliteration.toLowerCase())
      .filter(Boolean),
  );

  return scriptureCards.filter((c) =>
    termTranslits.has(c.transliteration.toLowerCase()),
  );
}
