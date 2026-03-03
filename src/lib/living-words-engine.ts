// Living Words engine -- deterministic daily rotation
// Same word for everyone on the same day
// Cycles through all 60 entries before repeating

import { livingWords, type LivingWord } from "./living-words-data";

const TOTAL_DAYS = 60;

// ---------------------------------------------------------------------------
// Epoch -- the fixed starting point for the rotation
// January 1, 2026 = day 1 (perception-1)
// ---------------------------------------------------------------------------

const EPOCH = new Date(2026, 0, 1); // months are 0-indexed in JS

/**
 * Returns a 1-based day number in the 1-60 rotation for a given date.
 * January 1 2026 = day 1, January 2 2026 = day 2, etc.
 * After day 60, wraps back to day 1.
 */
export function getDayNumber(date: Date): number {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);

  const epochNormalized = new Date(EPOCH);
  epochNormalized.setHours(0, 0, 0, 0);

  const diffMs = normalized.getTime() - epochNormalized.getTime();
  const diffDays = Math.floor(diffMs / 86400000);

  // Use modulo to wrap, then convert from 0-based to 1-based
  return ((diffDays % TOTAL_DAYS) + TOTAL_DAYS) % TOTAL_DAYS + 1;
}

/**
 * Returns the Living Word for a specific date.
 * Deterministic: the same date always returns the same word.
 */
export function getLivingWordForDate(date: Date): LivingWord {
  const dayNumber = getDayNumber(date);
  const word = livingWords.find((w) => w.day === dayNumber);

  if (!word) {
    // Fallback: should never happen if data is complete
    return livingWords[0];
  }

  return word;
}

/**
 * Returns today's Living Word based on the current local date.
 */
export function getTodaysLivingWord(): LivingWord {
  return getLivingWordForDate(new Date());
}

/**
 * Returns the date string (YYYY-MM-DD) for a given date.
 * Used for progress tracking keys.
 */
export function toDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Returns today's date string.
 */
export function getTodayString(): string {
  return toDateString(new Date());
}
