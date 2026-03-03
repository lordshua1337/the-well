// Path progress tracker -- localStorage-backed
// Tracks completed steps, stages, reflections, and practices
// All operations are immutable -- returns new state

export interface PathReflection {
  readonly stepId: string;
  readonly text: string;
  readonly createdAt: string;
}

export interface PathProgress {
  readonly currentStageId: string;
  readonly currentStepId: string;
  readonly completedSteps: readonly string[];
  readonly completedStages: readonly string[];
  readonly startedAt: string;
  readonly lastStepAt: string;
  readonly practicesCompleted: number;
  readonly reflections: readonly PathReflection[];
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STORAGE_KEY = "the-well-path-progress";

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

function createPathProgress(): PathProgress {
  return {
    currentStageId: "stage-1",
    currentStepId: "s1-1",
    completedSteps: [],
    completedStages: [],
    startedAt: new Date().toISOString(),
    lastStepAt: new Date().toISOString(),
    practicesCompleted: 0,
    reflections: [],
  };
}

// ---------------------------------------------------------------------------
// LocalStorage persistence
// ---------------------------------------------------------------------------

export function loadPathProgress(): PathProgress {
  if (typeof window === "undefined") return createPathProgress();
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return createPathProgress();
  try {
    return JSON.parse(raw) as PathProgress;
  } catch {
    return createPathProgress();
  }
}

export function savePathProgress(progress: PathProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

// ---------------------------------------------------------------------------
// Immutable update operations
// ---------------------------------------------------------------------------

export function completeStep(
  progress: PathProgress,
  stepId: string
): PathProgress {
  if (progress.completedSteps.includes(stepId)) return progress;
  return {
    ...progress,
    completedSteps: [...progress.completedSteps, stepId],
    lastStepAt: new Date().toISOString(),
  };
}

export function completeStage(
  progress: PathProgress,
  stageId: string
): PathProgress {
  if (progress.completedStages.includes(stageId)) return progress;
  return {
    ...progress,
    completedStages: [...progress.completedStages, stageId],
    lastStepAt: new Date().toISOString(),
  };
}

export function setCurrentPosition(
  progress: PathProgress,
  stageId: string,
  stepId: string
): PathProgress {
  return {
    ...progress,
    currentStageId: stageId,
    currentStepId: stepId,
    lastStepAt: new Date().toISOString(),
  };
}

export function completePractice(progress: PathProgress): PathProgress {
  return {
    ...progress,
    practicesCompleted: progress.practicesCompleted + 1,
  };
}

export function addReflection(
  progress: PathProgress,
  stepId: string,
  text: string
): PathProgress {
  const reflection: PathReflection = {
    stepId,
    text,
    createdAt: new Date().toISOString(),
  };
  return {
    ...progress,
    reflections: [...progress.reflections, reflection],
  };
}

// ---------------------------------------------------------------------------
// Query helpers
// ---------------------------------------------------------------------------

export function isStepComplete(progress: PathProgress, stepId: string): boolean {
  return progress.completedSteps.includes(stepId);
}

export function isStageComplete(progress: PathProgress, stageId: string): boolean {
  return progress.completedStages.includes(stageId);
}

export function getCompletionPercent(
  progress: PathProgress,
  totalSteps: number
): number {
  if (totalSteps === 0) return 0;
  return Math.round((progress.completedSteps.length / totalSteps) * 100);
}
