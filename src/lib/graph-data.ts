// Knowledge graph data -- builds node/edge pairs from concepts, passages, and words
// Used by the /graph interactive visualization page

import { concepts, type Concept } from "./concepts";
import { allDossiers } from "./passages";
import { wordCorrections } from "./words";
import { domains } from "./domains";
import type { PassageDossier } from "./passage-types";

export interface GraphNode {
  readonly id: string;
  readonly label: string;
  readonly type: "concept" | "passage" | "word";
  readonly domainId: string | null;
  readonly domainColor: string;
  readonly slug: string;
  readonly connectionCount: number;
}

export interface GraphEdge {
  readonly source: string;
  readonly target: string;
  readonly type: "related-concept" | "text-ref" | "shared-term";
}

export interface GraphData {
  readonly nodes: readonly GraphNode[];
  readonly edges: readonly GraphEdge[];
}

const DOMAIN_COLORS: Record<string, string> = Object.fromEntries(
  domains.map((d) => [d.id, d.color])
);

const PASSAGE_COLOR = "#6B7280";
const WORD_COLOR = "#9333EA";

function buildConceptNodes(): GraphNode[] {
  return concepts.map((c) => ({
    id: `concept:${c.slug}`,
    label: c.name,
    type: "concept" as const,
    domainId: c.domainId,
    domainColor: DOMAIN_COLORS[c.domainId] ?? "#888",
    slug: c.slug,
    connectionCount: 0,
  }));
}

function buildPassageNodes(): GraphNode[] {
  return allDossiers.map((p) => ({
    id: `passage:${p.id}`,
    label: p.passage,
    type: "passage" as const,
    domainId: null,
    domainColor: PASSAGE_COLOR,
    slug: p.id,
    connectionCount: 0,
  }));
}

function buildWordNodes(): GraphNode[] {
  return wordCorrections.map((w) => ({
    id: `word:${w.id}`,
    label: w.transliteration,
    type: "word" as const,
    domainId: null,
    domainColor: WORD_COLOR,
    slug: w.id,
    connectionCount: 0,
  }));
}

function buildEdges(
  conceptList: readonly Concept[],
  dossiers: readonly PassageDossier[]
): GraphEdge[] {
  const edges: GraphEdge[] = [];
  const seen = new Set<string>();

  function addEdge(source: string, target: string, type: GraphEdge["type"]) {
    const key = [source, target].sort().join("--");
    if (seen.has(key)) return;
    seen.add(key);
    edges.push({ source, target, type });
  }

  // Concept-to-concept edges (relatedConceptSlugs)
  for (const c of conceptList) {
    for (const relSlug of c.relatedConceptSlugs) {
      addEdge(`concept:${c.slug}`, `concept:${relSlug}`, "related-concept");
    }
  }

  // Concept-to-passage edges (relatedTextRefs matching passage IDs)
  const passageIds = new Set(dossiers.map((d) => d.id));
  for (const c of conceptList) {
    for (const ref of c.relatedTextRefs) {
      // Text refs might be like "genesis-1-1" or passage IDs
      if (passageIds.has(ref)) {
        addEdge(`concept:${c.slug}`, `passage:${ref}`, "text-ref");
      }
    }
  }

  // Passage-to-word edges (shared transliterations)
  for (const d of dossiers) {
    for (const term of d.context.keyTerms) {
      const translit = term.transliteration.toLowerCase();
      if (!translit) continue;
      const matchingWord = wordCorrections.find(
        (w) => w.transliteration.toLowerCase() === translit
      );
      if (matchingWord) {
        addEdge(`passage:${d.id}`, `word:${matchingWord.id}`, "shared-term");
      }
    }
  }

  return edges;
}

export function buildGraphData(): GraphData {
  const conceptNodes = buildConceptNodes();
  const passageNodes = buildPassageNodes();
  const wordNodes = buildWordNodes();
  const edges = buildEdges(concepts, allDossiers);

  // Count connections per node
  const connectionCounts: Record<string, number> = {};
  for (const edge of edges) {
    connectionCounts[edge.source] = (connectionCounts[edge.source] ?? 0) + 1;
    connectionCounts[edge.target] = (connectionCounts[edge.target] ?? 0) + 1;
  }

  const allNodes = [...conceptNodes, ...passageNodes, ...wordNodes].map(
    (n) => ({
      ...n,
      connectionCount: connectionCounts[n.id] ?? 0,
    })
  );

  // Only include nodes that have at least one connection (skip orphans for cleaner graph)
  const connectedNodeIds = new Set<string>();
  for (const edge of edges) {
    connectedNodeIds.add(edge.source);
    connectedNodeIds.add(edge.target);
  }

  const connectedNodes = allNodes.filter(
    (n) => connectedNodeIds.has(n.id) || n.type === "concept"
  );

  return { nodes: connectedNodes, edges };
}

export function getDomainOptions(): Array<{ id: string; name: string; color: string }> {
  return domains.map((d) => ({ id: d.id, name: d.shortName, color: d.color }));
}
