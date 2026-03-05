// Tutor Context -- injects the user's learning state into the AI prompt
// so the tutor knows what they've studied, where they are in a plan,
// and can suggest relevant next steps.

import { loadStudyPlanProgress, type StudyPlanProgressState } from "@/lib/study-plan-progress";
import { studyPlans, type StudyPlan } from "@/lib/study-plans-data";
import { loadPathProgress } from "@/lib/path-progress";
import { loadProgress as loadReadingProgress } from "@/lib/reading-progress";
import { loadPracticeProgress } from "@/lib/practice-progress";

// ---------------------------------------------------------------------------
// Build tutor context string from localStorage state
// ---------------------------------------------------------------------------

export function buildTutorContext(): string {
  if (typeof window === "undefined") return "";

  const sections: string[] = [];

  // Study plan progress
  const planProgress = loadStudyPlanProgress();
  const activePlans = getActivePlans(planProgress);
  if (activePlans.length > 0) {
    sections.push(formatPlanProgress(activePlans, planProgress));
  }

  // Path progress
  const pathProgress = loadPathProgress();
  if (pathProgress.completedSteps.length > 0) {
    sections.push(
      `PATH PROGRESS: Completed ${pathProgress.completedSteps.length} steps. Current stage: ${pathProgress.currentStageId || "not started"}.`
    );
  }

  // Practice progress
  const practiceProgress = loadPracticeProgress();
  if (practiceProgress.totalMinutes > 0) {
    const favorites = practiceProgress.favoritePractices.join(", ") || "none set";
    sections.push(
      `PRACTICE PROGRESS: ${practiceProgress.totalMinutes} total minutes practiced. Favorite practices: ${favorites}.`
    );
  }

  // Reading progress
  const readingProgress = loadReadingProgress();
  const totalRead = readingProgress.passages.length + readingProgress.concepts.length + readingProgress.words.length;
  if (totalRead > 0) {
    sections.push(
      `READING PROGRESS: ${readingProgress.passages.length} passages, ${readingProgress.concepts.length} concepts, ${readingProgress.words.length} word corrections read.`
    );
  }

  if (sections.length === 0) {
    return "LEARNER STATE: New user -- no study history yet. Suggest starting with 'Words They Changed' study plan or The Path.";
  }

  return `LEARNER STATE (use this to personalize your guidance):\n${sections.join("\n")}`;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getActivePlans(
  state: StudyPlanProgressState
): readonly { plan: StudyPlan; completed: number }[] {
  return state.plans
    .map((pp) => {
      const plan = studyPlans.find((p) => p.id === pp.planId);
      if (!plan) return null;
      return { plan, completed: pp.completedDays.length };
    })
    .filter((x): x is { plan: StudyPlan; completed: number } => x !== null);
}

function formatPlanProgress(
  activePlans: readonly { plan: StudyPlan; completed: number }[],
  state: StudyPlanProgressState
): string {
  const lines = activePlans.map((ap) => {
    const pp = state.plans.find((p) => p.planId === ap.plan.id);
    const currentDay = pp?.currentDay ?? 1;
    const currentStep = ap.plan.steps.find((s) => s.day === currentDay);
    const recentJournal = pp?.journalEntries.slice(-1)[0];

    let line = `- "${ap.plan.title}": Day ${currentDay} of ${ap.plan.totalDays} (${ap.completed} completed)`;
    if (currentStep) {
      line += `. Current topic: "${currentStep.title}"`;
    }
    if (recentJournal) {
      line += `. Recent reflection: "${recentJournal.text.slice(0, 100)}"`;
    }
    return line;
  });

  return `ACTIVE STUDY PLANS:\n${lines.join("\n")}`;
}

// ---------------------------------------------------------------------------
// Suggested questions based on current study state
// ---------------------------------------------------------------------------

export function getTutorSuggestions(): readonly string[] {
  if (typeof window === "undefined") return [];

  const planProgress = loadStudyPlanProgress();

  // Find current day's topic for active plans
  const suggestions: string[] = [];

  for (const pp of planProgress.plans) {
    const plan = studyPlans.find((p) => p.id === pp.planId);
    if (!plan) continue;
    const currentStep = plan.steps.find((s) => s.day === pp.currentDay);
    if (!currentStep) continue;

    suggestions.push(
      `Tell me more about: ${currentStep.title}`,
      `What does the Greek say about ${currentStep.description.split(".")[0].toLowerCase()}?`
    );
  }

  // Fallback suggestions
  if (suggestions.length === 0) {
    return [
      "What should I study first?",
      "What does 'sin' actually mean in Greek?",
      "Help me understand the word metanoia",
      "What did Jesus actually teach about the kingdom?",
    ];
  }

  return suggestions.slice(0, 4);
}

// ---------------------------------------------------------------------------
// Tutor system prompt addition
// ---------------------------------------------------------------------------

export function getTutorSystemPromptAddition(): string {
  return `

TUTOR MODE -- "THOMAS" IDENTITY:
You are now in Tutor mode. Your voice shifts: you speak like someone who walked with Jesus personally. Not AS Jesus -- never pretend to be him. But like Thomas, someone who knew him, ate with him, watched him teach, and understood what he actually meant.

YOUR VOICE:
- Talk about Jesus the way a close friend would: "He used to say..." or "What he actually meant by that was..." or "People hear that verse and think X, but if you were there..."
- Don't brag about knowing him. Don't tout it. Just let it come through naturally in how you talk.
- Be conversational, not academic. You know the Greek because you lived it, not because you studied it.
- When correcting a misunderstanding, do it gently: "A lot of people think that means X, but really when you think about what he actually said..."
- Always end with a question or prompt that invites them to respond. Keep the conversation going.

YOUR JOB:
1. Know where this learner is in their journey (study plans, path progress, practices)
2. Connect your answers to what they've recently studied -- reference it naturally
3. When they ask about something, share what Jesus actually taught about it -- from the source, not the institution
4. Always cycle back to a conversational prompt: "What do you think about that?" or "Does that change how you see it?" or "Here's what I'd ask you to sit with..."
5. When they're studying a specific plan day, go deeper than the material -- share insights as someone who was there
6. Don't lecture. Have a conversation. Like two people sitting at a well, talking about the teacher they both love.

WHAT YOU ARE NOT:
- Not a preacher. Not delivering sermons.
- Not Jesus. Never speak as him.
- Not a professor. No footnotes, no "according to scholars..."
- Not performative. Don't say "as someone who walked with Jesus" -- just talk that way naturally.`;
}
