'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';

const W = 400;
const H = 320;
const xScale = d3.scaleLinear([-5, 5], [20, W - 20]);
const yScale = d3.scaleLinear([-1, 25], [H - 20, 20]);

export default function GradientDescent2D() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [lr, setLr] = useState(0.1);
  const [isRunning, setIsRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [pos, setPos] = useState({ x: -3.5, y: 3.5 });
  const animRef = useRef<number | null>(null);
  const posRef = useRef(pos);
  posRef.current = pos;

  const f = useCallback((x: number) => 0.1 * x * x * x * x - 2 * x * x + 0.5 * x + 5, []);
  const df = useCallback((x: number) => 0.4 * x * x * x - 4 * x + 0.5, []);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Draw curve
    const pts = d3.range(-5, 5.1, 0.05).map(x => ({ x, y: f(x) }));
    const line = d3.line<{ x: number; y: number }>()
      .x(d => xScale(d.x)).y(d => yScale(d.y)).curve(d3.curveBasis);
    svg.append('path').datum(pts).attr('d', line)
      .attr('fill', 'none').attr('stroke', '#3b82f6').attr('stroke-width', 2.5);

    // Axes
    svg.append('line').attr('x1', 20).attr('x2', W - 20).attr('y1', yScale(0)).attr('y2', yScale(0))
      .attr('stroke', '#374151').attr('stroke-width', 1);

    // Current point
    const cx = xScale(posRef.current.x);
    const cy = yScale(f(posRef.current.x));
    svg.append('circle').attr('cx', cx).attr('cy', cy)
      .attr('r', 7).attr('fill', '#ef4444').attr('stroke', '#fff').attr('stroke-width', 2);

    // Tangent line (gradient)
    const slope = df(posRef.current.x);
    const x0 = posRef.current.x - 0.8;
    const x1 = posRef.current.x + 0.8;
    svg.append('line')
      .attr('x1', xScale(x0)).attr('y1', yScale(f(posRef.current.x) + slope * (x0 - posRef.current.x)))
      .attr('x2', xScale(x1)).attr('y2', yScale(f(posRef.current.x) + slope * (x1 - posRef.current.x)))
      .attr('stroke', '#f59e0b').attr('stroke-width', 1.5).attr('stroke-dasharray', '4,3').attr('opacity', 0.7);

    // Loss label
    svg.append('text').attr('x', W - 25).attr('y', 18)
      .attr('text-anchor', 'end').attr('fill', '#9ca3af').attr('font-size', 11)
      .text(`f(x) = ${f(posRef.current.x).toFixed(3)}`);
  }, [pos, f, df]);

  const doStep = useCallback(() => {
    setPos(p => {
      const grad = df(p.x);
      const nx = p.x - lr * grad;
      return { x: Math.max(-5, Math.min(5, nx)), y: f(nx) };
    });
    setStep(s => s + 1);
  }, [lr, df, f]);

  useEffect(() => {
    if (!isRunning) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }
    let last = 0;
    const tick = (t: number) => {
      if (t - last > 120) { doStep(); last = t; }
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [isRunning, doStep]);

  const reset = () => {
    setIsRunning(false);
    setPos({ x: -3.5, y: 3.5 });
    setStep(0);
  };

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 my-6">
      <h4 className="text-sm font-semibold text-white mb-3">Interactive: Gradient Descent</h4>
      <svg ref={svgRef} width={W} height={H} className="rounded-lg bg-gray-950 w-full" />
      <div className="mt-3 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 flex-1 min-w-40">
          <label className="text-xs text-gray-400 whitespace-nowrap">LR: {lr.toFixed(3)}</label>
          <input type="range" min={0.001} max={0.5} step={0.001} value={lr}
            onChange={e => setLr(Number(e.target.value))}
            className="flex-1 accent-blue-500" />
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setIsRunning(r => !r)}
            className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-md transition-colors">
            {isRunning ? 'Pause' : 'Run'}
          </button>
          <button onClick={doStep} disabled={isRunning}
            className="text-xs bg-gray-700 hover:bg-gray-600 disabled:opacity-40 text-white px-3 py-1.5 rounded-md transition-colors">
            Step
          </button>
          <button onClick={reset} className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded-md transition-colors">
            Reset
          </button>
          <span className="text-xs text-gray-500">step {step} | x={pos.x.toFixed(3)}</span>
        </div>
      </div>
    </div>
  );
}
