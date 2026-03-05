"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle,
  Circle,
  BookOpen,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Download,
} from "lucide-react";
import {
  getStudyPlanBySlug,
  type StudyPlan,
  type StudyPlanStep,
  type ContentLink,
} from "@/lib/study-plans-data";
import {
  loadStudyPlanProgress,
  startPlan,
  completeDay,
  addJournalEntry,
  getPlanProgress,
  type StudyPlanProgressState,
  type PlanProgress,
} from "@/lib/study-plan-progress";

// ---------------------------------------------------------------------------
// Content link resolver
// ---------------------------------------------------------------------------

function resolveHref(link: ContentLink): string {
  switch (link.type) {
    case "concept":
      return `/concepts/${link.id}`;
    case "passage":
      return `/passages/${link.id}`;
    case "word":
      return `/cards`;
    case "practice":
      return `/practices/${link.id}`;
    case "chapter":
      return `/jesus/${link.id}`;
    default:
      return "/";
  }
}

// ---------------------------------------------------------------------------
// Day Card
// ---------------------------------------------------------------------------

function DayCard({
  step,
  plan,
  planProgress,
  isExpanded,
  onToggle,
  onComplete,
  onJournal,
}: {
  step: StudyPlanStep;
  plan: StudyPlan;
  planProgress: PlanProgress | null;
  isExpanded: boolean;
  onToggle: () => void;
  onComplete: () => void;
  onJournal: (text: string) => void;
}) {
  const [journalText, setJournalText] = useState("");
  const isCompleted = planProgress?.completedDays.includes(step.day) ?? false;
  const existingEntry = planProgress?.journalEntries.find(
    (e) => e.day === step.day
  );

  const handleJournalSubmit = useCallback(() => {
    if (journalText.trim()) {
      onJournal(journalText.trim());
      setJournalText("");
    }
  }, [journalText, onJournal]);

  return (
    <div
      className={`bg-surface border rounded-xl overflow-hidden transition-all ${
        isCompleted
          ? "border-green-400/20"
          : isExpanded
            ? "border-accent/30"
            : "border-border-light"
      }`}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-surface/80 transition-colors"
      >
        {isCompleted ? (
          <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
        ) : (
          <Circle className="w-5 h-5 text-text-secondary shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-medium px-1.5 py-0.5 rounded"
              style={{
                backgroundColor: `${plan.color}15`,
                color: plan.color,
              }}
            >
              Day {step.day}
            </span>
          </div>
          <p
            className={`text-sm font-semibold mt-0.5 ${
              isCompleted ? "text-text-secondary" : ""
            }`}
          >
            {step.title}
          </p>
          <p className="text-xs text-text-secondary">{step.description}</p>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-text-secondary shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-text-secondary shrink-0" />
        )}
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4">
              {/* Connective text */}
              <div className="bg-accent/5 border border-accent/10 rounded-lg p-4">
                <p className="text-xs text-text-secondary leading-relaxed">
                  {step.connectiveText}
                </p>
              </div>

              {/* Content links */}
              <div className="space-y-2">
                <p className="text-[10px] text-text-secondary uppercase tracking-wider font-medium">
                  Content for Today
                </p>
                {step.contentLinks.map((link, i) => (
                  <Link
                    key={i}
                    href={resolveHref(link)}
                    className="flex items-center gap-2 px-3 py-2 bg-surface border border-border-light rounded-lg hover:border-accent/30 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-accent shrink-0" />
                    <span className="text-xs font-medium flex-1">
                      {link.label}
                    </span>
                    <ExternalLink className="w-3 h-3 text-text-secondary" />
                  </Link>
                ))}
              </div>

              {/* Reflection prompt */}
              <div className="space-y-2">
                <p className="text-[10px] text-text-secondary uppercase tracking-wider font-medium">
                  Reflection
                </p>
                <p className="text-xs text-text-primary italic">
                  &ldquo;{step.reflectionPrompt}&rdquo;
                </p>

                {existingEntry ? (
                  <div className="bg-surface border border-border-light rounded-lg p-3">
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {existingEntry.text}
                    </p>
                    <p className="text-[10px] text-text-secondary mt-1">
                      {new Date(existingEntry.createdAt).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric" }
                      )}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <textarea
                      value={journalText}
                      onChange={(e) => setJournalText(e.target.value)}
                      placeholder="Write your reflection..."
                      className="w-full bg-background border border-border-light rounded-lg px-3 py-2 text-xs resize-none h-20 focus:outline-none focus:border-accent/50 transition-colors"
                    />
                    {journalText.trim() && (
                      <button
                        onClick={handleJournalSubmit}
                        className="text-[10px] text-accent hover:text-accent-light transition-colors"
                      >
                        Save reflection
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Complete button */}
              {!isCompleted && (
                <button
                  onClick={onComplete}
                  className="w-full bg-accent/10 text-accent text-xs font-medium py-2.5 rounded-lg hover:bg-accent/20 transition-colors"
                >
                  Mark Day {step.day} Complete
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function PlanDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [progress, setProgress] = useState<StudyPlanProgressState>({
    plans: [],
  });
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  useEffect(() => {
    const found = getStudyPlanBySlug(slug);
    if (found) setPlan(found);

    let state = loadStudyPlanProgress();
    if (found && !getPlanProgress(state, found.id)) {
      state = startPlan(state, found.id);
    }
    setProgress(state);

    // Auto-expand current day
    if (found) {
      const pp = getPlanProgress(state, found.id);
      setExpandedDay(pp?.currentDay ?? 1);
    }
  }, [slug]);

  if (!plan) {
    return (
      <div className="min-h-screen pt-20 pb-16 px-4 flex items-center justify-center">
        <p className="text-sm text-text-secondary">Plan not found.</p>
      </div>
    );
  }

  const planProgress = getPlanProgress(progress, plan.id);
  const completedDays = planProgress?.completedDays.length ?? 0;
  const progressPercent = (completedDays / plan.totalDays) * 100;

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link
            href="/plans"
            className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-semibold">{plan.title}</h1>
            <p className="text-xs text-text-secondary">{plan.subtitle}</p>
          </div>
          <Link
            href={`/plans/${plan.slug}/export`}
            className="p-2 rounded-lg text-text-secondary hover:text-accent hover:bg-surface transition-colors"
            title="Export plan"
          >
            <Download className="w-4 h-4" />
          </Link>
        </div>

        {/* Progress */}
        <div className="bg-surface border border-border-light rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-text-secondary">
              {completedDays} of {plan.totalDays} days completed
            </p>
            <p className="text-xs font-mono text-accent">
              {Math.round(progressPercent)}%
            </p>
          </div>
          <div className="h-2 bg-background rounded-full">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: plan.color }}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-text-secondary leading-relaxed mb-6">
          {plan.description}
        </p>

        {/* Day cards */}
        <div className="space-y-3">
          {plan.steps.map((step) => (
            <DayCard
              key={step.day}
              step={step}
              plan={plan}
              planProgress={planProgress}
              isExpanded={expandedDay === step.day}
              onToggle={() =>
                setExpandedDay(expandedDay === step.day ? null : step.day)
              }
              onComplete={() => {
                const updated = completeDay(progress, plan.id, step.day);
                setProgress(updated);
              }}
              onJournal={(text) => {
                const updated = addJournalEntry(
                  progress,
                  plan.id,
                  step.day,
                  text
                );
                setProgress(updated);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
