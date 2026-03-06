"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import type { GraphNode, GraphEdge, GraphData } from "@/lib/graph-data";

// ---------------------------------------------------------------------------
// Force-directed layout simulation
// ---------------------------------------------------------------------------

interface SimNode {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  node: GraphNode;
}

interface SimEdge {
  source: SimNode;
  target: SimNode;
  edge: GraphEdge;
}

function initSimulation(
  data: GraphData,
  width: number,
  height: number
): { simNodes: SimNode[]; simEdges: SimEdge[] } {
  const nodeMap = new Map<string, SimNode>();

  const simNodes: SimNode[] = data.nodes.map((n, i) => {
    const angle = (i / data.nodes.length) * Math.PI * 2;
    const spread = Math.min(width, height) * 0.35;
    const sim: SimNode = {
      id: n.id,
      x: width / 2 + Math.cos(angle) * spread * (0.5 + Math.random() * 0.5),
      y: height / 2 + Math.sin(angle) * spread * (0.5 + Math.random() * 0.5),
      vx: 0,
      vy: 0,
      radius: Math.max(4, Math.min(16, 4 + n.connectionCount * 1.5)),
      node: n,
    };
    nodeMap.set(n.id, sim);
    return sim;
  });

  const simEdges: SimEdge[] = [];
  for (const e of data.edges) {
    const source = nodeMap.get(e.source);
    const target = nodeMap.get(e.target);
    if (source && target) {
      simEdges.push({ source, target, edge: e });
    }
  }

  return { simNodes, simEdges };
}

function tickSimulation(
  nodes: SimNode[],
  edges: SimEdge[],
  width: number,
  height: number
): void {
  const repulsion = 800;
  const attraction = 0.005;
  const damping = 0.85;
  const centerPull = 0.001;

  // Repulsion between all pairs
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i];
      const b = nodes[j];
      let dx = b.x - a.x;
      let dy = b.y - a.y;
      const dist = Math.max(1, Math.sqrt(dx * dx + dy * dy));
      const force = repulsion / (dist * dist);
      dx = (dx / dist) * force;
      dy = (dy / dist) * force;
      a.vx -= dx;
      a.vy -= dy;
      b.vx += dx;
      b.vy += dy;
    }
  }

  // Attraction along edges
  for (const e of edges) {
    const dx = e.target.x - e.source.x;
    const dy = e.target.y - e.source.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const force = dist * attraction;
    const fx = (dx / Math.max(1, dist)) * force;
    const fy = (dy / Math.max(1, dist)) * force;
    e.source.vx += fx;
    e.source.vy += fy;
    e.target.vx -= fx;
    e.target.vy -= fy;
  }

  // Center pull + update positions
  for (const n of nodes) {
    n.vx += (width / 2 - n.x) * centerPull;
    n.vy += (height / 2 - n.y) * centerPull;
    n.vx *= damping;
    n.vy *= damping;
    n.x += n.vx;
    n.y += n.vy;
    // Keep in bounds
    n.x = Math.max(n.radius + 20, Math.min(width - n.radius - 20, n.x));
    n.y = Math.max(n.radius + 20, Math.min(height - n.radius - 20, n.y));
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const TYPE_LABELS: Record<string, string> = {
  concept: "Concept",
  passage: "Passage",
  word: "Word",
};

export function KnowledgeGraph({
  data,
  domainFilter,
  typeFilter,
}: {
  data: GraphData;
  domainFilter: string | null;
  typeFilter: string | null;
}) {
  const router = useRouter();
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const animRef = useRef<number>(0);
  const [, forceUpdate] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchMatch, setSearchMatch] = useState<string | null>(null);

  // Filter data
  const filteredData = useMemo(() => {
    let nodes = [...data.nodes];
    if (domainFilter) {
      nodes = nodes.filter(
        (n) => n.domainId === domainFilter || n.type !== "concept"
      );
    }
    if (typeFilter) {
      nodes = nodes.filter((n) => n.type === typeFilter);
    }
    const nodeIds = new Set(nodes.map((n) => n.id));
    const edges = data.edges.filter(
      (e) => nodeIds.has(e.source) && nodeIds.has(e.target)
    );
    return { nodes, edges };
  }, [data, domainFilter, typeFilter]);

  // Simulation state
  const simRef = useRef<{ simNodes: SimNode[]; simEdges: SimEdge[] } | null>(null);
  const iterRef = useRef(0);

  useEffect(() => {
    const container = svgRef.current?.parentElement;
    if (container) {
      setDimensions({
        width: container.clientWidth,
        height: Math.max(500, container.clientHeight),
      });
    }
  }, []);

  useEffect(() => {
    simRef.current = initSimulation(
      filteredData,
      dimensions.width,
      dimensions.height
    );
    iterRef.current = 0;

    function animate() {
      if (!simRef.current) return;
      tickSimulation(
        simRef.current.simNodes,
        simRef.current.simEdges,
        dimensions.width,
        dimensions.height
      );
      iterRef.current++;
      forceUpdate((v) => v + 1);
      // Run for 200 iterations then slow down
      if (iterRef.current < 200) {
        animRef.current = requestAnimationFrame(animate);
      } else if (iterRef.current < 400) {
        // Slow tick
        setTimeout(() => {
          animRef.current = requestAnimationFrame(animate);
        }, 100);
      }
    }

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [filteredData, dimensions]);

  const handleNodeClick = useCallback(
    (node: GraphNode) => {
      if (node.type === "concept") {
        router.push(`/concepts/${node.slug}`);
      } else if (node.type === "passage") {
        router.push(`/passages/${node.slug}`);
      } else if (node.type === "word") {
        router.push(`/words#${node.slug}`);
      }
    },
    [router]
  );

  // Zoom via mouse wheel
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom((z) => Math.max(0.3, Math.min(3, z + delta)));
  }, []);

  // Pan via mouse drag on background
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as Element).tagName === "circle") return;
    setIsPanning(true);
    panStartRef.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
  }, [pan]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning) return;
    setPan({
      x: panStartRef.current.panX + (e.clientX - panStartRef.current.x),
      y: panStartRef.current.panY + (e.clientY - panStartRef.current.y),
    });
  }, [isPanning]);

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Search
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    if (!term.trim() || !simRef.current) {
      setSearchMatch(null);
      return;
    }
    const lower = term.toLowerCase();
    const match = simRef.current.simNodes.find((n) =>
      n.node.label.toLowerCase().includes(lower)
    );
    if (match) {
      setSearchMatch(match.id);
      // Center on the matched node
      setPan({
        x: dimensions.width / 2 - match.x * zoom,
        y: dimensions.height / 2 - match.y * zoom,
      });
    } else {
      setSearchMatch(null);
    }
  }, [dimensions, zoom]);

  const handleResetView = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSearchTerm("");
    setSearchMatch(null);
  }, []);

  if (!simRef.current) return null;

  const { simNodes, simEdges } = simRef.current;

  // Determine which edges to highlight on hover
  const highlightedEdges = new Set<number>();
  const highlightedNodes = new Set<string>();
  if (hoveredNode) {
    highlightedNodes.add(hoveredNode);
    simEdges.forEach((e, i) => {
      if (e.source.id === hoveredNode || e.target.id === hoveredNode) {
        highlightedEdges.add(i);
        highlightedNodes.add(e.source.id);
        highlightedNodes.add(e.target.id);
      }
    });
  }

  const hoveredData = hoveredNode
    ? simNodes.find((n) => n.id === hoveredNode)
    : null;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: dimensions.height }}
    >
      {/* Search + Controls */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search nodes..."
          className="px-3 py-1.5 rounded-lg text-xs bg-surface border border-border text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
          style={{ width: 180 }}
        />
      </div>
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1">
        <button
          onClick={() => setZoom((z) => Math.min(3, z + 0.2))}
          className="w-7 h-7 rounded-lg bg-surface border border-border text-text-secondary text-xs flex items-center justify-center hover:text-text-primary transition-colors"
          title="Zoom in"
        >
          +
        </button>
        <span className="text-[10px] text-text-muted w-10 text-center font-mono">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={() => setZoom((z) => Math.max(0.3, z - 0.2))}
          className="w-7 h-7 rounded-lg bg-surface border border-border text-text-secondary text-xs flex items-center justify-center hover:text-text-primary transition-colors"
          title="Zoom out"
        >
          -
        </button>
        <button
          onClick={handleResetView}
          className="ml-1 px-2 h-7 rounded-lg bg-surface border border-border text-text-secondary text-[10px] flex items-center justify-center hover:text-text-primary transition-colors"
          title="Reset view"
        >
          Reset
        </button>
      </div>

      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="bg-surface rounded-xl border border-border"
        style={{ cursor: isPanning ? "grabbing" : "grab" }}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <g transform={`translate(${pan.x},${pan.y}) scale(${zoom})`}>
        {/* Edges */}
        {simEdges.map((e, i) => {
          const isHighlighted = highlightedEdges.has(i);
          const isHoverActive = hoveredNode !== null;
          return (
            <line
              key={i}
              x1={e.source.x}
              y1={e.source.y}
              x2={e.target.x}
              y2={e.target.y}
              stroke={
                e.edge.type === "related-concept"
                  ? "#2D6A4F"
                  : e.edge.type === "text-ref"
                    ? "#6B7280"
                    : "#9333EA"
              }
              strokeWidth={isHighlighted ? 2 : 0.5}
              strokeOpacity={
                isHoverActive ? (isHighlighted ? 0.8 : 0.05) : 0.15
              }
            />
          );
        })}

        {/* Nodes */}
        {simNodes.map((sn) => {
          const isHighlighted = highlightedNodes.has(sn.id);
          const isHoverActive = hoveredNode !== null;
          const isSearched = searchMatch === sn.id;
          return (
            <g key={sn.id}>
              {/* Search highlight ring */}
              {isSearched && (
                <circle
                  cx={sn.x}
                  cy={sn.y}
                  r={sn.radius + 6}
                  fill="none"
                  stroke="#F4A261"
                  strokeWidth={3}
                  strokeDasharray="4 2"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="0;12"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
              <circle
                cx={sn.x}
                cy={sn.y}
                r={sn.radius}
                fill={sn.node.domainColor}
                fillOpacity={
                  isSearched ? 1 : isHoverActive ? (isHighlighted ? 1 : 0.15) : 0.7
                }
                stroke={isHighlighted || isSearched ? "#fff" : "none"}
                strokeWidth={isHighlighted || isSearched ? 2 : 0}
                className="cursor-pointer transition-opacity"
                onMouseEnter={() => setHoveredNode(sn.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => handleNodeClick(sn.node)}
              />
              {/* Label for larger nodes or searched node */}
              {(sn.radius >= 8 || isSearched) && (
                <text
                  x={sn.x}
                  y={sn.y + sn.radius + 12}
                  textAnchor="middle"
                  className="text-[9px] fill-text-muted pointer-events-none select-none"
                  style={{
                    opacity: isSearched
                      ? 1
                      : isHoverActive
                        ? isHighlighted
                          ? 1
                          : 0.1
                        : 0.6,
                    fontWeight: isSearched ? 600 : 400,
                  }}
                >
                  {sn.node.label.length > 20
                    ? sn.node.label.slice(0, 18) + "..."
                    : sn.node.label}
                </text>
              )}
            </g>
          );
        })}
        </g>
      </svg>

      {/* Hover tooltip */}
      {hoveredData && (
        <div
          className="absolute bg-surface border border-border rounded-lg px-3 py-2 shadow-lg pointer-events-none z-10"
          style={{
            left: Math.min(hoveredData.x * zoom + pan.x + 20, dimensions.width - 200),
            top: Math.max(hoveredData.y * zoom + pan.y - 50, 10),
          }}
        >
          <p className="text-xs font-semibold text-text-primary">
            {hoveredData.node.label}
          </p>
          <p className="text-[10px] text-text-muted">
            {TYPE_LABELS[hoveredData.node.type]} -- {hoveredData.node.connectionCount} connections
          </p>
          <p className="text-[10px] text-text-muted mt-1">
            Click to explore
          </p>
        </div>
      )}
    </div>
  );
}
