'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import Link from 'next/link';

// ─── Types ────────────────────────────────────────────────────

type NodeType = 'page' | 'component' | 'store' | 'lib';
type FilterType = NodeType | 'all';

interface RawNode {
  id: string;
  label: string;
  type: NodeType;
  file: string;
  lastModified: string;
  description: string;
}

interface SimNode extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  type: NodeType;
  file: string;
  lastModified: string;
  description: string;
  connections: number;
  radius: number;
}

type SimEdge = d3.SimulationLinkDatum<SimNode> & { dashed?: boolean };

interface Toast {
  id: number;
  message: string;
}

// ─── Color maps ───────────────────────────────────────────────

const NODE_COLORS: Record<NodeType, string> = {
  page:      '#3b82f6',
  component: '#8b5cf6',
  store:     '#f59e0b',
  lib:       '#10b981',
};

const TYPE_LABELS: Record<NodeType, string> = {
  page:      'Page',
  component: 'Component',
  store:     'Store',
  lib:       'Lib / Hook',
};

// ─── Static graph data ────────────────────────────────────────

const RAW_NODES: RawNode[] = [
  { id: 'page-home',      label: 'HomePage',             type: 'page',      file: 'src/app/page.tsx',                                              lastModified: '2026-05-06', description: 'Main landing page with phase cards, stats, and hero section.' },
  { id: 'page-course',    label: 'CoursePage',           type: 'page',      file: 'src/app/courses/[courseSlug]/page.tsx',                          lastModified: '2026-05-06', description: 'Course overview listing all lessons in a phase.' },
  { id: 'page-lesson',    label: 'LessonPage',           type: 'page',      file: 'src/app/courses/[courseSlug]/[lessonSlug]/page.tsx',             lastModified: '2026-05-06', description: 'Individual lesson page with content and exercises.' },
  { id: 'page-playground',label: 'PlaygroundPage',       type: 'page',      file: 'src/app/playground/page.tsx',                                   lastModified: '2026-05-06', description: 'Browser-based Python code playground powered by Pyodide WASM.' },
  { id: 'page-layout',    label: 'RootLayout',           type: 'page',      file: 'src/app/layout.tsx',                                            lastModified: '2026-05-06', description: 'Root layout providing global navigation and font loading.' },

  { id: 'comp-nav',             label: 'Navigation',           type: 'component', file: 'src/components/Navigation.tsx',                                   lastModified: '2026-05-06', description: 'Top navigation bar with links to courses, playground, and architecture.' },
  { id: 'comp-lesson-layout',   label: 'LessonLayout',         type: 'component', file: 'src/components/lesson/LessonLayout.tsx',                          lastModified: '2026-05-06', description: 'Lesson page layout with collapsible sidebar and progress bar.' },
  { id: 'comp-lesson-content',  label: 'LessonContent',        type: 'component', file: 'src/components/lesson/LessonContent.tsx',                         lastModified: '2026-05-06', description: 'Renders lesson sections: prose, math, code blocks, and quizzes.' },
  { id: 'comp-math-block',      label: 'MathBlock',            type: 'component', file: 'src/components/lesson/MathBlock.tsx',                             lastModified: '2026-04-20', description: 'KaTeX math rendering for inline and display equations.' },
  { id: 'comp-quiz-block',      label: 'QuizBlock',            type: 'component', file: 'src/components/lesson/QuizBlock.tsx',                             lastModified: '2026-05-06', description: 'Interactive quiz with emerald/rose feedback and amber header.' },
  { id: 'comp-multi-editor',    label: 'MultiFrameworkEditor', type: 'component', file: 'src/components/editor/MultiFrameworkEditor.tsx',                  lastModified: '2026-05-06', description: 'Tabbed editor supporting NumPy (blue), TF (orange), PyTorch (red).' },
  { id: 'comp-python-editor',   label: 'PythonEditor',         type: 'component', file: 'src/components/editor/PythonEditor.tsx',                          lastModified: '2026-04-15', description: 'CodeMirror-based syntax-highlighted code editor.' },
  { id: 'comp-output-panel',    label: 'OutputPanel',          type: 'component', file: 'src/components/editor/OutputPanel.tsx',                           lastModified: '2026-04-15', description: 'Execution output panel with green monospace text.' },
  { id: 'comp-course-badge',    label: 'CourseProgressBadge',  type: 'component', file: 'src/components/progress/CourseProgressBadge.tsx',                 lastModified: '2026-05-06', description: 'Shows completion percentage badge for a course phase.' },
  { id: 'comp-lesson-dot',      label: 'LessonCompletedDot',   type: 'component', file: 'src/components/progress/LessonCompletedDot.tsx',                  lastModified: '2026-04-20', description: 'Visual indicator dot for completed lessons.' },
  { id: 'comp-vector-field',    label: 'VectorField',          type: 'component', file: 'src/components/visualizations/math/VectorField.tsx',               lastModified: '2026-04-10', description: 'D3-based vector field visualization component.' },
  { id: 'comp-gradient-descent',label: 'GradientDescent2D',    type: 'component', file: 'src/components/visualizations/ml/GradientDescent2D.tsx',           lastModified: '2026-04-10', description: '2D animated gradient descent on a loss surface.' },
  { id: 'comp-loss-curve',      label: 'LossCurve',            type: 'component', file: 'src/components/visualizations/ml/LossCurve.tsx',                   lastModified: '2026-04-10', description: 'Training and validation loss curve chart.' },

  { id: 'store-progress', label: 'progressStore', type: 'store', file: 'src/stores/progressStore.ts', lastModified: '2026-05-06', description: 'Zustand store tracking lesson completion and quiz results.' },
  { id: 'store-editor',   label: 'editorStore',   type: 'store', file: 'src/stores/editorStore.ts',   lastModified: '2026-04-20', description: 'Zustand store for multi-framework editor state.' },

  { id: 'lib-lesson-data',    label: 'lessonData',    type: 'lib', file: 'src/lib/lessonData.ts',           lastModified: '2026-04-25', description: 'All lesson content: prose, math, code, and quiz data.' },
  { id: 'lib-pyodide-hook',   label: 'usePyodide',    type: 'lib', file: 'src/lib/pyodide/usePyodide.ts',   lastModified: '2026-04-15', description: 'React hook for managing the Pyodide WASM runtime.' },
  { id: 'lib-pyodide-worker', label: 'PyodideWorker', type: 'lib', file: 'src/lib/pyodide/worker.ts',       lastModified: '2026-04-15', description: 'Web Worker script for async Python code execution.' },
];

const RAW_EDGES: { source: string; target: string; dashed?: boolean }[] = [
  { source: 'page-layout',           target: 'comp-nav' },
  { source: 'page-home',             target: 'comp-course-badge' },
  { source: 'page-course',           target: 'comp-course-badge' },
  { source: 'page-course',           target: 'comp-lesson-dot' },
  { source: 'page-lesson',           target: 'comp-lesson-layout' },
  { source: 'page-lesson',           target: 'comp-lesson-content' },
  { source: 'page-lesson',           target: 'lib-lesson-data' },
  { source: 'page-playground',       target: 'comp-multi-editor', dashed: true },
  { source: 'comp-lesson-layout',    target: 'store-progress' },
  { source: 'comp-lesson-content',   target: 'comp-math-block', dashed: true },
  { source: 'comp-lesson-content',   target: 'comp-quiz-block' },
  { source: 'comp-lesson-content',   target: 'store-progress' },
  { source: 'comp-quiz-block',       target: 'store-progress' },
  { source: 'comp-multi-editor',     target: 'comp-python-editor' },
  { source: 'comp-multi-editor',     target: 'comp-output-panel' },
  { source: 'comp-course-badge',     target: 'store-progress' },
  { source: 'comp-lesson-dot',       target: 'store-progress' },
  { source: 'lib-pyodide-hook',      target: 'lib-pyodide-worker' },
];

// Pre-compute connection counts and radii (at module level — stable reference)
const ALL_NODES: SimNode[] = RAW_NODES.map((n) => {
  const connections = RAW_EDGES.filter((e) => e.source === n.id || e.target === n.id).length;
  return { ...n, connections, radius: Math.max(16, 10 + connections * 4) };
});

const RECENT_THRESHOLD = new Date('2026-04-26'); // within ~10 days of 2026-05-06

// ─── Component ────────────────────────────────────────────────

export default function ArchitecturePage() {
  const svgRef = useRef<SVGSVGElement>(null);
  const simRef = useRef<d3.Simulation<SimNode, SimEdge> | null>(null);
  const driftRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [selectedNode, setSelectedNode] = useState<SimNode | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState('');
  const [liveMode, setLiveMode] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // ── Toast helper ──────────────────────────────────────────
  const addToast = useCallback((message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  // ── LIVE polling ─────────────────────────────────────────
  useEffect(() => {
    if (!liveMode) return;
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/architecture');
        if (res.ok) addToast('Graph data refreshed — connections up to date');
      } catch {
        addToast('Live update failed — check connection');
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [liveMode, addToast]);

  // ── D3 force graph ────────────────────────────────────────
  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    const width  = svgEl.clientWidth  || 1200;
    const height = svgEl.clientHeight || 800;

    // Stop previous simulation
    if (simRef.current) simRef.current.stop();
    if (driftRef.current) clearInterval(driftRef.current);

    // Filter nodes & build fresh copies so D3 can mutate x/y
    const activeNodes: SimNode[] = ALL_NODES
      .filter((n) => filter === 'all' || n.type === filter)
      .map((n) => ({ ...n }));

    const activeIds = new Set(activeNodes.map((n) => n.id));

    const activeEdges: SimEdge[] = RAW_EDGES
      .filter((e) => activeIds.has(e.source) && activeIds.has(e.target))
      .map((e) => ({ ...e }));

    // Clear SVG
    const svg = d3.select(svgEl);
    svg.selectAll('*').remove();

    // ── Stars background ───────────────────────────────────
    const starData = Array.from({ length: 180 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.4 + 0.3,
      o: Math.random() * 0.5 + 0.15,
    }));
    svg.append('g').attr('class', 'stars').selectAll('circle').data(starData).join('circle')
      .attr('cx', (d) => d.x).attr('cy', (d) => d.y)
      .attr('r', (d) => d.r).attr('fill', 'white').attr('opacity', (d) => d.o);

    // ── Arrowhead marker ───────────────────────────────────
    svg.append('defs').append('marker')
      .attr('id', 'arrow').attr('viewBox', '0 -5 10 10')
      .attr('refX', 0).attr('refY', 0)
      .attr('markerWidth', 6).attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path').attr('d', 'M0,-5L10,0L0,5').attr('fill', 'rgba(100,116,139,0.7)');

    // ── Zoom & pan ─────────────────────────────────────────
    const g = svg.append('g').attr('class', 'graph');
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.25, 4])
      .on('zoom', (event) => g.attr('transform', event.transform));
    svg.call(zoom).on('click', () => setSelectedNode(null));

    // ── Simulation ─────────────────────────────────────────
    const sim = d3.forceSimulation<SimNode>(activeNodes)
      .force('link', d3.forceLink<SimNode, SimEdge>(activeEdges).id((d) => d.id).distance(110))
      .force('charge', d3.forceManyBody<SimNode>().strength(-380))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide<SimNode>((d) => d.radius + 12))
      .alphaDecay(0.025);

    simRef.current = sim;

    // ── Edges ──────────────────────────────────────────────
    const edgeGroup = g.append('g').attr('class', 'edges');
    const edgeSel = edgeGroup.selectAll<SVGLineElement, SimEdge>('line')
      .data(activeEdges).join('line')
      .attr('stroke', 'rgba(100,116,139,0.35)')
      .attr('stroke-width', 1.5)
      .attr('stroke-dasharray', (d) => (d.dashed ? '6,4' : null))
      .attr('marker-end', 'url(#arrow)');

    // ── Nodes ──────────────────────────────────────────────
    const nodeGroup = g.append('g').attr('class', 'nodes');
    const nodeSel = nodeGroup.selectAll<SVGGElement, SimNode>('g')
      .data(activeNodes).join('g')
      .attr('cursor', 'pointer');

    // Gold ring for recently modified
    nodeSel.filter((d) => new Date(d.lastModified) >= RECENT_THRESHOLD)
      .append('circle')
      .attr('r', (d) => d.radius + 5)
      .attr('fill', 'none')
      .attr('stroke', '#f59e0b')
      .attr('stroke-width', 1.5)
      .attr('stroke-dasharray', '5,3')
      .attr('opacity', 0.6);

    // Main circle
    nodeSel.append('circle')
      .attr('r', (d) => d.radius)
      .attr('fill', (d) => NODE_COLORS[d.type])
      .attr('fill-opacity', 0.18)
      .attr('stroke', (d) => NODE_COLORS[d.type])
      .attr('stroke-width', 2);

    // Label
    nodeSel.append('text')
      .text((d) => d.label)
      .attr('text-anchor', 'middle')
      .attr('dy', (d) => d.radius + 14)
      .attr('fill', '#94a3b8')
      .attr('font-size', '10px')
      .attr('font-family', 'DM Sans, ui-sans-serif, sans-serif')
      .attr('pointer-events', 'none');

    // ── Drag ──────────────────────────────────────────────
    const drag = d3.drag<SVGGElement, SimNode>()
      .on('start', (event, d) => {
        if (!event.active) sim.alphaTarget(0.3).restart();
        d.fx = d.x; d.fy = d.y;
      })
      .on('drag', (event, d) => { d.fx = event.x; d.fy = event.y; })
      .on('end', (event, d) => {
        if (!event.active) sim.alphaTarget(0);
        d.fx = null; d.fy = null;
      });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    nodeSel.call(drag as any);

    // ── Hover: highlight connected edges + dim others ──────
    nodeSel
      .on('mouseover', (_, hovered) => {
        const connectedIds = new Set<string>([hovered.id]);
        activeEdges.forEach((e) => {
          const s = (e.source as SimNode).id ?? e.source as string;
          const t = (e.target as SimNode).id ?? e.target as string;
          if (s === hovered.id || t === hovered.id) { connectedIds.add(s); connectedIds.add(t); }
        });
        edgeSel
          .attr('stroke', (e) => {
            const s = (e.source as SimNode).id ?? e.source as string;
            const t = (e.target as SimNode).id ?? e.target as string;
            return (s === hovered.id || t === hovered.id) ? '#f59e0b' : 'rgba(100,116,139,0.1)';
          })
          .attr('stroke-width', (e) => {
            const s = (e.source as SimNode).id ?? e.source as string;
            const t = (e.target as SimNode).id ?? e.target as string;
            return (s === hovered.id || t === hovered.id) ? 2.5 : 0.5;
          });
        nodeSel.attr('opacity', (n) => connectedIds.has(n.id) ? 1 : 0.25);
      })
      .on('mouseout', () => {
        edgeSel.attr('stroke', 'rgba(100,116,139,0.35)').attr('stroke-width', 1.5);
        nodeSel.attr('opacity', 1);
        applySearch();
      })
      .on('click', (event, d) => {
        event.stopPropagation();
        setSelectedNode(d);
      });

    // ── Search dimming helper ──────────────────────────────
    function applySearch() {
      const q = search.trim().toLowerCase();
      if (!q) { nodeSel.attr('opacity', 1); return; }
      nodeSel.attr('opacity', (n) =>
        n.label.toLowerCase().includes(q) || n.file.toLowerCase().includes(q) ? 1 : 0.15
      );
    }

    applySearch();

    // ── Tick ──────────────────────────────────────────────
    sim.on('tick', () => {
      edgeSel
        .attr('x1', (d) => {
          const src = d.source as SimNode; const tgt = d.target as SimNode;
          const dx = (tgt.x ?? 0) - (src.x ?? 0); const dy = (tgt.y ?? 0) - (src.y ?? 0);
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          return (src.x ?? 0) + (dx / dist) * src.radius;
        })
        .attr('y1', (d) => {
          const src = d.source as SimNode; const tgt = d.target as SimNode;
          const dx = (tgt.x ?? 0) - (src.x ?? 0); const dy = (tgt.y ?? 0) - (src.y ?? 0);
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          return (src.y ?? 0) + (dy / dist) * src.radius;
        })
        .attr('x2', (d) => {
          const src = d.source as SimNode; const tgt = d.target as SimNode;
          const dx = (tgt.x ?? 0) - (src.x ?? 0); const dy = (tgt.y ?? 0) - (src.y ?? 0);
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          return (tgt.x ?? 0) - (dx / dist) * (tgt.radius + 10);
        })
        .attr('y2', (d) => {
          const src = d.source as SimNode; const tgt = d.target as SimNode;
          const dx = (tgt.x ?? 0) - (src.x ?? 0); const dy = (tgt.y ?? 0) - (src.y ?? 0);
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          return (tgt.y ?? 0) - (dy / dist) * (tgt.radius + 10);
        });

      nodeSel.attr('transform', (d) => `translate(${d.x ?? 0},${d.y ?? 0})`);
    });

    // ── Gentle idle drift ──────────────────────────────────
    driftRef.current = setInterval(() => {
      if (simRef.current) simRef.current.alpha(0.04).restart();
    }, 5000);

    return () => {
      sim.stop();
      svg.on('.zoom', null).on('click', null);
      if (driftRef.current) clearInterval(driftRef.current);
    };
  }, [filter, search]);

  // ── Export PNG ────────────────────────────────────────────
  const handleExport = useCallback(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;
    const svgData = new XMLSerializer().serializeToString(svgEl);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const canvas = document.createElement('canvas');
    canvas.width = svgEl.clientWidth;
    canvas.height = svgEl.clientHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      const a = document.createElement('a');
      a.download = 'neuralforge-architecture.png';
      a.href = canvas.toDataURL('image/png');
      a.click();
    };
    img.src = url;
  }, []);

  // ── Side panel data ────────────────────────────────────────
  const directImports = selectedNode
    ? RAW_EDGES.filter((e) => e.source === selectedNode.id).map((e) => ALL_NODES.find((n) => n.id === e.target)).filter(Boolean) as SimNode[]
    : [];
  const importedBy = selectedNode
    ? RAW_EDGES.filter((e) => e.target === selectedNode.id).map((e) => ALL_NODES.find((n) => n.id === e.source)).filter(Boolean) as SimNode[]
    : [];

  // ─── Render ───────────────────────────────────────────────
  return (
    <div className="relative flex flex-col" style={{ height: 'calc(100vh - 56px)', background: '#020617', overflow: 'hidden' }}>

      {/* ── Top bar ──────────────────────────────────────── */}
      <div className="relative z-10 flex flex-wrap items-center gap-3 px-4 py-3 border-b border-white/8 bg-slate-950/80 backdrop-blur-lg shrink-0">
        <h1 className="text-sm font-semibold tracking-wide text-white mr-2">
          <span className="gradient-text">NeuralForge</span>{' '}
          <span className="text-slate-400">Architecture</span>
        </h1>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5">
          {(['all', 'page', 'component', 'store', 'lib'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${filter === f ? 'text-slate-950' : 'text-slate-400 hover:text-white border border-white/10'}`}
              style={filter === f ? {
                background: f === 'all'
                  ? 'linear-gradient(135deg,#00d4c8,#8b5cf6)'
                  : NODE_COLORS[f as NodeType],
              } : {}}
            >
              {f === 'all' ? 'All' : TYPE_LABELS[f as NodeType]}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search nodes…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-3 py-1 text-xs rounded-full border border-white/10 bg-white/5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/40 w-40"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          {/* Live toggle */}
          <button
            onClick={() => setLiveMode((v) => !v)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all ${liveMode ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' : 'border-white/10 text-slate-400 hover:text-white'}`}
          >
            <span className={`w-2 h-2 rounded-full ${liveMode ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
            {liveMode ? 'LIVE' : 'Live'}
          </button>

          {/* Export */}
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-white/10 text-slate-400 hover:text-white hover:border-cyan-500/40 transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export PNG
          </button>
        </div>
      </div>

      {/* ── Graph canvas ─────────────────────────────────── */}
      <div className="relative flex-1 overflow-hidden">
        <svg
          ref={svgRef}
          className="w-full h-full"
          style={{ background: 'transparent' }}
        />

        {/* Legend */}
        <div className="absolute bottom-4 left-4 rounded-xl border border-white/8 bg-slate-950/80 backdrop-blur-md px-4 py-3 space-y-2">
          <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Legend</p>
          {(Object.entries(NODE_COLORS) as [NodeType, string][]).map(([type, color]) => (
            <div key={type} className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full border-2" style={{ borderColor: color, background: color + '30' }} />
              <span className="text-xs text-slate-400">{TYPE_LABELS[type]}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 pt-1 border-t border-white/5">
            <span className="w-6 h-0 border-t border-dashed border-slate-500" />
            <span className="text-xs text-slate-500">dynamic import</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full border-2 border-dashed border-amber-400/60" style={{ background: 'transparent' }} />
            <span className="text-xs text-slate-500">recently modified</span>
          </div>
        </div>

        {/* Side panel */}
        {selectedNode && (
          <div
            className="absolute top-0 right-0 h-full w-80 border-l border-white/8 bg-slate-950/90 backdrop-blur-xl overflow-y-auto flex flex-col"
            style={{ animation: 'toast-slide-in 0.25s ease forwards' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-white/8 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <span
                  className="inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2"
                  style={{ color: NODE_COLORS[selectedNode.type], background: NODE_COLORS[selectedNode.type] + '20' }}
                >
                  {TYPE_LABELS[selectedNode.type]}
                </span>
                <h2 className="text-base font-bold text-white truncate">{selectedNode.label}</h2>
                <p className="text-[11px] text-slate-500 font-mono mt-1 break-all">{selectedNode.file}</p>
              </div>
              <button onClick={() => setSelectedNode(null)} className="shrink-0 text-slate-500 hover:text-white p-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-5 space-y-5 text-sm flex-1">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Description</p>
                <p className="text-slate-300 leading-6 text-xs">{selectedNode.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-lg border border-white/8 bg-white/3 p-3">
                  <p className="text-slate-500 mb-1">Connections</p>
                  <p className="text-white font-semibold text-base">{selectedNode.connections}</p>
                </div>
                <div className="rounded-lg border border-white/8 bg-white/3 p-3">
                  <p className="text-slate-500 mb-1">Last Modified</p>
                  <p className="text-white font-semibold">{selectedNode.lastModified}</p>
                </div>
              </div>

              {directImports.length > 0 && (
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-2">Imports ({directImports.length})</p>
                  <div className="space-y-1.5">
                    {directImports.map((n) => (
                      <button
                        key={n.id}
                        onClick={() => setSelectedNode(n)}
                        className="w-full flex items-center gap-2 text-left px-3 py-2 rounded-lg border border-white/6 bg-white/3 hover:border-white/15 transition-all"
                      >
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: NODE_COLORS[n.type] }} />
                        <span className="text-xs text-slate-300 truncate">{n.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {importedBy.length > 0 && (
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-2">Imported by ({importedBy.length})</p>
                  <div className="space-y-1.5">
                    {importedBy.map((n) => (
                      <button
                        key={n.id}
                        onClick={() => setSelectedNode(n)}
                        className="w-full flex items-center gap-2 text-left px-3 py-2 rounded-lg border border-white/6 bg-white/3 hover:border-white/15 transition-all"
                      >
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: NODE_COLORS[n.type] }} />
                        <span className="text-xs text-slate-300 truncate">{n.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-5 border-t border-white/8 shrink-0">
              <Link
                href={`/courses`}
                className="block text-center text-xs text-slate-500 hover:text-slate-300 transition"
              >
                View file in codebase →
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* ── Toast notifications ───────────────────────────── */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 items-center pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="toast-enter px-4 py-2.5 rounded-full border border-emerald-500/30 bg-slate-950/95 backdrop-blur-md text-xs text-emerald-300 shadow-lg shadow-emerald-500/10 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  );
}
