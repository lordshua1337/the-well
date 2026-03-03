// Bookmarking System for The Well
// Save passages, concepts, words, and cards for later study
// All operations are immutable -- returns new state

export interface Bookmarks {
  readonly passages: readonly string[];
  readonly concepts: readonly string[];
  readonly words: readonly string[];
  readonly cards: readonly string[];
  readonly updatedAt: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STORAGE_KEY = "thewell_bookmarks";

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

function createBookmarks(): Bookmarks {
  return {
    passages: [],
    concepts: [],
    words: [],
    cards: [],
    updatedAt: new Date().toISOString(),
  };
}

// ---------------------------------------------------------------------------
// LocalStorage persistence
// ---------------------------------------------------------------------------

export function loadBookmarks(): Bookmarks {
  if (typeof window === "undefined") return createBookmarks();
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return createBookmarks();
  try {
    return JSON.parse(raw) as Bookmarks;
  } catch {
    return createBookmarks();
  }
}

export function saveBookmarks(bookmarks: Bookmarks): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
}

// ---------------------------------------------------------------------------
// Toggle operations (add if missing, remove if present)
// ---------------------------------------------------------------------------

export function togglePassageBookmark(
  bookmarks: Bookmarks,
  passageId: string,
): Bookmarks {
  const exists = bookmarks.passages.includes(passageId);
  return {
    ...bookmarks,
    passages: exists
      ? bookmarks.passages.filter((id) => id !== passageId)
      : [...bookmarks.passages, passageId],
    updatedAt: new Date().toISOString(),
  };
}

export function toggleConceptBookmark(
  bookmarks: Bookmarks,
  conceptId: string,
): Bookmarks {
  const exists = bookmarks.concepts.includes(conceptId);
  return {
    ...bookmarks,
    concepts: exists
      ? bookmarks.concepts.filter((id) => id !== conceptId)
      : [...bookmarks.concepts, conceptId],
    updatedAt: new Date().toISOString(),
  };
}

export function toggleWordBookmark(
  bookmarks: Bookmarks,
  wordId: string,
): Bookmarks {
  const exists = bookmarks.words.includes(wordId);
  return {
    ...bookmarks,
    words: exists
      ? bookmarks.words.filter((id) => id !== wordId)
      : [...bookmarks.words, wordId],
    updatedAt: new Date().toISOString(),
  };
}

export function toggleCardBookmark(
  bookmarks: Bookmarks,
  cardId: string,
): Bookmarks {
  const exists = bookmarks.cards.includes(cardId);
  return {
    ...bookmarks,
    cards: exists
      ? bookmarks.cards.filter((id) => id !== cardId)
      : [...bookmarks.cards, cardId],
    updatedAt: new Date().toISOString(),
  };
}

// ---------------------------------------------------------------------------
// Query helpers
// ---------------------------------------------------------------------------

export function isPassageBookmarked(
  bookmarks: Bookmarks,
  passageId: string,
): boolean {
  return bookmarks.passages.includes(passageId);
}

export function isConceptBookmarked(
  bookmarks: Bookmarks,
  conceptId: string,
): boolean {
  return bookmarks.concepts.includes(conceptId);
}

export function isWordBookmarked(
  bookmarks: Bookmarks,
  wordId: string,
): boolean {
  return bookmarks.words.includes(wordId);
}

export function isCardBookmarked(
  bookmarks: Bookmarks,
  cardId: string,
): boolean {
  return bookmarks.cards.includes(cardId);
}

export function getTotalBookmarks(bookmarks: Bookmarks): number {
  return (
    bookmarks.passages.length +
    bookmarks.concepts.length +
    bookmarks.words.length +
    bookmarks.cards.length
  );
}
