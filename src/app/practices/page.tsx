"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, BookOpen, Eye, Heart, Users, Flame, Globe, MapPin, Compass, Landmark } from "lucide-react";
import { getAllPractices, getPracticesByCategory, type Practice } from "@/lib/practices-data";

type CategoryFilter = "all" | Practice["category"];
type DifficultyFilter = "all" | Practice["difficulty"];

const CATEGORIES: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "scripture", label: "Scripture" },
  { id: "silence", label: "Silence" },
  { id: "embodied", label: "Embodied" },
  { id: "relational", label: "Relational" },
];

const CATEGORY_DESCRIPTIONS: Record<Practice["category"], string> = {
  scripture: "Practices centered on sacred texts and their meanings",
  silence: "Practices of interior stillness and awareness",
  embodied: "Practices that involve the body as a vehicle for prayer",
  relational: "Practices of community, accountability, and justice",
};

const DIFFICULTY_LABELS: Record<Practice["difficulty"], string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

const DIFFICULTY_COLORS: Record<Practice["difficulty"], string> = {
  beginner: "text-accent bg-accent/10",
  intermediate: "text-gold bg-gold/10",
  advanced: "text-red-500 bg-red-500/10",
};

const ICON_MAP: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="w-5 h-5" />,
  Eye: <Eye className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  Compass: <Compass className="w-5 h-5" />,
  Heart: <Heart className="w-5 h-5" />,
  Flame: <Flame className="w-5 h-5" />,
  MapPin: <MapPin className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
  Landmark: <Landmark className="w-5 h-5" />,
};

function PracticeCard({ practice }: { practice: Practice }) {
  return (
    <Link
      href={`/practices/${practice.slug}`}
      className="group block bg-surface rounded-xl border border-border p-5 card-hover"
    >
      {/* Icon and category color bar */}
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${practice.color}15`, color: practice.color }}
        >
          {ICON_MAP[practice.icon] ?? <BookOpen className="w-5 h-5" />}
        </div>
        <span
          className={`text-[10px] uppercase tracking-widest font-medium px-2 py-0.5 rounded ${DIFFICULTY_COLORS[practice.difficulty]}`}
        >
          {DIFFICULTY_LABELS[practice.difficulty]}
        </span>
      </div>

      {/* Title and tradition */}
      <h3 className="font-serif text-lg text-text-primary group-hover:text-accent transition-colors mb-0.5">
        {practice.title}
      </h3>
      <p className="text-xs text-text-muted mb-2">{practice.tradition}</p>

      {/* Subtitle */}
      <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">
        {practice.subtitle}
      </p>

      {/* Meta row */}
      <div className="flex items-center gap-3 text-xs text-text-muted">
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {practice.estimatedMinutes > 0 ? `${practice.estimatedMinutes} min` : "Varies"}
        </span>
        <span className="text-border">|</span>
        <span className="capitalize">{practice.frequency.replace("-", " ")}</span>
      </div>
    </Link>
  );
}

export default function PracticesPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [activeDifficulty, setActiveDifficulty] = useState<DifficultyFilter>("all");

  const allPractices = getAllPractices();

  const filtered = useMemo(() => {
    let result = [...allPractices];

    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (activeDifficulty !== "all") {
      result = result.filter((p) => p.difficulty === activeDifficulty);
    }

    return result;
  }, [allPractices, activeCategory, activeDifficulty]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allPractices.length };
    for (const p of allPractices) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    }
    return counts;
  }, [allPractices]);

  // Group filtered practices by category when showing all
  const practicesByCategory = useMemo(() => {
    if (activeCategory !== "all") return null;

    const categories: Practice["category"][] = ["scripture", "silence", "embodied", "relational"];
    return categories
      .map((cat) => ({
        category: cat,
        practices: filtered.filter((p) => p.category === cat),
      }))
      .filter((group) => group.practices.length > 0);
  }, [activeCategory, filtered]);

  const categoryLabel = CATEGORIES.find((c) => c.id === activeCategory)?.label ?? "All";

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
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
            {allPractices.length} Practices
          </p>
          <h1 className="text-3xl sm:text-4xl mb-4">Things You Can Actually Do</h1>
          <p className="text-text-secondary leading-relaxed max-w-2xl">
            These are not ideas to believe. They are practices with step-by-step instructions drawn from contemplative traditions that have sustained people for centuries. Pick one. Try it today.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
                activeCategory === cat.id
                  ? "bg-accent text-white"
                  : "bg-surface border border-border text-text-secondary hover:text-accent hover:border-accent/30"
              }`}
            >
              {cat.label}
              <span className="ml-1.5 text-xs opacity-70">
                {categoryCounts[cat.id] ?? 0}
              </span>
            </button>
          ))}
        </div>

        {/* Difficulty filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(["all", "beginner", "intermediate", "advanced"] as DifficultyFilter[]).map((diff) => (
            <button
              key={diff}
              onClick={() => setActiveDifficulty(diff)}
              className={`text-xs px-3 py-1 rounded-full transition-colors ${
                activeDifficulty === diff
                  ? "bg-text-primary text-background"
                  : "bg-surface border border-border text-text-muted hover:text-text-secondary"
              }`}
            >
              {diff === "all" ? "Any difficulty" : DIFFICULTY_LABELS[diff]}
            </button>
          ))}
        </div>

        {/* Category description when a category is selected */}
        {activeCategory !== "all" && (
          <p className="text-sm text-text-muted mb-6 italic">
            {CATEGORY_DESCRIPTIONS[activeCategory as Practice["category"]]}
          </p>
        )}

        <div className="divider-warm mb-8" />

        {/* Practices grid -- grouped by category when showing all */}
        {practicesByCategory ? (
          <div className="space-y-10">
            {practicesByCategory.map((group) => (
              <div key={group.category}>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-sm font-semibold uppercase tracking-widest text-text-muted">
                    {CATEGORIES.find((c) => c.id === group.category)?.label}
                  </h2>
                  <div className="flex-1 h-px bg-border-light" />
                  <span className="text-xs text-text-muted">{group.practices.length}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {group.practices.map((practice) => (
                    <PracticeCard key={practice.id} practice={practice} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filtered.map((practice) => (
                  <PracticeCard key={practice.id} practice={practice} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-text-muted text-sm">
                No practices match your filters.
              </div>
            )}
          </div>
        )}

        {/* Count when filtered */}
        {(activeCategory !== "all" || activeDifficulty !== "all") && (
          <p className="text-center text-xs text-text-muted mt-8">
            {filtered.length} of {allPractices.length} practices shown
          </p>
        )}

        <div className="divider-warm mt-12 mb-8" />

        {/* Bottom CTA */}
        <div className="text-center bg-surface-warm rounded-xl p-8">
          <h3 className="text-xl mb-3">Not Sure Where to Start?</h3>
          <p className="text-text-secondary text-sm mb-6">
            The Examen takes fifteen minutes and works anywhere. Start there. It has sustained millions of people across five centuries.
          </p>
          <Link
            href="/practices/the-examen"
            className="bg-accent text-white px-6 py-2.5 rounded-lg font-medium hover:bg-accent-light transition-colors inline-flex items-center gap-2"
          >
            Try the Examen
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
