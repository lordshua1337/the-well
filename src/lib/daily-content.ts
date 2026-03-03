// Daily content rotation for The Well
// Cycles through word corrections and passage dossiers deterministically
// Everyone sees the same content on the same day

import { wordCorrections, type WordCorrection } from "./scripture-data";
import { allDossiers } from "./passages";
import type { PassageDossier } from "./passage-types";

export type DailyContentType = "word" | "passage";

export interface DailyWordContent {
  readonly type: "word";
  readonly word: WordCorrection;
  readonly dayIndex: number;
  readonly totalItems: number;
}

export interface DailyPassageContent {
  readonly type: "passage";
  readonly passage: PassageDossier;
  readonly dayIndex: number;
  readonly totalItems: number;
}

export type DailyContent = DailyWordContent | DailyPassageContent;

function getDaysSinceEpoch(): number {
  const epoch = new Date(2026, 0, 1).getTime();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.floor((today.getTime() - epoch) / 86400000);
}

export function getDailyContent(): DailyContent {
  const totalWords = wordCorrections.length;
  const totalPassages = allDossiers.length;
  const totalItems = totalWords + totalPassages;
  const dayIndex = getDaysSinceEpoch() % totalItems;

  // First cycle through words, then passages, then repeat
  if (dayIndex < totalWords) {
    return {
      type: "word",
      word: wordCorrections[dayIndex],
      dayIndex,
      totalItems,
    };
  }

  return {
    type: "passage",
    passage: allDossiers[dayIndex - totalWords],
    dayIndex,
    totalItems,
  };
}

export function getDailyContentForDay(dayOffset: number): DailyContent {
  const totalWords = wordCorrections.length;
  const totalPassages = allDossiers.length;
  const totalItems = totalWords + totalPassages;
  const dayIndex =
    ((getDaysSinceEpoch() + dayOffset) % totalItems + totalItems) % totalItems;

  if (dayIndex < totalWords) {
    return {
      type: "word",
      word: wordCorrections[dayIndex],
      dayIndex,
      totalItems,
    };
  }

  return {
    type: "passage",
    passage: allDossiers[dayIndex - totalWords],
    dayIndex,
    totalItems,
  };
}
