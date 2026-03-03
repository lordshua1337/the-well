// Living Words progress tracker -- localStorage-backed
// Tracks responses, practice completions, streaks, and lifetime stats
// All operations are immutable -- returns new copies, never mutates

import { getTodayString } from "./living-words-engine";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface LivingWordResponse {
  readonly day: number;
  readonly livingWordId: string;
  readonly response: string;
  readonly completedAt: string;      // ISO datetime
  readonly practiceCompleted: boolean;
}

export interface LivingWordProgress {
  readonly responses: readonly LivingWordResponse[];
  readonly currentStreak: number;
  readonly longestStreak: number;
  readonly totalEngaged: number;
  readonly totalPracticesCompleted: number;
  readonly lastEngagedDate: string;  // "YYYY-MM-DD" or ""
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STORAGE_KEY = "the-well-living-words-progress";

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

function createEmptyProgress(): LivingWordProgress {
  return {
    responses: [],
    currentStreak: 0,
    longestStreak: 0,
    totalEngaged: 0,
    totalPracticesCompleted: 0,
    lastEngagedDate: "",
  };
}

// ---------------------------------------------------------------------------
// Persistence
// ---------------------------------------------------------------------------

export function loadLivingWordProgress(): LivingWordProgress {
  if (typeof window === "undefined") return createEmptyProgress();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createEmptyProgress();
    return JSON.parse(raw) as LivingWordProgress;
  } catch {
    return createEmptyProgress();
  }
}

export function saveLivingWordProgress(progress: LivingWordProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

// ---------------------------------------------------------------------------
// Streak logic
// ---------------------------------------------------------------------------

function getYesterdayString(): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const year = yesterday.getFullYear();
  const month = String(yesterday.getMonth() + 1).padStart(2, "0");
  const day = String(yesterday.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Recalculates streak values from the last engaged date.
 * Returns updated streak counts without mutating the progress.
 */
export function updateStreak(progress: LivingWordProgress): LivingWordProgress {
  const today = getTodayString();
  const yesterday = getYesterdayString();

  // Already engaged today -- streak is current
  if (progress.lastEngagedDate === today) {
    return progress;
  }

  // Last engaged yesterday -- streak continues, not incremented yet
  if (progress.lastEngagedDate === yesterday) {
    return progress;
  }

  // Gap of more than 1 day -- reset streak
  if (progress.lastEngagedDate !== "") {
    return {
      ...progress,
      currentStreak: 0,
    };
  }

  return progress;
}

// ---------------------------------------------------------------------------
// Immutable update operations
// ---------------------------------------------------------------------------

/**
 * Records engagement (a written response or reflection).
 * Increments streak if this is the first engagement today.
 */
export function recordEngagement(
  progress: LivingWordProgress,
  livingWordId: string,
  day: number,
  responseText: string
): LivingWordProgress {
  const today = getTodayString();
  const alreadyEngagedToday = progress.lastEngagedDate === today;

  // Update or insert the response for this day
  const existingIndex = progress.responses.findIndex(
    (r) => r.livingWordId === livingWordId
  );

  const newResponse: LivingWordResponse = {
    day,
    livingWordId,
    response: responseText,
    completedAt: new Date().toISOString(),
    practiceCompleted:
      existingIndex >= 0
        ? progress.responses[existingIndex].practiceCompleted
        : false,
  };

  const updatedResponses =
    existingIndex >= 0
      ? [
          ...progress.responses.slice(0, existingIndex),
          newResponse,
          ...progress.responses.slice(existingIndex + 1),
        ]
      : [...progress.responses, newResponse];

  // Only increment streak and total count on first engagement today
  if (alreadyEngagedToday) {
    return {
      ...progress,
      responses: updatedResponses,
    };
  }

  const yesterday = getYesterdayString();
  const streakContinues = progress.lastEngagedDate === yesterday;
  const newStreak = streakContinues ? progress.currentStreak + 1 : 1;
  const newLongest = Math.max(newStreak, progress.longestStreak);

  return {
    ...progress,
    responses: updatedResponses,
    currentStreak: newStreak,
    longestStreak: newLongest,
    totalEngaged: progress.totalEngaged + 1,
    lastEngagedDate: today,
  };
}

/**
 * Marks the micro-practice as completed for a given entry.
 */
export function completeMicroPractice(
  progress: LivingWordProgress,
  livingWordId: string,
  day: number
): LivingWordProgress {
  const existingIndex = progress.responses.findIndex(
    (r) => r.livingWordId === livingWordId
  );

  if (existingIndex >= 0) {
    // Entry already exists -- update practice flag
    const existing = progress.responses[existingIndex];
    if (existing.practiceCompleted) return progress;

    const updated: LivingWordResponse = {
      ...existing,
      practiceCompleted: true,
    };

    return {
      ...progress,
      responses: [
        ...progress.responses.slice(0, existingIndex),
        updated,
        ...progress.responses.slice(existingIndex + 1),
      ],
      totalPracticesCompleted: progress.totalPracticesCompleted + 1,
    };
  }

  // No existing response -- create one with no text and practice completed
  const newResponse: LivingWordResponse = {
    day,
    livingWordId,
    response: "",
    completedAt: new Date().toISOString(),
    practiceCompleted: true,
  };

  return {
    ...progress,
    responses: [...progress.responses, newResponse],
    totalPracticesCompleted: progress.totalPracticesCompleted + 1,
  };
}

// ---------------------------------------------------------------------------
// Query helpers
// ---------------------------------------------------------------------------

export function getResponseForWord(
  progress: LivingWordProgress,
  livingWordId: string
): LivingWordResponse | undefined {
  return progress.responses.find((r) => r.livingWordId === livingWordId);
}

export function hasEngagedWithWord(
  progress: LivingWordProgress,
  livingWordId: string
): boolean {
  return progress.responses.some((r) => r.livingWordId === livingWordId);
}

export function hasCompletedPractice(
  progress: LivingWordProgress,
  livingWordId: string
): boolean {
  const response = getResponseForWord(progress, livingWordId);
  return response?.practiceCompleted ?? false;
}

export function hasEngagedToday(progress: LivingWordProgress): boolean {
  return progress.lastEngagedDate === getTodayString();
}
