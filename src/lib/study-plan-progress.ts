// Study Plan Progress -- immutable localStorage tracking for plan completion + journal

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface JournalEntry {
  readonly planId: string;
  readonly day: number;
  readonly text: string;
  readonly createdAt: string;
}

export interface PlanProgress {
  readonly planId: string;
  readonly startedAt: string;
  readonly completedDays: readonly number[];
  readonly currentDay: number;
  readonly journalEntries: readonly JournalEntry[];
}

export interface StudyPlanProgressState {
  readonly plans: readonly PlanProgress[];
}

// ---------------------------------------------------------------------------
// Storage
// ---------------------------------------------------------------------------

const STORAGE_KEY = "the-well-study-plan-progress";

export function loadStudyPlanProgress(): StudyPlanProgressState {
  if (typeof window === "undefined") return { plans: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { plans: [] };
    return JSON.parse(raw) as StudyPlanProgressState;
  } catch {
    return { plans: [] };
  }
}

function saveStudyPlanProgress(state: StudyPlanProgressState): void {
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

export function startPlan(
  state: StudyPlanProgressState,
  planId: string
): StudyPlanProgressState {
  // Don't restart if already exists
  if (state.plans.some((p) => p.planId === planId)) return state;

  const updated: StudyPlanProgressState = {
    plans: [
      ...state.plans,
      {
        planId,
        startedAt: new Date().toISOString(),
        completedDays: [],
        currentDay: 1,
        journalEntries: [],
      },
    ],
  };
  saveStudyPlanProgress(updated);
  return updated;
}

export function completeDay(
  state: StudyPlanProgressState,
  planId: string,
  day: number
): StudyPlanProgressState {
  const updated: StudyPlanProgressState = {
    plans: state.plans.map((p) => {
      if (p.planId !== planId) return p;
      const completedDays = p.completedDays.includes(day)
        ? p.completedDays
        : [...p.completedDays, day];
      return {
        ...p,
        completedDays,
        currentDay: Math.max(p.currentDay, day + 1),
      };
    }),
  };
  saveStudyPlanProgress(updated);
  return updated;
}

export function addJournalEntry(
  state: StudyPlanProgressState,
  planId: string,
  day: number,
  text: string
): StudyPlanProgressState {
  const entry: JournalEntry = {
    planId,
    day,
    text,
    createdAt: new Date().toISOString(),
  };

  const updated: StudyPlanProgressState = {
    plans: state.plans.map((p) => {
      if (p.planId !== planId) return p;
      return {
        ...p,
        journalEntries: [...p.journalEntries, entry],
      };
    }),
  };
  saveStudyPlanProgress(updated);
  return updated;
}

export function resetPlan(
  state: StudyPlanProgressState,
  planId: string
): StudyPlanProgressState {
  const updated: StudyPlanProgressState = {
    plans: state.plans.filter((p) => p.planId !== planId),
  };
  saveStudyPlanProgress(updated);
  return updated;
}

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

export function getPlanProgress(
  state: StudyPlanProgressState,
  planId: string
): PlanProgress | null {
  return state.plans.find((p) => p.planId === planId) ?? null;
}

export function getJournalForPlan(
  state: StudyPlanProgressState,
  planId: string
): readonly JournalEntry[] {
  const plan = state.plans.find((p) => p.planId === planId);
  return plan?.journalEntries ?? [];
}

export function getAllJournalEntries(
  state: StudyPlanProgressState
): readonly JournalEntry[] {
  return state.plans.flatMap((p) => p.journalEntries);
}
