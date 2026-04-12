'use client';
import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface LossCurveProps {
  maxEpochs?: number;
}

export default function LossCurve({ maxEpochs = 100 }: LossCurveProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [epoch, setEpoch] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [overfit, setOverfit] = useState(false);
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Simulate loss curves
  const trainLoss = (e: number) => 2.5 * Math.exp(-0.05 * e) + 0.05;
  const valLoss = (e: number) => overfit
    ? 2.5 * Math.exp(-0.04 * e) + 0.15 + (e > 40 ? 0.003 * (e - 40) : 0)
    : 2.5 * Math.exp(-0.045 * e) + 0.12;

  const W = 400;
  const H = 240;

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 20, bottom: 35, left: 45 };
    const innerW = W - margin.left - margin.right;
    const innerH = H - margin.top - margin.bottom;

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleLinear([0, maxEpochs], [0, innerW]);
    const yScale = d3.scaleLinear([0, 2.6], [innerH, 0]);

    // Grid
    g.selectAll('.grid-y').data(yScale.ticks(5)).join('line')
      .attr('x1', 0).attr('x2', innerW)
      .attr('y1', (d: number) => yScale(d)).attr('y2', (d: number) => yScale(d))
      .attr('stroke', '#1f2937').attr('stroke-width', 1);

    // Axes
    g.append('g').attr('transform', `translate(0,${innerH})`).call(d3.axisBottom(xScale).ticks(5))
      .selectAll('text').attr('fill', '#6b7280').attr('font-size', 10);
    g.append('g').call(d3.axisLeft(yScale).ticks(5))
      .selectAll('text').attr('fill', '#6b7280').attr('font-size', 10);

    g.selectAll('.domain').attr('stroke', '#374151');
    g.selectAll('.tick line').attr('stroke', '#374151');

    // Labels
    g.append('text').attr('x', innerW / 2).attr('y', innerH + 28)
      .attr('text-anchor', 'middle').attr('fill', '#6b7280').attr('font-size', 10).text('Epoch');
    g.append('text').attr('transform', 'rotate(-90)').attr('x', -innerH / 2).attr('y', -32)
      .attr('text-anchor', 'middle').attr('fill', '#6b7280').attr('font-size', 10).text('Loss');

    if (epoch > 0) {
      const trainPts = d3.range(0, epoch + 1).map(e => ({ e, v: trainLoss(e) }));
      const valPts = d3.range(0, epoch + 1).map(e => ({ e, v: valLoss(e) }));
      const line = d3.line<{ e: number; v: number }>()
        .x(d => xScale(d.e)).y(d => yScale(d.v));
      g.append('path').datum(trainPts).attr('d', line).attr('fill', 'none').attr('stroke', '#3b82f6').attr('stroke-width', 2);
      g.append('path').datum(valPts).attr('d', line).attr('fill', 'none').attr('stroke', '#10b981').attr('stroke-width', 2).attr('stroke-dasharray', '5,3');

      // Legend
      const legendItems: [string, string][] = [['#3b82f6', 'Train'], ['#10b981', 'Val']];
      legendItems.forEach(([color, label], i) => {
        const lx = innerW - 80 + i * 38;
        g.append('line').attr('x1', lx).attr('x2', lx + 14).attr('y1', 8).attr('y2', 8).attr('stroke', color).attr('stroke-width', 2);
        g.append('text').attr('x', lx + 17).attr('y', 12).attr('fill', color).attr('font-size', 10).text(label);
      });
    }
  }, [epoch, overfit, maxEpochs, W, H]);

  useEffect(() => {
    if (!isRunning) {
      if (animRef.current) clearInterval(animRef.current);
      return;
    }
    animRef.current = setInterval(() => {
      setEpoch(e => {
        if (e >= maxEpochs) { setIsRunning(false); return e; }
        return e + 1;
      });
    }, 30);
    return () => { if (animRef.current) clearInterval(animRef.current); };
  }, [isRunning, maxEpochs]);

  return (
    <div className="rounded-2xl p-4 my-6" style={{ background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.08)' }}>
      <h4 className="text-sm font-semibold text-white mb-3">Interactive: Training &amp; Validation Loss</h4>
      <svg ref={svgRef} width={W} height={H} className="w-full rounded-xl" style={{ background: '#090916' }} />
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button onClick={() => setIsRunning(r => !r)}
          className="text-xs font-medium text-white px-3 py-1.5 rounded-lg transition-all"
          style={{ background: 'linear-gradient(135deg,#2563eb,#7c3aed)' }}>
          {isRunning ? 'Pause' : epoch >= maxEpochs ? 'Done' : 'Run'}
        </button>
        <button onClick={() => { setEpoch(0); setIsRunning(false); }}
          className="text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg transition-colors"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
          Reset
        </button>
        <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
          <input type="checkbox" checked={overfit} onChange={e => { setOverfit(e.target.checked); setEpoch(0); }}
            className="accent-blue-500" />
          Simulate overfitting
        </label>
        <span className="text-xs text-slate-500 ml-auto">epoch {epoch}/{maxEpochs}</span>
      </div>
    </div>
  );
}
