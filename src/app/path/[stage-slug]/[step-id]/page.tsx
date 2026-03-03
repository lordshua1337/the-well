"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Quote,
  Lightbulb,
} from "lucide-react";
import {
  getStageBySlug,
  getNextStep,
  getPreviousStep,
  type PathStep,
  type PathStage,
} from "@/lib/path-data";
import {
  loadPathProgress,
  savePathProgress,
  completeStep,
  completeStage,
  completePractice,
  setCurrentPosition,
  addReflection,
  isStepComplete,
  type PathProgress,
} from "@/lib/path-progress";

function StepContent({ step, stage }: { step: PathStep; stage: PathStage }) {
  const [progress, setProgress] = useState<PathProgress | null>(null);
  const [reflectionText, setReflectionText] = useState("");
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [showReflectionSaved, setShowReflectionSaved] = useState(false);

  useEffect(() => {
    const p = loadPathProgress();
    setProgress(p);
    // Update current position
    const updated = setCurrentPosition(p, stage.id, step.id);
    savePathProgress(updated);
    setProgress(updated);
  }, [stage.id, step.id]);

  const isComplete = progress ? isStepComplete(progress, step.id) : false;

  const handleCompleteStep = () => {
    if (!progress) return;
    let updated = completeStep(progress, step.id);

    // Check if all steps in stage are complete
    const allStepsComplete = stage.steps.every(
      (s) => s.id === step.id || updated.completedSteps.includes(s.id)
    );
    if (allStepsComplete) {
      updated = completeStage(updated, stage.id);
    }

    savePathProgress(updated);
    setProgress(updated);
  };

  const handleCompletePractice = () => {
    if (!progress) return;
    const updated = completePractice(progress);
    savePathProgress(updated);
    setProgress(updated);
    setPracticeCompleted(true);
  };

  const handleSaveReflection = () => {
    if (!progress || !reflectionText.trim()) return;
    const updated = addReflection(progress, step.id, reflectionText.trim());
    savePathProgress(updated);
    setProgress(updated);
    setShowReflectionSaved(true);
    setTimeout(() => setShowReflectionSaved(false), 2000);
  };

  const nextStep = getNextStep(stage.slug, step.id);
  const prevStep = getPreviousStep(stage.slug, step.id);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back link */}
        <Link
          href="/path"
          className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-secondary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          The Path
        </Link>

        {/* Stage context */}
        <div className="flex items-center gap-2 mb-4">
          <span
            className="text-[10px] uppercase tracking-widest font-medium px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: `${stage.color}15`,
              color: stage.color,
            }}
          >
            {stage.title}
          </span>
          <span className="text-[10px] text-text-muted">
            Step {step.order} of {stage.steps.length}
          </span>
          {isComplete && (
            <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
          )}
        </div>

        {/* Step type badge */}
        <div className="flex items-center gap-2 mb-3">
          {step.type === "practice" && (
            <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-medium">
              Practice
            </span>
          )}
          {step.type === "milestone" && (
            <span className="text-xs bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full font-medium">
              Milestone
            </span>
          )}
          {step.estimatedMinutes && (
            <span className="text-xs text-text-muted">
              ~{step.estimatedMinutes} min
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl mb-6">{step.content.title}</h1>

        {/* Pull quote */}
        {step.content.pullQuote && (
          <div className="bg-surface-warm rounded-xl p-6 mb-8 border-l-4 border-accent">
            <Quote className="w-4 h-4 text-accent mb-2" />
            <blockquote className="font-serif text-lg text-text-primary leading-relaxed italic">
              &ldquo;{step.content.pullQuote}&rdquo;
            </blockquote>
          </div>
        )}

        {/* Body content */}
        <div className="prose-well mb-8">
          {step.content.body.split("\n\n").map((paragraph, i) => (
            <p
              key={i}
              className="text-text-secondary leading-relaxed mb-4"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Key insight */}
        {step.content.keyInsight && (
          <div className="bg-accent/5 rounded-xl p-5 border border-accent/10 mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-accent" />
              <span className="text-xs text-accent uppercase tracking-widest font-medium">
                Key Insight
              </span>
            </div>
            <p className="text-sm text-text-primary leading-relaxed">
              {step.content.keyInsight}
            </p>
          </div>
        )}

        {/* Linked content */}
        {step.linkedContent && (
          <div className="bg-surface rounded-xl border border-border p-5 mb-8">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-accent" />
              <span className="text-xs text-accent uppercase tracking-widest font-medium">
                Go Deeper
              </span>
            </div>
            {step.linkedContent.customIntro && (
              <p className="text-sm text-text-secondary mb-3">
                {step.linkedContent.customIntro}
              </p>
            )}
            <Link
              href={
                step.linkedContent.type === "concept"
                  ? `/concepts/${step.linkedContent.id}`
                  : step.linkedContent.type === "word"
                    ? `/words#${step.linkedContent.id}`
                    : `/passages/${step.linkedContent.id}`
              }
              className="text-sm text-accent font-medium hover:text-accent-light transition-colors inline-flex items-center gap-1"
            >
              Read the full {step.linkedContent.type}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* Practice block */}
        {step.practice && (
          <div className="bg-surface-warm rounded-xl p-6 mb-8 border border-accent/10">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-xs text-accent uppercase tracking-widest font-medium">
                Practice
              </span>
              <span className="text-xs text-text-muted ml-auto">
                {step.practice.duration}
              </span>
            </div>
            <p className="text-sm text-text-primary leading-relaxed mb-4">
              {step.practice.prompt}
            </p>
            {!practiceCompleted ? (
              <button
                onClick={handleCompletePractice}
                className="text-sm bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent-light transition-colors"
              >
                I completed this practice
              </button>
            ) : (
              <div className="flex items-center gap-2 text-accent text-sm">
                <CheckCircle2 className="w-4 h-4" />
                Practice completed
              </div>
            )}
          </div>
        )}

        {/* Reflection */}
        {step.reflection && (
          <div className="bg-surface rounded-xl border border-border p-5 mb-8">
            <p className="text-xs text-accent uppercase tracking-widest font-medium mb-3">
              Reflection
            </p>
            <p className="text-sm text-text-secondary mb-4 italic">
              {step.reflection}
            </p>
            <textarea
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
              placeholder="Write your reflection here (saved locally, only for you)..."
              className="w-full bg-surface-warm border border-border-light rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/40 transition-colors resize-none"
              rows={3}
            />
            <div className="flex items-center justify-between mt-2">
              <button
                onClick={handleSaveReflection}
                disabled={!reflectionText.trim()}
                className="text-xs text-accent font-medium hover:text-accent-light disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Save reflection
              </button>
              {showReflectionSaved && (
                <span className="text-xs text-accent animate-fade-in">
                  Saved
                </span>
              )}
            </div>
          </div>
        )}

        {/* Complete step + navigation */}
        <div className="border-t border-border-light pt-6">
          {!isComplete && (
            <button
              onClick={handleCompleteStep}
              className="w-full bg-accent text-white py-3 rounded-xl font-medium hover:bg-accent-light transition-colors mb-4"
            >
              Mark Step Complete
            </button>
          )}

          <div className="flex items-center justify-between">
            {prevStep ? (
              <Link
                href={`/path/${prevStep.stage.slug}/${prevStep.step.id}`}
                className="text-sm text-text-muted hover:text-text-secondary transition-colors inline-flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Previous
              </Link>
            ) : (
              <div />
            )}

            {nextStep ? (
              <Link
                href={`/path/${nextStep.stage.slug}/${nextStep.step.id}`}
                className="text-sm text-accent font-medium hover:text-accent-light transition-colors inline-flex items-center gap-1"
              >
                Next Step
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <Link
                href="/path"
                className="text-sm text-accent font-medium hover:text-accent-light transition-colors inline-flex items-center gap-1"
              >
                Back to The Path
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PathStepPage({
  params,
}: {
  params: Promise<{ "stage-slug": string; "step-id": string }>;
}) {
  const resolvedParams = use(params);
  const stage = getStageBySlug(resolvedParams["stage-slug"]);

  if (!stage) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 text-center">
        <h1 className="text-2xl mb-4">Stage not found</h1>
        <Link href="/path" className="text-accent hover:text-accent-light">
          Return to The Path
        </Link>
      </div>
    );
  }

  const step = stage.steps.find((s) => s.id === resolvedParams["step-id"]);

  if (!step) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 text-center">
        <h1 className="text-2xl mb-4">Step not found</h1>
        <Link href="/path" className="text-accent hover:text-accent-light">
          Return to The Path
        </Link>
      </div>
    );
  }

  return <StepContent step={step} stage={stage} />;
}
