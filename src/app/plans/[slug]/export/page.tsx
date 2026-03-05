"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Printer, Download } from "lucide-react";
import {
  getStudyPlanBySlug,
  type StudyPlan,
} from "@/lib/study-plans-data";
import {
  loadStudyPlanProgress,
  getPlanProgress,
  type PlanProgress,
} from "@/lib/study-plan-progress";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PlanExportPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const printRef = useRef<HTMLDivElement>(null);

  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [planProgress, setPlanProgress] = useState<PlanProgress | null>(null);

  useEffect(() => {
    const found = getStudyPlanBySlug(slug);
    if (found) {
      setPlan(found);
      const state = loadStudyPlanProgress();
      setPlanProgress(getPlanProgress(state, found.id));
    }
  }, [slug]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadText = () => {
    if (!plan) return;

    const lines: string[] = [];
    lines.push(`${plan.title}`);
    lines.push(`${plan.subtitle}`);
    lines.push("");
    lines.push(plan.description);
    lines.push("");
    lines.push("=".repeat(60));

    for (const step of plan.steps) {
      lines.push("");
      lines.push(`DAY ${step.day}: ${step.title}`);
      lines.push("-".repeat(40));
      lines.push(step.description);
      lines.push("");
      lines.push(step.connectiveText);
      lines.push("");

      // Content links
      lines.push("Content:");
      for (const link of step.contentLinks) {
        lines.push(`  - ${link.label}`);
      }

      // Reflection
      lines.push("");
      lines.push(`Reflection: "${step.reflectionPrompt}"`);

      // Journal entry if exists
      const entry = planProgress?.journalEntries.find(
        (e) => e.day === step.day
      );
      if (entry) {
        lines.push("");
        lines.push("Your Reflection:");
        lines.push(entry.text);
        lines.push(
          `Written: ${new Date(entry.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}`
        );
      }

      // Completion status
      const isComplete = planProgress?.completedDays.includes(step.day);
      lines.push("");
      lines.push(isComplete ? "[COMPLETED]" : "[NOT COMPLETED]");
      lines.push("=".repeat(60));
    }

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${plan.slug}-study-plan.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!plan) {
    return (
      <div className="min-h-screen pt-20 pb-16 px-4 flex items-center justify-center">
        <p className="text-sm text-text-secondary">Plan not found.</p>
      </div>
    );
  }

  const completedDays = planProgress?.completedDays.length ?? 0;

  return (
    <>
      {/* Controls (hidden in print) */}
      <div className="min-h-screen pt-20 pb-16 px-4 print:hidden">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Link
              href={`/plans/${plan.slug}`}
              className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-xl font-semibold">Export Study Plan</h1>
              <p className="text-xs text-text-secondary">{plan.title}</p>
            </div>
          </div>

          <div className="bg-surface border border-border-light rounded-xl p-6 mb-6">
            <p className="text-sm text-text-secondary mb-4">
              Export your study plan with all reflections and progress.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg text-sm hover:bg-accent-light transition-colors"
              >
                <Printer className="w-4 h-4" />
                Print / Save as PDF
              </button>
              <button
                onClick={handleDownloadText}
                className="flex items-center gap-2 bg-surface border border-border-light text-text-primary px-4 py-2 rounded-lg text-sm hover:bg-surface/80 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download as Text
              </button>
            </div>
          </div>

          <p className="text-[10px] text-text-secondary mb-4">
            Preview of what will be exported:
          </p>
        </div>
      </div>

      {/* Printable content */}
      <div
        ref={printRef}
        className="max-w-2xl mx-auto px-4 pb-16 print:px-0 print:max-w-none print:pt-0"
      >
        {/* Cover */}
        <div className="text-center mb-8 print:mb-12 print:pt-16">
          <p className="text-[10px] text-text-secondary uppercase tracking-widest mb-2 print:text-xs">
            The Well -- Study Plan
          </p>
          <h1 className="text-2xl font-serif font-semibold mb-1 print:text-3xl">
            {plan.title}
          </h1>
          <p className="text-sm text-text-secondary mb-4">{plan.subtitle}</p>
          <p className="text-xs text-text-secondary">
            {completedDays} of {plan.totalDays} days completed
          </p>
        </div>

        <p className="text-sm text-text-secondary leading-relaxed mb-8">
          {plan.description}
        </p>

        {/* Days */}
        <div className="space-y-8">
          {plan.steps.map((step) => {
            const isComplete =
              planProgress?.completedDays.includes(step.day) ?? false;
            const entry = planProgress?.journalEntries.find(
              (e) => e.day === step.day
            );

            return (
              <div
                key={step.day}
                className="border-t border-border-light pt-6 print:break-inside-avoid"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-[10px] font-medium px-1.5 py-0.5 rounded print:text-xs"
                    style={{
                      backgroundColor: `${plan.color}15`,
                      color: plan.color,
                    }}
                  >
                    Day {step.day}
                  </span>
                  {isComplete && (
                    <span className="text-[10px] text-green-500 font-medium">
                      Completed
                    </span>
                  )}
                </div>

                <h2 className="text-base font-semibold mb-1">{step.title}</h2>
                <p className="text-xs text-text-secondary mb-3">
                  {step.description}
                </p>

                <p className="text-xs text-text-secondary leading-relaxed mb-3 italic">
                  {step.connectiveText}
                </p>

                <div className="mb-3">
                  <p className="text-[10px] text-text-secondary uppercase tracking-wider font-medium mb-1">
                    Content
                  </p>
                  <ul className="space-y-1">
                    {step.contentLinks.map((link, i) => (
                      <li key={i} className="text-xs text-text-primary">
                        {link.label}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-3">
                  <p className="text-[10px] text-text-secondary uppercase tracking-wider font-medium mb-1">
                    Reflection Prompt
                  </p>
                  <p className="text-xs text-text-primary italic">
                    &ldquo;{step.reflectionPrompt}&rdquo;
                  </p>
                </div>

                {entry && (
                  <div className="bg-surface border border-border-light rounded-lg p-3 print:bg-gray-50">
                    <p className="text-[10px] text-text-secondary uppercase tracking-wider font-medium mb-1">
                      Your Reflection
                    </p>
                    <p className="text-xs text-text-primary leading-relaxed">
                      {entry.text}
                    </p>
                    <p className="text-[10px] text-text-secondary mt-1">
                      {new Date(entry.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12 pt-6 border-t border-border-light print:mt-16">
          <p className="text-[10px] text-text-secondary">
            Exported from The Well -- thewell.app
          </p>
        </div>
      </div>
    </>
  );
}
