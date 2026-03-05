"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Languages,
  User,
  Flame,
  Puzzle,
  Heart,
  Clock,
  CheckCircle,
} from "lucide-react";
import { studyPlans, type StudyPlan } from "@/lib/study-plans-data";
import {
  loadStudyPlanProgress,
  getPlanProgress,
  type StudyPlanProgressState,
} from "@/lib/study-plan-progress";

// ---------------------------------------------------------------------------
// Icon map
// ---------------------------------------------------------------------------

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Languages,
  BookOpen,
  User,
  Flame,
  Puzzle,
  Heart,
  Clock,
};

// ---------------------------------------------------------------------------
// Plan Card
// ---------------------------------------------------------------------------

function PlanCard({
  plan,
  progress,
}: {
  plan: StudyPlan;
  progress: StudyPlanProgressState;
}) {
  const planProgress = getPlanProgress(progress, plan.id);
  const completedDays = planProgress?.completedDays.length ?? 0;
  const started = planProgress !== null;
  const finished = completedDays >= plan.totalDays;
  const Icon = ICON_MAP[plan.icon] ?? BookOpen;

  return (
    <Link
      href={`/plans/${plan.slug}`}
      className="group block bg-surface border border-border-light rounded-xl overflow-hidden card-hover"
    >
      <div
        className="h-1 w-full"
        style={{ backgroundColor: plan.color }}
      />
      <div className="p-5">
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{
              backgroundColor: `${plan.color}15`,
              color: plan.color,
            }}
          >
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold group-hover:text-accent transition-colors">
              {plan.title}
            </h3>
            <p className="text-xs text-text-secondary">{plan.subtitle}</p>
          </div>
          {finished && (
            <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
          )}
        </div>

        <p className="text-sm text-text-secondary leading-relaxed line-clamp-2 mb-3">
          {plan.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-[10px] text-text-secondary flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {plan.totalDays} days
          </span>
          {started && !finished && (
            <span className="text-[10px] text-accent font-mono">
              Day {completedDays + 1} of {plan.totalDays}
            </span>
          )}
          {finished && (
            <span className="text-[10px] text-green-400 font-medium">
              Completed
            </span>
          )}
        </div>

        {started && (
          <div className="h-1.5 bg-background rounded-full mt-3">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${(completedDays / plan.totalDays) * 100}%`,
                backgroundColor: plan.color,
              }}
            />
          </div>
        )}
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function PlansPage() {
  const [progress, setProgress] = useState<StudyPlanProgressState>({
    plans: [],
  });

  useEffect(() => {
    setProgress(loadStudyPlanProgress());
  }, []);

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link
            href="/"
            className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-semibold flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-accent" />
              Study Plans
            </h1>
            <p className="text-xs text-text-secondary mt-0.5">
              Guided multi-day journeys through The Well&apos;s content
            </p>
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {studyPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} progress={progress} />
          ))}
        </div>

        <p className="text-[10px] text-text-secondary text-center mt-8">
          Each plan links to existing content in The Well. Go at your own pace.
        </p>
      </div>
    </div>
  );
}
