export type { WordCorrection, WordCategory } from "./types";
import type { WordCorrection } from "./types";

import { theologicalWords } from "./theological";
import { salvationWords } from "./salvation";
import { powerWords } from "./power";
import { relationalWords } from "./relational";
import { prayerWords } from "./prayer";
import { kingdomWords } from "./kingdom";

export {
  theologicalWords,
  salvationWords,
  powerWords,
  relationalWords,
  prayerWords,
  kingdomWords,
};

export const wordCorrections: WordCorrection[] = [
  ...theologicalWords,
  ...salvationWords,
  ...powerWords,
  ...relationalWords,
  ...prayerWords,
  ...kingdomWords,
];

export function getWordById(id: string): WordCorrection | undefined {
  return wordCorrections.find((w) => w.id === id);
}

export function getWordsByCategory(category: string): WordCorrection[] {
  return wordCorrections.filter((w) => w.category === category);
}

export function searchWords(query: string): WordCorrection[] {
  const q = query.toLowerCase();
  return wordCorrections.filter(
    (w) =>
      w.transliteration.toLowerCase().includes(q) ||
      w.commonTranslation.toLowerCase().includes(q) ||
      w.actualMeaning.toLowerCase().includes(q) ||
      w.greek.toLowerCase().includes(q) ||
      w.explanation.toLowerCase().includes(q)
  );
}
