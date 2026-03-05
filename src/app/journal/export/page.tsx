"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Printer, Download, FileText, FileJson } from "lucide-react";
import { loadJournal, type JournalState } from "@/lib/journal";
import {
  loadStudyPlanProgress,
  getAllJournalEntries,
  type JournalEntry as PlanJournalEntry,
} from "@/lib/study-plan-progress";
import { studyPlans } from "@/lib/study-plans-data";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ExportEntry {
  readonly text: string;
  readonly createdAt: string;
  readonly source: "personal" | "study-plan";
  readonly planName?: string;
  readonly planDay?: number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function gatherAllEntries(): readonly ExportEntry[] {
  const journal = loadJournal();
  const planProgress = loadStudyPlanProgress();

  const personal: ExportEntry[] = journal.entries.map((e) => ({
    text: e.text,
    createdAt: e.createdAt,
    source: "personal" as const,
  }));

  const planEntries: ExportEntry[] = getAllJournalEntries(planProgress).map(
    (e: PlanJournalEntry) => {
      const plan = studyPlans.find((p) => p.id === e.planId);
      return {
        text: e.text,
        createdAt: e.createdAt,
        source: "study-plan" as const,
        planName: plan?.title,
        planDay: e.day,
      };
    }
  );

  return [...personal, ...planEntries].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function JournalExportPage() {
  const [entries, setEntries] = useState<readonly ExportEntry[]>([]);

  useEffect(() => {
    setEntries(gatherAllEntries());
  }, []);

  const handlePrint = () => window.print();

  const handleText = () => {
    const lines: string[] = [];
    lines.push("THE WELL -- JOURNAL EXPORT");
    lines.push(`Exported: ${new Date().toLocaleDateString()}`);
    lines.push(`Total entries: ${entries.length}`);
    lines.push("=".repeat(60));

    for (const entry of entries) {
      lines.push("");
      const date = new Date(entry.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      if (entry.source === "study-plan" && entry.planName) {
        lines.push(`[${entry.planName} -- Day ${entry.planDay}] ${date}`);
      } else {
        lines.push(`[Personal] ${date}`);
      }
      lines.push("-".repeat(40));
      lines.push(entry.text);
      lines.push("");
    }

    downloadFile(lines.join("\n"), "the-well-journal.txt", "text/plain");
  };

  const handleJson = () => {
    const data = {
      exported: new Date().toISOString(),
      totalEntries: entries.length,
      entries: entries.map((e) => ({
        text: e.text,
        createdAt: e.createdAt,
        source: e.source,
        ...(e.planName ? { planName: e.planName, planDay: e.planDay } : {}),
      })),
    };
    downloadFile(
      JSON.stringify(data, null, 2),
      "the-well-journal.json",
      "application/json"
    );
  };

  return (
    <>
      {/* Controls */}
      <div className="min-h-screen pt-20 pb-16 px-4 print:hidden">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Link
              href="/journal"
              className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-xl font-semibold">Export Journal</h1>
              <p className="text-xs text-text-secondary">
                {entries.length} entries
              </p>
            </div>
          </div>

          <div className="bg-surface border border-border-light rounded-xl p-6 mb-6">
            <p className="text-sm text-text-secondary mb-4">
              Export all your journal entries -- personal reflections and study
              plan entries combined.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg text-sm hover:bg-accent-light transition-colors"
              >
                <Printer className="w-4 h-4" />
                Print / PDF
              </button>
              <button
                onClick={handleText}
                className="flex items-center gap-2 bg-surface border border-border-light text-text-primary px-4 py-2 rounded-lg text-sm hover:bg-surface/80 transition-colors"
              >
                <FileText className="w-4 h-4" />
                Text File
              </button>
              <button
                onClick={handleJson}
                className="flex items-center gap-2 bg-surface border border-border-light text-text-primary px-4 py-2 rounded-lg text-sm hover:bg-surface/80 transition-colors"
              >
                <FileJson className="w-4 h-4" />
                JSON
              </button>
            </div>
          </div>

          <p className="text-[10px] text-text-secondary mb-4">Preview:</p>
        </div>
      </div>

      {/* Printable content */}
      <div className="max-w-2xl mx-auto px-4 pb-16 print:px-0 print:max-w-none print:pt-0">
        <div className="text-center mb-8 print:mb-12 print:pt-16">
          <p className="text-[10px] text-text-secondary uppercase tracking-widest mb-2 print:text-xs">
            The Well
          </p>
          <h1 className="text-2xl font-serif font-semibold mb-1 print:text-3xl">
            Journal
          </h1>
          <p className="text-xs text-text-secondary">
            {entries.length} entries
          </p>
        </div>

        <div className="space-y-6">
          {entries.map((entry, i) => (
            <div
              key={i}
              className="border-t border-border-light pt-4 print:break-inside-avoid"
            >
              <div className="flex items-center gap-2 mb-2">
                {entry.source === "study-plan" && entry.planName ? (
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-accent/10 text-accent">
                    {entry.planName} -- Day {entry.planDay}
                  </span>
                ) : (
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-blue-400/10 text-blue-400">
                    Personal
                  </span>
                )}
                <span className="text-[10px] text-text-secondary">
                  {new Date(entry.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <p className="text-sm text-text-primary leading-relaxed whitespace-pre-wrap">
                {entry.text}
              </p>
            </div>
          ))}
        </div>

        {entries.length === 0 && (
          <p className="text-sm text-text-secondary text-center py-12">
            No journal entries to export yet.
          </p>
        )}

        <div className="text-center mt-12 pt-6 border-t border-border-light print:mt-16">
          <p className="text-[10px] text-text-secondary">
            Exported from The Well -- thewell.app
          </p>
        </div>
      </div>
    </>
  );
}
