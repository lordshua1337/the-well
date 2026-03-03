// Human Jesus progress tracker -- localStorage-backed
// Tracks which chapters have been read, current position, and timestamps
// All operations return new state -- never mutate existing objects

export interface HumanJesusProgress {
  readonly chaptersRead: readonly string[];
  readonly currentChapterId: string;
  readonly startedAt: string;
  readonly lastReadAt: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STORAGE_KEY = "the-well-human-jesus-progress";
const FIRST_CHAPTER_ID = "ch-1";

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

function createHumanJesusProgress(): HumanJesusProgress {
  return {
    chaptersRead: [],
    currentChapterId: FIRST_CHAPTER_ID,
    startedAt: new Date().toISOString(),
    lastReadAt: new Date().toISOString(),
  };
}

// ---------------------------------------------------------------------------
// LocalStorage persistence
// ---------------------------------------------------------------------------

export function loadHumanJesusProgress(): HumanJesusProgress {
  if (typeof window === "undefined") return createHumanJesusProgress();
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return createHumanJesusProgress();
  try {
    return JSON.parse(raw) as HumanJesusProgress;
  } catch {
    return createHumanJesusProgress();
  }
}

export function saveHumanJesusProgress(progress: HumanJesusProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

// ---------------------------------------------------------------------------
// Immutable update operations
// ---------------------------------------------------------------------------

export function markChapterRead(
  progress: HumanJesusProgress,
  chapterId: string
): HumanJesusProgress {
  if (progress.chaptersRead.includes(chapterId)) {
    return {
      ...progress,
      currentChapterId: chapterId,
      lastReadAt: new Date().toISOString(),
    };
  }
  return {
    ...progress,
    chaptersRead: [...progress.chaptersRead, chapterId],
    currentChapterId: chapterId,
    lastReadAt: new Date().toISOString(),
  };
}

// ---------------------------------------------------------------------------
// Query helpers
// ---------------------------------------------------------------------------

export function isChapterRead(
  progress: HumanJesusProgress,
  chapterId: string
): boolean {
  return progress.chaptersRead.includes(chapterId);
}

export function getReadCount(progress: HumanJesusProgress): number {
  return progress.chaptersRead.length;
}

export function getProgressPercent(
  progress: HumanJesusProgress,
  totalChapters: number
): number {
  if (totalChapters === 0) return 0;
  return Math.round((progress.chaptersRead.length / totalChapters) * 100);
}
