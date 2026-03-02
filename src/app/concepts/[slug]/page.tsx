"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Microscope,
  AlertCircle,
  ScrollText,
  Archive,
  Languages,
  Landmark,
  Compass,
  Flame,
  Globe,
  MapPin,
  Eye,
  Users,
  Heart,
  Church,
} from "lucide-react";
import { concepts, getConceptBySlug, getConceptsByDomain, type Concept } from "@/lib/concepts";
import { getDomainById } from "@/lib/domains";

type DepthTab = "accessible" | "intermediate" | "advanced";

const depthConfig: Record<
  DepthTab,
  { label: string; icon: React.ReactNode; description: string }
> = {
  accessible: {
    label: "Accessible",
    icon: <BookOpen className="w-4 h-4" />,
    description: "Start here -- clear overview, no jargon",
  },
  intermediate: {
    label: "Intermediate",
    icon: <GraduationCap className="w-4 h-4" />,
    description: "Deeper context with scholarly detail",
  },
  advanced: {
    label: "Advanced",
    icon: <Microscope className="w-4 h-4" />,
    description: "Full academic treatment",
  },
};

const iconMap: Record<string, React.ReactNode> = {
  ScrollText: <ScrollText className="w-4 h-4" />,
  BookOpen: <BookOpen className="w-4 h-4" />,
  Archive: <Archive className="w-4 h-4" />,
  Languages: <Languages className="w-4 h-4" />,
  Landmark: <Landmark className="w-4 h-4" />,
  Compass: <Compass className="w-4 h-4" />,
  Flame: <Flame className="w-4 h-4" />,
  Church: <Church className="w-4 h-4" />,
  Globe: <Globe className="w-4 h-4" />,
  MapPin: <MapPin className="w-4 h-4" />,
  Eye: <Eye className="w-4 h-4" />,
  Users: <Users className="w-4 h-4" />,
  Heart: <Heart className="w-4 h-4" />,
};

function RelatedConceptCard({ slug }: { slug: string }) {
  const concept = getConceptBySlug(slug);
  if (!concept) return null;
  const domain = getDomainById(concept.domainId);

  return (
    <Link
      href={`/concepts/${concept.slug}`}
      className="group bg-surface rounded-lg border border-border p-4 card-hover block"
    >
      <div className="flex items-center gap-2 mb-1.5">
        {domain && (
          <span
            className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded"
            style={{
              backgroundColor: `${domain.color}15`,
              color: domain.color,
            }}
          >
            {domain.shortName}
          </span>
        )}
      </div>
      <h4 className="text-sm font-semibold group-hover:text-accent transition-colors">
        {concept.name}
      </h4>
      <p className="text-xs text-text-secondary mt-1 line-clamp-2">
        {concept.summary}
      </p>
    </Link>
  );
}

export default function ConceptDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [activeTab, setActiveTab] = useState<DepthTab>("accessible");

  const concept = useMemo(() => getConceptBySlug(slug), [slug]);
  const domain = useMemo(
    () => (concept ? getDomainById(concept.domainId) : undefined),
    [concept]
  );

  const { prevConcept, nextConcept } = useMemo(() => {
    if (!concept) return { prevConcept: null, nextConcept: null };
    const domainConcepts = getConceptsByDomain(concept.domainId);
    const idx = domainConcepts.findIndex((c) => c.id === concept.id);
    return {
      prevConcept: idx > 0 ? domainConcepts[idx - 1] : null,
      nextConcept: idx < domainConcepts.length - 1 ? domainConcepts[idx + 1] : null,
    };
  }, [concept]);

  if (!concept || !domain) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl mb-4">Concept not found</h1>
          <Link
            href="/explore"
            className="text-accent hover:text-accent-light transition-colors inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-text-muted mb-6">
          <Link
            href="/explore"
            className="hover:text-text-secondary transition-colors"
          >
            Explore
          </Link>
          <span>/</span>
          <Link
            href={`/explore/${domain.slug}`}
            className="hover:text-text-secondary transition-colors"
            style={{ color: domain.color }}
          >
            {domain.shortName}
          </Link>
          <span>/</span>
          <span className="text-text-secondary truncate">{concept.name}</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-[10px] uppercase tracking-widest font-medium px-2 py-0.5 rounded"
              style={{
                backgroundColor: `${domain.color}15`,
                color: domain.color,
              }}
            >
              {domain.shortName}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl mb-3">{concept.name}</h1>
          <p className="text-text-secondary leading-relaxed">
            {concept.summary}
          </p>

          {/* Lens tags */}
          {concept.lensTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {concept.lensTags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full bg-surface-warm text-text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Depth Tabs */}
        <div className="flex gap-1 bg-surface rounded-xl border border-border p-1 mb-6">
          {(Object.keys(depthConfig) as DepthTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-accent text-white shadow-sm"
                  : "text-text-muted hover:text-text-secondary hover:bg-background"
              }`}
            >
              {depthConfig[tab].icon}
              <span className="hidden sm:inline">{depthConfig[tab].label}</span>
            </button>
          ))}
        </div>

        {/* Tab description */}
        <p className="text-xs text-text-muted mb-4">
          {depthConfig[activeTab].description}
        </p>

        {/* Content */}
        <div className="bg-surface rounded-xl border border-border p-6 sm:p-8 mb-8 animate-fade-in">
          <div className="prose-custom">
            {concept.layers[activeTab].split("\n\n").map((paragraph, i) => (
              <p
                key={i}
                className="text-text-secondary leading-relaxed mb-4 last:mb-0"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Honest Analysis */}
        {concept.honestAnalysis && (
          <div className="bg-surface-warm rounded-xl border border-border p-5 sm:p-6 mb-8">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-4 h-4 text-gold" />
              <h3 className="text-sm font-semibold">Honest Analysis</h3>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              {concept.honestAnalysis}
            </p>
          </div>
        )}

        {/* Text References */}
        {concept.relatedTextRefs.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold mb-3 text-text-muted uppercase tracking-wider">
              Referenced Texts
            </h3>
            <div className="flex flex-wrap gap-2">
              {concept.relatedTextRefs.map((ref) => (
                <span
                  key={ref}
                  className="text-xs bg-surface border border-border rounded-lg px-3 py-1.5 text-text-secondary"
                >
                  {ref}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related Concepts */}
        {concept.relatedConceptSlugs.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold mb-3 text-text-muted uppercase tracking-wider">
              Related Concepts
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {concept.relatedConceptSlugs.map((relSlug) => (
                <RelatedConceptCard key={relSlug} slug={relSlug} />
              ))}
            </div>
          </div>
        )}

        {/* Ask about this concept */}
        <div className="bg-surface rounded-xl border border-border p-5 text-center">
          <p className="text-sm text-text-secondary mb-3">
            Want to go deeper?
          </p>
          <Link
            href={`/ask?topic=${encodeURIComponent(concept.name)}`}
            className="inline-flex items-center gap-2 bg-accent text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-accent-light transition-colors"
          >
            Ask The Well <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Bottom nav */}
        <div className="mt-8 pt-6 border-t border-border-light flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <Link
              href={`/explore/${domain.slug}`}
              className="text-sm text-text-muted hover:text-text-secondary transition-colors inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to {domain.shortName}
            </Link>
            {prevConcept && (
              <Link
                href={`/concepts/${prevConcept.slug}`}
                className="text-sm text-accent hover:text-accent-light transition-colors inline-flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> {prevConcept.name}
              </Link>
            )}
          </div>
          {nextConcept && (
            <Link
              href={`/concepts/${nextConcept.slug}`}
              className="text-sm text-accent hover:text-accent-light transition-colors inline-flex items-center gap-1"
            >
              {nextConcept.name} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
