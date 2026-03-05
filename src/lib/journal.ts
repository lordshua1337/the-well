// Journal -- personal study journal for free-form entries + plan reflections

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface FreeJournalEntry {
  readonly id: string;
  readonly text: string;
  readonly tags: readonly JournalTag[];
  readonly createdAt: string;
}

export interface JournalTag {
  readonly type: "concept" | "passage" | "word" | "practice" | "plan";
  readonly id: string;
  readonly label: string;
}

export interface JournalState {
  readonly entries: readonly FreeJournalEntry[];
}

// ---------------------------------------------------------------------------
// Storage
// ---------------------------------------------------------------------------

const STORAGE_KEY = "the-well-journal";

export function loadJournal(): JournalState {
  if (typeof window === "undefined") return { entries: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { entries: [] };
    return JSON.parse(raw) as JournalState;
  } catch {
    return { entries: [] };
  }
}

function saveJournal(state: JournalState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage full
  }
}

// ---------------------------------------------------------------------------
// Operations (immutable)
// ---------------------------------------------------------------------------

export function addEntry(
  state: JournalState,
  text: string,
  tags: readonly JournalTag[] = []
): JournalState {
  const entry: FreeJournalEntry = {
    id: `j_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    text,
    tags,
    createdAt: new Date().toISOString(),
  };

  const updated: JournalState = {
    entries: [entry, ...state.entries],
  };
  saveJournal(updated);
  return updated;
}

export function deleteEntry(
  state: JournalState,
  entryId: string
): JournalState {
  const updated: JournalState = {
    entries: state.entries.filter((e) => e.id !== entryId),
  };
  saveJournal(updated);
  return updated;
}

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

export function getEntriesByTag(
  state: JournalState,
  tagType: string,
  tagId: string
): readonly FreeJournalEntry[] {
  return state.entries.filter((e) =>
    e.tags.some((t) => t.type === tagType && t.id === tagId)
  );
}

export function getEntriesByDateRange(
  state: JournalState,
  startDate: string,
  endDate: string
): readonly FreeJournalEntry[] {
  return state.entries.filter(
    (e) => e.createdAt >= startDate && e.createdAt <= endDate
  );
}
