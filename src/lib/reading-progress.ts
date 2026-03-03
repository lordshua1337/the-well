// Reading Progress Tracker for The Well
// Tracks which passages, concepts, words, and cards have been read
// All operations are immutable -- returns new state

export interface ReadingProgress {
  readonly passages: readonly string[]; // dossier IDs
  readonly concepts: readonly string[]; // concept IDs
  readonly words: readonly string[]; // word correction IDs
  readonly lastReadAt: string; // ISO date of last read
  readonly startedAt: string; // ISO date when tracking began
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STORAGE_KEY = "thewell_reading_progress";

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

function createProgress(): ReadingProgress {
  return {
    passages: [],
    concepts: [],
    words: [],
    lastReadAt: new Date().toISOString(),
    startedAt: new Date().toISOString(),
  };
}

// ---------------------------------------------------------------------------
// LocalStorage persistence
// ---------------------------------------------------------------------------

export function loadProgress(): ReadingProgress {
  if (typeof window === "undefined") return createProgress();
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return createProgress();
  try {
    return JSON.parse(raw) as ReadingProgress;
  } catch {
    return createProgress();
  }
}

export function saveProgress(progress: ReadingProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function resetProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

// ---------------------------------------------------------------------------
// Immutable update operations
// ---------------------------------------------------------------------------

export function markPassageRead(
  progress: ReadingProgress,
  passageId: string
): ReadingProgress {
  if (progress.passages.includes(passageId)) return progress;
  return {
    ...progress,
    passages: [...progress.passages, passageId],
    lastReadAt: new Date().toISOString(),
  };
}

export function markConceptRead(
  progress: ReadingProgress,
  conceptId: string
): ReadingProgress {
  if (progress.concepts.includes(conceptId)) return progress;
  return {
    ...progress,
    concepts: [...progress.concepts, conceptId],
    lastReadAt: new Date().toISOString(),
  };
}

export function markWordRead(
  progress: ReadingProgress,
  wordId: string
): ReadingProgress {
  if (progress.words.includes(wordId)) return progress;
  return {
    ...progress,
    words: [...progress.words, wordId],
    lastReadAt: new Date().toISOString(),
  };
}

// ---------------------------------------------------------------------------
// Query helpers
// ---------------------------------------------------------------------------

export function isPassageRead(
  progress: ReadingProgress,
  passageId: string
): boolean {
  return progress.passages.includes(passageId);
}

export function isConceptRead(
  progress: ReadingProgress,
  conceptId: string
): boolean {
  return progress.concepts.includes(conceptId);
}

export function isWordRead(
  progress: ReadingProgress,
  wordId: string
): boolean {
  return progress.words.includes(wordId);
}

export function getStats(
  progress: ReadingProgress,
  totals: { passages: number; concepts: number; words: number }
): {
  passagesRead: number;
  conceptsRead: number;
  wordsRead: number;
  totalRead: number;
  totalAvailable: number;
  percentComplete: number;
} {
  const passagesRead = progress.passages.length;
  const conceptsRead = progress.concepts.length;
  const wordsRead = progress.words.length;
  const totalRead = passagesRead + conceptsRead + wordsRead;
  const totalAvailable = totals.passages + totals.concepts + totals.words;
  const percentComplete =
    totalAvailable > 0 ? Math.round((totalRead / totalAvailable) * 100) : 0;

  return {
    passagesRead,
    conceptsRead,
    wordsRead,
    totalRead,
    totalAvailable,
    percentComplete,
  };
}
