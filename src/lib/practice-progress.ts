// Practice Progress Tracker for The Well
// Tracks completed practice sessions, favorites, and session statistics
// All operations are immutable -- returns new copies, never mutates

export interface PracticeLog {
  readonly practiceId: string;
  readonly completedAt: string; // ISO datetime
  readonly durationMinutes: number;
  readonly notes?: string;
}

export interface PracticeProgress {
  readonly logs: readonly PracticeLog[];
  readonly favoritePractices: readonly string[]; // practiceIds
  readonly totalSessions: number;
  readonly totalMinutes: number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STORAGE_KEY = "the-well-practice-progress";

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

function createPracticeProgress(): PracticeProgress {
  return {
    logs: [],
    favoritePractices: [],
    totalSessions: 0,
    totalMinutes: 0,
  };
}

// ---------------------------------------------------------------------------
// LocalStorage persistence
// ---------------------------------------------------------------------------

export function loadPracticeProgress(): PracticeProgress {
  if (typeof window === "undefined") return createPracticeProgress();
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return createPracticeProgress();
  try {
    return JSON.parse(raw) as PracticeProgress;
  } catch {
    return createPracticeProgress();
  }
}

export function savePracticeProgress(progress: PracticeProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

// ---------------------------------------------------------------------------
// Immutable update operations
// ---------------------------------------------------------------------------

export function logPractice(
  progress: PracticeProgress,
  practiceId: string,
  durationMinutes: number,
  notes?: string
): PracticeProgress {
  const entry: PracticeLog = {
    practiceId,
    completedAt: new Date().toISOString(),
    durationMinutes,
    notes,
  };

  return {
    ...progress,
    logs: [...progress.logs, entry],
    totalSessions: progress.totalSessions + 1,
    totalMinutes: progress.totalMinutes + durationMinutes,
  };
}

export function toggleFavorite(
  progress: PracticeProgress,
  practiceId: string
): PracticeProgress {
  const isFavorited = progress.favoritePractices.includes(practiceId);

  if (isFavorited) {
    return {
      ...progress,
      favoritePractices: progress.favoritePractices.filter(
        (id) => id !== practiceId
      ),
    };
  }

  return {
    ...progress,
    favoritePractices: [...progress.favoritePractices, practiceId],
  };
}

// ---------------------------------------------------------------------------
// Query helpers
// ---------------------------------------------------------------------------

export function getSessionsForPractice(
  progress: PracticeProgress,
  practiceId: string
): readonly PracticeLog[] {
  return progress.logs.filter((log) => log.practiceId === practiceId);
}

export function hasPracticeBeenCompleted(
  progress: PracticeProgress,
  practiceId: string
): boolean {
  return progress.logs.some((log) => log.practiceId === practiceId);
}

export function isFavoritePractice(
  progress: PracticeProgress,
  practiceId: string
): boolean {
  return progress.favoritePractices.includes(practiceId);
}

export function getLastSessionForPractice(
  progress: PracticeProgress,
  practiceId: string
): PracticeLog | undefined {
  const sessions = getSessionsForPractice(progress, practiceId);
  return sessions.length > 0 ? sessions[sessions.length - 1] : undefined;
}
