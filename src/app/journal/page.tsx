"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  PenLine,
  Plus,
  Trash2,
  Tag,
  Calendar,
  BookOpen,
  Download,
} from "lucide-react";
import {
  loadJournal,
  addEntry,
  deleteEntry,
  type JournalState,
  type JournalTag,
  type FreeJournalEntry,
} from "@/lib/journal";
import {
  loadStudyPlanProgress,
  getAllJournalEntries,
  type JournalEntry as PlanJournalEntry,
} from "@/lib/study-plan-progress";
import { studyPlans } from "@/lib/study-plans-data";

// ---------------------------------------------------------------------------
// Combined entry type for display
// ---------------------------------------------------------------------------

interface DisplayEntry {
  readonly id: string;
  readonly text: string;
  readonly createdAt: string;
  readonly source: "free" | "plan";
  readonly planName?: string;
  readonly planDay?: number;
  readonly tags: readonly JournalTag[];
}

// ---------------------------------------------------------------------------
// New Entry Form
// ---------------------------------------------------------------------------

function NewEntryForm({
  onSubmit,
}: {
  onSubmit: (text: string, tags: readonly JournalTag[]) => void;
}) {
  const [text, setText] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = useCallback(() => {
    if (text.trim()) {
      onSubmit(text.trim(), []);
      setText("");
      setIsOpen(false);
    }
  }, [text, onSubmit]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center gap-3 bg-surface border border-border-light rounded-xl px-4 py-3 text-text-secondary hover:border-accent/30 transition-colors"
      >
        <Plus className="w-4 h-4" />
        <span className="text-sm">Write a new entry...</span>
      </button>
    );
  }

  return (
    <div className="bg-surface border border-accent/30 rounded-xl p-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What are you thinking about? What's stirring in you?"
        className="w-full bg-transparent text-sm resize-none h-32 focus:outline-none"
        autoFocus
      />
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-border-light">
        <button
          onClick={() => {
            setIsOpen(false);
            setText("");
          }}
          className="text-xs text-text-secondary hover:text-text-primary transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="text-xs bg-accent text-white px-4 py-1.5 rounded-lg hover:bg-accent-light transition-colors disabled:opacity-50"
        >
          Save Entry
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Entry Card
// ---------------------------------------------------------------------------

function EntryCard({
  entry,
  onDelete,
}: {
  entry: DisplayEntry;
  onDelete?: () => void;
}) {
  return (
    <div className="bg-surface border border-border-light rounded-xl p-4">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {entry.source === "plan" && entry.planName && (
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-accent/10 text-accent">
              {entry.planName} -- Day {entry.planDay}
            </span>
          )}
          <span className="text-[10px] text-text-secondary flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(entry.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
        {onDelete && (
          <button
            onClick={onDelete}
            className="text-text-secondary hover:text-red-400 transition-colors p-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <p className="text-sm text-text-primary leading-relaxed whitespace-pre-wrap">
        {entry.text}
      </p>

      {entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {entry.tags.map((tag, i) => (
            <span
              key={i}
              className="text-[10px] text-text-secondary flex items-center gap-1 bg-background px-2 py-0.5 rounded"
            >
              <Tag className="w-2.5 h-2.5" />
              {tag.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function JournalPage() {
  const [journal, setJournal] = useState<JournalState>({ entries: [] });
  const [filter, setFilter] = useState<"all" | "free" | "plan">("all");

  useEffect(() => {
    setJournal(loadJournal());
  }, []);

  // Combine free entries + plan journal entries
  const allEntries = useMemo((): readonly DisplayEntry[] => {
    const freeEntries: DisplayEntry[] = journal.entries.map((e) => ({
      id: e.id,
      text: e.text,
      createdAt: e.createdAt,
      source: "free" as const,
      tags: e.tags,
    }));

    const planProgress = loadStudyPlanProgress();
    const planEntries: DisplayEntry[] = getAllJournalEntries(planProgress).map(
      (e: PlanJournalEntry) => {
        const plan = studyPlans.find((p) => p.id === e.planId);
        return {
          id: `plan_${e.planId}_${e.day}_${e.createdAt}`,
          text: e.text,
          createdAt: e.createdAt,
          source: "plan" as const,
          planName: plan?.title,
          planDay: e.day,
          tags: [],
        };
      }
    );

    const combined = [...freeEntries, ...planEntries];
    return combined.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [journal]);

  const filteredEntries =
    filter === "all"
      ? allEntries
      : allEntries.filter((e) => e.source === filter);

  const handleAdd = useCallback(
    (text: string, tags: readonly JournalTag[]) => {
      setJournal(addEntry(journal, text, tags));
    },
    [journal]
  );

  const handleDelete = useCallback(
    (entryId: string) => {
      setJournal(deleteEntry(journal, entryId));
    },
    [journal]
  );

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link
            href="/"
            className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-semibold flex items-center gap-2">
              <PenLine className="w-5 h-5 text-accent" />
              Journal
            </h1>
            <p className="text-xs text-text-secondary">
              {allEntries.length} entries
            </p>
          </div>
          <Link
            href="/journal/export"
            className="p-2 rounded-lg text-text-secondary hover:text-accent hover:bg-surface transition-colors"
            title="Export journal"
          >
            <Download className="w-4 h-4" />
          </Link>
        </div>

        {/* New entry */}
        <div className="mb-6">
          <NewEntryForm onSubmit={handleAdd} />
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1.5 mb-4">
          {(["all", "free", "plan"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-[10px] px-3 py-1.5 rounded-lg transition-colors ${
                filter === f
                  ? "bg-accent/10 text-accent"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {f === "all"
                ? "All"
                : f === "free"
                  ? "Personal"
                  : "Study Plans"}
            </button>
          ))}
        </div>

        {/* Entries */}
        <div className="space-y-3">
          {filteredEntries.map((entry) => (
            <EntryCard
              key={entry.id}
              entry={entry}
              onDelete={
                entry.source === "free"
                  ? () => handleDelete(entry.id)
                  : undefined
              }
            />
          ))}
        </div>

        {filteredEntries.length === 0 && (
          <div className="bg-surface border border-border-light rounded-xl p-8 text-center">
            <BookOpen className="w-10 h-10 text-text-secondary mx-auto mb-3" />
            <p className="text-sm text-text-secondary">
              {filter === "plan"
                ? "No study plan reflections yet. Start a study plan to begin."
                : "No journal entries yet. Write your first reflection."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
