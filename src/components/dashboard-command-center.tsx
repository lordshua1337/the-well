"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Route,
  Sparkles,
  PenLine,
  Calendar,
  ArrowRight,
  Flame,
} from "lucide-react";
import { loadStudyPlanProgress, getPlanProgress } from "@/lib/study-plan-progress";
import { studyPlans } from "@/lib/study-plans-data";
import { loadPathProgress } from "@/lib/path-progress";
import { loadPracticeProgress } from "@/lib/practice-progress";
import { loadProgress as loadReadingProgress } from "@/lib/reading-progress";
import { loadJournal } from "@/lib/journal";
import { loadStreak } from "@/lib/daily-streak";
import { domains } from "@/lib/domains";
import { concepts } from "@/lib/concepts";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface DashboardData {
  pathSteps: number;
  pathTotal: number;
  practiceMinutes: number;
  practiceSessions: number;
  conceptsRead: number;
  passagesRead: number;
  wordsRead: number;
  journalEntries: number;
  currentStreak: number;
  domainCoverage: readonly { name: string; color: string; percent: number }[];
  activePlan: { title: string; slug: string; day: number; total: number } | null;
  recentActivity: readonly { label: string; date: string }[];
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function DashboardCommandCenter() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const path = loadPathProgress();
    const practice = loadPracticeProgress();
    const reading = loadReadingProgress();
    const journal = loadJournal();
    const streak = loadStreak();
    const planProgress = loadStudyPlanProgress();

    // Find active study plan
    let activePlan: DashboardData["activePlan"] = null;
    for (const pp of planProgress.plans) {
      const plan = studyPlans.find((p) => p.id === pp.planId);
      if (plan && pp.completedDays.length < plan.totalDays) {
        activePlan = {
          title: plan.title,
          slug: plan.slug,
          day: pp.currentDay,
          total: plan.totalDays,
        };
        break;
      }
    }

    // Domain coverage
    const domainCoverage = domains.map((d) => {
      const domainConcepts = concepts.filter((c) => c.domainId === d.id);
      const readConcepts = domainConcepts.filter((c) =>
        reading.concepts.includes(c.id)
      );
      return {
        name: d.shortName,
        color: d.color,
        percent:
          domainConcepts.length > 0
            ? Math.round((readConcepts.length / domainConcepts.length) * 100)
            : 0,
      };
    });

    // Recent activity (last 5 entries from journal)
    const recentActivity = journal.entries.slice(0, 3).map((e) => ({
      label: e.text.slice(0, 60) + (e.text.length > 60 ? "..." : ""),
      date: new Date(e.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    }));

    // Total path steps
    const totalPathSteps = 28; // 7 stages * ~4 steps average

    setData({
      pathSteps: path.completedSteps.length,
      pathTotal: totalPathSteps,
      practiceMinutes: practice.totalMinutes,
      practiceSessions: practice.totalSessions,
      conceptsRead: reading.concepts.length,
      passagesRead: reading.passages.length,
      wordsRead: reading.words.length,
      journalEntries: journal.entries.length,
      currentStreak: streak.currentStreak,
      domainCoverage,
      activePlan,
      recentActivity,
    });
  }, []);

  if (!data) return null;

  // Only show if user has some progress
  const hasProgress =
    data.pathSteps > 0 ||
    data.conceptsRead > 0 ||
    data.practiceMinutes > 0 ||
    data.activePlan !== null;

  if (!hasProgress) return null;

  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs text-accent uppercase tracking-widest font-medium mb-2">
            Your Journey
          </p>
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold tracking-tight">
            Learning Command Center
          </h2>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <Link
            href="/path"
            className="bg-surface border border-border-light rounded-xl p-4 text-center card-hover block"
          >
            <Route className="w-4 h-4 text-accent mx-auto mb-1" />
            <p className="text-xl font-bold font-mono">{data.pathSteps}</p>
            <p className="text-[10px] text-text-secondary">Path Steps</p>
          </Link>

          <Link
            href="/explore"
            className="bg-surface border border-border-light rounded-xl p-4 text-center card-hover block"
          >
            <BookOpen className="w-4 h-4 text-blue-400 mx-auto mb-1" />
            <p className="text-xl font-bold font-mono">{data.conceptsRead}</p>
            <p className="text-[10px] text-text-secondary">Concepts Read</p>
          </Link>

          <Link
            href="/practices"
            className="bg-surface border border-border-light rounded-xl p-4 text-center card-hover block"
          >
            <Sparkles className="w-4 h-4 text-purple-400 mx-auto mb-1" />
            <p className="text-xl font-bold font-mono">
              {data.practiceMinutes}
            </p>
            <p className="text-[10px] text-text-secondary">Min Practiced</p>
          </Link>

          <div className="bg-surface border border-border-light rounded-xl p-4 text-center">
            <Flame className="w-4 h-4 text-orange-400 mx-auto mb-1" />
            <p className="text-xl font-bold font-mono">
              {data.currentStreak}
            </p>
            <p className="text-[10px] text-text-secondary">Day Streak</p>
          </div>
        </div>

        {/* Active study plan + domain coverage */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Active plan */}
          {data.activePlan ? (
            <Link
              href={`/plans/${data.activePlan.slug}`}
              className="bg-surface border border-accent/20 rounded-xl p-5 card-hover block"
            >
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-accent" />
                <h3 className="text-sm font-semibold">Active Study Plan</h3>
              </div>
              <p className="text-base font-medium mb-1">
                {data.activePlan.title}
              </p>
              <p className="text-xs text-text-secondary mb-3">
                Day {data.activePlan.day} of {data.activePlan.total}
              </p>
              <div className="h-1.5 bg-background rounded-full">
                <motion.div
                  className="h-full bg-accent rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((data.activePlan.day - 1) / data.activePlan.total) * 100}%`,
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="text-[10px] text-accent mt-2 inline-flex items-center gap-1">
                Continue <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ) : (
            <Link
              href="/plans"
              className="bg-surface border border-border-light rounded-xl p-5 card-hover block"
            >
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-accent" />
                <h3 className="text-sm font-semibold">Study Plans</h3>
              </div>
              <p className="text-xs text-text-secondary mb-3">
                Start a guided multi-day journey through The Well&apos;s content.
              </p>
              <span className="text-[10px] text-accent inline-flex items-center gap-1">
                Browse plans <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          )}

          {/* Domain coverage */}
          <div className="bg-surface border border-border-light rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold">Domain Coverage</h3>
              <Link
                href="/explore"
                className="text-[10px] text-accent hover:text-accent-light transition-colors"
              >
                View all
              </Link>
            </div>
            <div className="space-y-2">
              {data.domainCoverage.slice(0, 6).map((d) => (
                <div key={d.name} className="space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium truncate">
                      {d.name}
                    </span>
                    <span className="text-[10px] font-mono text-text-secondary">
                      {d.percent}%
                    </span>
                  </div>
                  <div className="h-1 bg-background rounded-full">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${Math.min(d.percent, 100)}%`,
                        backgroundColor: d.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Journal + Recommendations row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {/* Recent journal */}
          <Link
            href="/journal"
            className="bg-surface border border-border-light rounded-xl p-5 card-hover block"
          >
            <div className="flex items-center gap-2 mb-3">
              <PenLine className="w-4 h-4 text-accent" />
              <h3 className="text-sm font-semibold">Journal</h3>
              <span className="text-[10px] text-text-secondary ml-auto">
                {data.journalEntries} entries
              </span>
            </div>
            {data.recentActivity.length > 0 ? (
              <div className="space-y-2">
                {data.recentActivity.map((a, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Calendar className="w-3 h-3 text-text-secondary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-text-primary line-clamp-1">
                        {a.label}
                      </p>
                      <p className="text-[10px] text-text-secondary">
                        {a.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-text-secondary">
                Start writing reflections as you learn.
              </p>
            )}
          </Link>

          {/* Reading stats */}
          <div className="bg-surface border border-border-light rounded-xl p-5">
            <h3 className="text-sm font-semibold mb-3">Reading Progress</h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-lg font-bold font-mono text-blue-400">
                  {data.conceptsRead}
                </p>
                <p className="text-[10px] text-text-secondary">Concepts</p>
              </div>
              <div>
                <p className="text-lg font-bold font-mono text-amber-400">
                  {data.passagesRead}
                </p>
                <p className="text-[10px] text-text-secondary">Passages</p>
              </div>
              <div>
                <p className="text-lg font-bold font-mono text-purple-400">
                  {data.wordsRead}
                </p>
                <p className="text-[10px] text-text-secondary">Words</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
