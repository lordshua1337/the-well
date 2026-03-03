"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  BookOpen,
  Eye,
  Heart,
  Users,
  Flame,
  Globe,
  MapPin,
  Compass,
  Landmark,
  CheckCircle2,
  Play,
  Star,
} from "lucide-react";
import { getPracticeBySlug, getAllPractices, type Practice } from "@/lib/practices-data";
import {
  loadPracticeProgress,
  savePracticeProgress,
  logPractice,
  toggleFavorite,
  hasPracticeBeenCompleted,
  isFavoritePractice,
  getSessionsForPractice,
  type PracticeProgress,
} from "@/lib/practice-progress";
import { PracticeTimer } from "@/components/practice-timer";
import { GuidedPractice } from "@/components/guided-practice";

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

const CATEGORY_LABELS: Record<Practice["category"], string> = {
  scripture: "Scripture",
  silence: "Silence & Awareness",
  embodied: "Embodied",
  relational: "Relational & Justice",
};

function RelatedPracticeCard({ slug, currentSlug }: { slug: string; currentSlug: string }) {
  const all = getAllPractices();
  const practice = all.find((p) => p.slug === slug);
  if (!practice || practice.slug === currentSlug) return null;

  return (
    <Link
      href={`/practices/${practice.slug}`}
      className="group bg-surface rounded-lg border border-border p-4 card-hover block"
    >
      <h4 className="text-sm font-semibold group-hover:text-accent transition-colors mb-1">
        {practice.title}
      </h4>
      <p className="text-xs text-text-secondary line-clamp-2">{practice.subtitle}</p>
    </Link>
  );
}

export default function PracticeDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const practice = useMemo(() => getPracticeBySlug(slug), [slug]);
  const allPractices = getAllPractices();

  const [progress, setProgress] = useState<PracticeProgress | null>(null);
  const [showGuided, setShowGuided] = useState(false);
  const [justLogged, setJustLogged] = useState(false);

  useEffect(() => {
    setProgress(loadPracticeProgress());
  }, []);

  const isCompleted = useMemo(
    () => (progress && practice ? hasPracticeBeenCompleted(progress, practice.id) : false),
    [progress, practice]
  );

  const isFavorite = useMemo(
    () => (progress && practice ? isFavoritePractice(progress, practice.id) : false),
    [progress, practice]
  );

  const sessionCount = useMemo(
    () => (progress && practice ? getSessionsForPractice(progress, practice.id).length : 0),
    [progress, practice]
  );

  const handleLogCompletion = useCallback(() => {
    if (!practice) return;
    const current = loadPracticeProgress();
    const updated = logPractice(current, practice.id, practice.estimatedMinutes);
    savePracticeProgress(updated);
    setProgress(updated);
    setJustLogged(true);
    setTimeout(() => setJustLogged(false), 3000);
  }, [practice]);

  const handleToggleFavorite = useCallback(() => {
    if (!practice) return;
    const current = loadPracticeProgress();
    const updated = toggleFavorite(current, practice.id);
    savePracticeProgress(updated);
    setProgress(updated);
  }, [practice]);

  const handleGuidedComplete = useCallback(() => {
    if (!practice) return;
    const current = loadPracticeProgress();
    const updated = logPractice(current, practice.id, practice.estimatedMinutes);
    savePracticeProgress(updated);
    setProgress(updated);
  }, [practice]);

  // Sibling practices in same category
  const siblingPractices = useMemo(() => {
    if (!practice) return [];
    return allPractices
      .filter((p) => p.category === practice.category && p.slug !== practice.slug)
      .slice(0, 2);
  }, [practice, allPractices]);

  if (!practice) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl mb-4">Practice not found</h1>
          <Link
            href="/practices"
            className="text-accent hover:text-accent-light transition-colors inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Practices
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {showGuided && (
        <GuidedPractice
          practice={practice}
          onClose={() => setShowGuided(false)}
          onComplete={handleGuidedComplete}
        />
      )}

      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-text-muted mb-6">
            <Link href="/practices" className="hover:text-text-secondary transition-colors">
              Practices
            </Link>
            <span>/</span>
            <span
              className="font-medium"
              style={{ color: practice.color }}
            >
              {CATEGORY_LABELS[practice.category]}
            </span>
            <span>/</span>
            <span className="text-text-secondary truncate">{practice.title}</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${practice.color}15`, color: practice.color }}
                >
                  {ICON_MAP[practice.icon] ?? <BookOpen className="w-5 h-5" />}
                </div>
                <div>
                  <span
                    className={`text-[10px] uppercase tracking-widest font-medium px-2 py-0.5 rounded ${DIFFICULTY_COLORS[practice.difficulty]}`}
                  >
                    {DIFFICULTY_LABELS[practice.difficulty]}
                  </span>
                </div>
              </div>

              {/* Favorite button */}
              <button
                onClick={handleToggleFavorite}
                className={`p-2 rounded-lg transition-colors ${
                  isFavorite
                    ? "text-gold bg-gold/10"
                    : "text-text-muted hover:text-gold hover:bg-gold/10"
                }`}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Star className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl mb-2">{practice.title}</h1>
            <p className="text-text-muted text-sm mb-3">{practice.tradition}</p>
            <p className="text-text-secondary leading-relaxed mb-4">{practice.subtitle}</p>

            {/* Meta tags */}
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-surface border border-border rounded-lg px-3 py-1.5 text-text-secondary flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {practice.estimatedMinutes > 0
                  ? `${practice.estimatedMinutes} minutes`
                  : "Variable duration"}
              </span>
              <span className="text-xs bg-surface border border-border rounded-lg px-3 py-1.5 text-text-secondary capitalize">
                {practice.frequency.replace("-", " ")}
              </span>
              <span className="text-xs bg-surface border border-border rounded-lg px-3 py-1.5 text-text-secondary">
                {CATEGORY_LABELS[practice.category]}
              </span>
            </div>
          </div>

          {/* Origin and purpose */}
          <div className="bg-surface-warm rounded-xl border border-border p-5 mb-8">
            <p className="text-xs text-text-muted uppercase tracking-widest mb-2">Origin</p>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">{practice.origin}</p>
            <p className="text-xs text-text-muted uppercase tracking-widest mb-2">Purpose</p>
            <p className="text-sm text-text-secondary leading-relaxed">{practice.purpose}</p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => setShowGuided(true)}
              className="flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-lg font-medium hover:bg-accent-light transition-colors text-sm"
            >
              <Play className="w-4 h-4" />
              Start guided practice
            </button>

            {!isCompleted ? (
              <button
                onClick={handleLogCompletion}
                className="flex items-center gap-2 bg-surface border border-border text-text-secondary px-5 py-2.5 rounded-lg font-medium hover:border-accent/30 hover:text-accent transition-colors text-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                I completed this practice
              </button>
            ) : (
              <div className="flex items-center gap-2 text-accent text-sm font-medium px-5 py-2.5 rounded-lg bg-accent/5 border border-accent/20">
                <CheckCircle2 className="w-4 h-4 fill-current" />
                {sessionCount === 1 ? "Completed once" : `Completed ${sessionCount} times`}
              </div>
            )}
          </div>

          {/* Completion confirmation */}
          {justLogged && (
            <div className="mb-6 bg-accent/5 border border-accent/20 rounded-xl p-4 animate-fade-in">
              <p className="text-sm text-accent">
                Logged. Whatever happened -- or did not happen -- counts.
              </p>
            </div>
          )}

          {/* Timer (if time-based) */}
          {practice.estimatedMinutes > 0 && (
            <div className="bg-surface rounded-xl border border-border p-6 mb-8">
              <p className="text-xs text-text-muted uppercase tracking-widest mb-4 text-center">
                Practice Timer
              </p>
              <div className="flex justify-center">
                <PracticeTimer minutes={practice.estimatedMinutes} />
              </div>
            </div>
          )}

          <div className="divider-warm mb-8" />

          {/* Step-by-step walkthrough */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-6">How to practice</h2>
            <div className="space-y-4">
              {practice.steps.map((step, index) => (
                <div
                  key={step.order}
                  className="bg-surface rounded-xl border border-border p-5"
                >
                  <div className="flex items-start gap-4">
                    {/* Step number */}
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 mt-0.5"
                      style={{ backgroundColor: `${practice.color}15`, color: practice.color }}
                    >
                      {index + 1}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                        <h3 className="font-medium text-text-primary">{step.title}</h3>
                        {step.duration && (
                          <span className="text-xs text-text-muted flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {step.duration}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {step.instruction}
                      </p>
                      {step.note && (
                        <p className="text-xs text-text-muted italic mt-2 leading-relaxed">
                          Note: {step.note}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Variations */}
          {practice.variations.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Variations</h2>
              <div className="space-y-3">
                {practice.variations.map((variation) => (
                  <div
                    key={variation.name}
                    className="bg-surface-warm rounded-xl border border-border p-5"
                  >
                    <h3 className="font-medium text-sm mb-2">{variation.name}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {variation.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Common mistakes */}
          {practice.commonMistakes.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Common mistakes</h2>
              <div className="space-y-3">
                {practice.commonMistakes.map((mistake, i) => (
                  <div
                    key={i}
                    className="flex gap-3 bg-surface rounded-xl border border-border p-4"
                  >
                    <span className="text-red-400 shrink-0 mt-0.5 text-sm">--</span>
                    <p className="text-sm text-text-secondary leading-relaxed">{mistake}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Go deeper */}
          <div className="mb-8">
            <div className="bg-surface rounded-xl border border-border p-6">
              <p className="text-xs text-accent uppercase tracking-widest font-medium mb-3">
                Go Deeper
              </p>
              <p className="text-sm text-text-secondary leading-relaxed">{practice.goDeeper}</p>
            </div>
          </div>

          {/* Related concepts */}
          {practice.relatedConceptSlugs.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-text-muted mb-3">
                Related Concepts
              </h2>
              <div className="flex flex-wrap gap-2">
                {practice.relatedConceptSlugs.map((conceptSlug) => (
                  <Link
                    key={conceptSlug}
                    href={`/concepts/${conceptSlug}`}
                    className="inline-flex items-center gap-1.5 text-sm text-accent bg-accent/5 border border-accent/20 px-3 py-1.5 rounded-lg hover:bg-accent/10 transition-colors"
                  >
                    {conceptSlug.replace(/-/g, " ")}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Other practices in this category */}
          {siblingPractices.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-text-muted mb-3">
                More in {CATEGORY_LABELS[practice.category]}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {siblingPractices.map((p) => (
                  <RelatedPracticeCard key={p.slug} slug={p.slug} currentSlug={practice.slug} />
                ))}
              </div>
            </div>
          )}

          {/* Bottom navigation */}
          <div className="pt-6 border-t border-border-light flex items-center justify-between">
            <Link
              href="/practices"
              className="text-sm text-text-muted hover:text-text-secondary transition-colors inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All practices
            </Link>

            <Link
              href="/ask"
              className="text-sm text-accent hover:text-accent-light transition-colors inline-flex items-center gap-1"
            >
              Ask a question
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
