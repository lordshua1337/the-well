"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Network, BookOpen, ScrollText, Languages } from "lucide-react";
import { buildGraphData, getDomainOptions } from "@/lib/graph-data";
import { KnowledgeGraph } from "@/components/knowledge-graph";

export default function GraphPage() {
  const [domainFilter, setDomainFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  const graphData = useMemo(() => buildGraphData(), []);
  const domainOptions = useMemo(() => getDomainOptions(), []);

  const conceptCount = graphData.nodes.filter((n) => n.type === "concept").length;
  const passageCount = graphData.nodes.filter((n) => n.type === "passage").length;
  const wordCount = graphData.nodes.filter((n) => n.type === "word").length;

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-secondary mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Home
        </Link>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Network className="w-5 h-5 text-accent" />
            <h1 className="text-2xl font-bold">Knowledge Graph</h1>
          </div>
          <p className="text-sm text-text-secondary">
            Explore how concepts, passages, and words connect across the biblical
            scholarship landscape. Click any node to dive deeper.
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-xs text-text-muted">
          <span className="flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            {conceptCount} concepts
          </span>
          <span className="flex items-center gap-1">
            <ScrollText className="w-3 h-3" />
            {passageCount} passages
          </span>
          <span className="flex items-center gap-1">
            <Languages className="w-3 h-3" />
            {wordCount} words
          </span>
          <span>{graphData.edges.length} connections</span>
        </div>

        {/* Type filter */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <button
            onClick={() => setTypeFilter(null)}
            className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
              typeFilter === null
                ? "bg-accent/10 text-accent font-medium"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            All Types
          </button>
          {[
            { key: "concept", label: "Concepts", icon: BookOpen },
            { key: "passage", label: "Passages", icon: ScrollText },
            { key: "word", label: "Words", icon: Languages },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTypeFilter(typeFilter === key ? null : key)}
              className={`text-xs px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1 ${
                typeFilter === key
                  ? "bg-accent/10 text-accent font-medium"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              <Icon className="w-3 h-3" />
              {label}
            </button>
          ))}
        </div>

        {/* Domain filter */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          <button
            onClick={() => setDomainFilter(null)}
            className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
              domainFilter === null
                ? "bg-accent/10 text-accent font-medium"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            All Domains
          </button>
          {domainOptions.map((d) => (
            <button
              key={d.id}
              onClick={() =>
                setDomainFilter(domainFilter === d.id ? null : d.id)
              }
              className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                domainFilter === d.id
                  ? "font-medium"
                  : "text-text-muted hover:text-text-secondary"
              }`}
              style={
                domainFilter === d.id
                  ? { backgroundColor: `${d.color}15`, color: d.color }
                  : undefined
              }
            >
              {d.name}
            </button>
          ))}
        </div>

        {/* Graph */}
        <KnowledgeGraph
          data={graphData}
          domainFilter={domainFilter}
          typeFilter={typeFilter}
        />

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-4 text-[11px] text-text-muted">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2D6A4F]" />
            Concept links
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6B7280]" />
            Passage references
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#9333EA]" />
            Shared terms
          </span>
          <span className="ml-auto">
            Hover to highlight connections. Click to navigate.
          </span>
        </div>
      </div>
    </div>
  );
}
