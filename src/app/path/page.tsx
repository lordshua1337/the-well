"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lock,
  Eye,
  Languages,
  Shield,
  User,
  Archive,
  Flame,
  Sun,
} from "lucide-react";
import { pathStages, getTotalSteps, type PathStage } from "@/lib/path-data";
import {
  loadPathProgress,
  isStageComplete,
  isStepComplete,
  getCompletionPercent,
  type PathProgress,
} from "@/lib/path-progress";

const stageIconMap: Record<string, React.ReactNode> = {
  Eye: <Eye className="w-5 h-5" />,
  Languages: <Languages className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
  User: <User className="w-5 h-5" />,
  Archive: <Archive className="w-5 h-5" />,
  Flame: <Flame className="w-5 h-5" />,
  Sun: <Sun className="w-5 h-5" />,
};

function isStageUnlocked(stage: PathStage, progress: PathProgress): boolean {
  if (!stage.unlockAfter) return true;
  return isStageComplete(progress, stage.unlockAfter);
}

function StageCard({
  stage,
  progress,
  stageIndex,
}: {
  stage: PathStage;
  progress: PathProgress;
  stageIndex: number;
}) {
  const unlocked = isStageUnlocked(stage, progress);
  const completed = isStageComplete(progress, stage.id);
  const stepsCompleted = stage.steps.filter((s) =>
    isStepComplete(progress, s.id)
  ).length;
  const isActive =
    unlocked && !completed && stepsCompleted > 0;
  const isCurrent = progress.currentStageId === stage.id;

  // Find first incomplete step
  const nextStep = stage.steps.find(
    (s) => !isStepComplete(progress, s.id)
  );
  const targetStep = nextStep || stage.steps[0];
  const href = `/path/${stage.slug}/${targetStep.id}`;

  return (
    <div className="relative">
      {/* Vertical connector */}
      {stageIndex < pathStages.length - 1 && (
        <div
          className={`absolute left-6 top-16 w-0.5 h-8 ${
            completed ? "bg-accent" : "bg-border"
          }`}
        />
      )}

      <Link
        href={unlocked ? href : "#"}
        className={`group flex items-start gap-4 p-4 rounded-xl border transition-all ${
          !unlocked
            ? "opacity-50 cursor-not-allowed bg-surface/50 border-border"
            : completed
              ? "bg-accent/5 border-accent/20 hover:border-accent/40"
              : isCurrent
                ? "bg-surface border-accent/40 shadow-sm"
                : "bg-surface border-border hover:border-accent/30 card-hover"
        }`}
        onClick={(e) => {
          if (!unlocked) e.preventDefault();
        }}
      >
        {/* Stage number / icon */}
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
            completed
              ? "bg-accent text-white"
              : unlocked
                ? "bg-accent/10 text-accent"
                : "bg-surface-warm text-text-muted"
          }`}
          style={
            unlocked && !completed
              ? { backgroundColor: `${stage.color}15`, color: stage.color }
              : undefined
          }
        >
          {completed ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : !unlocked ? (
            <Lock className="w-4 h-4" />
          ) : (
            stageIconMap[stage.icon] || (
              <span className="text-sm font-bold">{stageIndex + 1}</span>
            )
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-widest font-medium text-text-muted">
              Stage {stageIndex + 1}
            </span>
            {completed && (
              <span className="text-[10px] uppercase tracking-widest font-bold text-accent">
                Complete
              </span>
            )}
            {isActive && (
              <span className="text-[10px] uppercase tracking-widest font-bold text-accent">
                In Progress
              </span>
            )}
          </div>

          <h3
            className={`text-base font-serif font-semibold mb-1 ${
              unlocked
                ? "group-hover:text-accent transition-colors"
                : "text-text-muted"
            }`}
          >
            {stage.title}
          </h3>

          <p className="text-xs text-text-muted mb-2">{stage.subtitle}</p>

          {unlocked && (
            <div className="flex items-center gap-3">
              {/* Step progress */}
              <div className="flex items-center gap-1.5">
                {stage.steps.map((step) => (
                  <div
                    key={step.id}
                    className={`w-2 h-2 rounded-full ${
                      isStepComplete(progress, step.id)
                        ? "bg-accent"
                        : "bg-border"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] text-text-muted">
                {stepsCompleted}/{stage.steps.length} steps
              </span>
            </div>
          )}
        </div>

        {/* Arrow */}
        {unlocked && (
          <ArrowRight className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-4" />
        )}
      </Link>
    </div>
  );
}

export default function PathPage() {
  const [progress, setProgress] = useState<PathProgress | null>(null);

  useEffect(() => {
    setProgress(loadPathProgress());
  }, []);

  const totalSteps = getTotalSteps();
  const completionPercent = progress
    ? getCompletionPercent(progress, totalSteps)
    : 0;
  const stepsCompleted = progress?.completedSteps.length || 0;

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-secondary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Home
        </Link>

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs text-accent uppercase tracking-widest font-medium mb-2">
            Guided Journey
          </p>
          <h1 className="text-3xl sm:text-4xl mb-4">The Path</h1>
          <p className="text-text-secondary leading-relaxed">
            Seven stages from translation bias to daily practice. Start where
            you are. Go at your own pace. Each stage builds on the last.
          </p>
        </div>

        {/* Progress overview */}
        {progress && stepsCompleted > 0 && (
          <div className="bg-surface rounded-xl border border-border p-5 mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">Your Progress</span>
              <span className="text-sm text-accent font-mono">
                {completionPercent}%
              </span>
            </div>
            <div className="w-full h-2 bg-surface-warm rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-500"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-text-muted">
                {stepsCompleted} of {totalSteps} steps completed
              </span>
              <span className="text-xs text-text-muted">
                {progress.practicesCompleted} practices done
              </span>
            </div>
          </div>
        )}

        {/* Stage list */}
        <div className="space-y-3">
          {pathStages.map((stage, index) => (
            <StageCard
              key={stage.id}
              stage={stage}
              progress={progress || loadPathProgress()}
              stageIndex={index}
            />
          ))}
        </div>

        <div className="divider-warm mt-12 mb-8" />

        {/* Bottom note */}
        <div className="text-center">
          <p className="text-text-muted text-sm max-w-md mx-auto">
            The Path is designed for first-time seekers, but experienced
            readers will find new depth here too. Each stage links to the
            full scholarship in The Well&apos;s knowledge base.
          </p>
        </div>
      </div>
    </div>
  );
}
