'use client';
import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

export default function VectorField() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [aX, setAX] = useState(3);
  const [aY, setAY] = useState(1);
  const [bX, setBX] = useState(1);
  const [bY, setBY] = useState(3);

  const W = 400;
  const H = 400;
  const CX = W / 2;
  const CY = H / 2;
  const SCALE = 50;

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Grid
    const gridLines = d3.range(-4, 5);
    svg.append('g').selectAll('line.grid-x')
      .data(gridLines).join('line')
      .attr('x1', d => CX + d * SCALE).attr('x2', d => CX + d * SCALE)
      .attr('y1', 0).attr('y2', H)
      .attr('stroke', '#1f2937').attr('stroke-width', 1);
    svg.append('g').selectAll('line.grid-y')
      .data(gridLines).join('line')
      .attr('y1', d => CY + d * SCALE).attr('y2', d => CY + d * SCALE)
      .attr('x1', 0).attr('x2', W)
      .attr('stroke', '#1f2937').attr('stroke-width', 1);

    // Axes
    svg.append('line').attr('x1', 0).attr('x2', W).attr('y1', CY).attr('y2', CY).attr('stroke', '#374151').attr('stroke-width', 1.5);
    svg.append('line').attr('x1', CX).attr('x2', CX).attr('y1', 0).attr('y2', H).attr('stroke', '#374151').attr('stroke-width', 1.5);

    // Arrowhead markers
    const defs = svg.append('defs');
    (['arrow-a', '#3b82f6'] as const);
    ([['arrow-a', '#3b82f6'], ['arrow-b', '#10b981'], ['arrow-sum', '#f59e0b']] as [string, string][]).forEach(([id, color]) => {
      defs.append('marker').attr('id', id).attr('markerWidth', 8).attr('markerHeight', 6)
        .attr('refX', 8).attr('refY', 3).attr('orient', 'auto')
        .append('polygon').attr('points', '0 0, 8 3, 0 6').attr('fill', color);
    });

    const drawVector = (x: number, y: number, color: string, markerId: string, label: string) => {
      const tx = CX + x * SCALE;
      const ty = CY - y * SCALE;
      svg.append('line')
        .attr('x1', CX).attr('y1', CY).attr('x2', tx).attr('y2', ty)
        .attr('stroke', color).attr('stroke-width', 2.5)
        .attr('marker-end', `url(#${markerId})`);
      svg.append('text')
        .attr('x', tx + 8).attr('y', ty - 4)
        .attr('fill', color).attr('font-size', 13).attr('font-weight', 'bold')
        .text(label);
    };

    drawVector(aX, aY, '#3b82f6', 'arrow-a', `a=(${aX},${aY})`);
    drawVector(bX, bY, '#10b981', 'arrow-b', `b=(${bX},${bY})`);
    drawVector(aX + bX, aY + bY, '#f59e0b', 'arrow-sum', `a+b`);

    // Dot product label
    const dot = aX * bX + aY * bY;
    const magA = Math.sqrt(aX ** 2 + aY ** 2);
    const magB = Math.sqrt(bX ** 2 + bY ** 2);
    const cosTheta = magA && magB ? dot / (magA * magB) : 0;
    svg.append('text')
      .attr('x', 10).attr('y', H - 30)
      .attr('fill', '#9ca3af').attr('font-size', 12)
      .text(`a·b = ${dot.toFixed(1)}   cos(θ) = ${cosTheta.toFixed(3)}`);
  }, [aX, aY, bX, bY, CX, CY, SCALE, H, W]);

  interface SliderProps {
    label: string;
    value: number;
    onChange: (v: number) => void;
  }

  const Slider = ({ label, value, onChange }: SliderProps) => (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-400 w-8 font-mono">{label}</span>
      <input type="range" min={-4} max={4} step={0.5} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="flex-1 accent-blue-500" />
      <span className="text-xs text-gray-300 w-6 text-right font-mono">{value}</span>
    </div>
  );

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 my-6">
      <h4 className="text-sm font-semibold text-white mb-3">Interactive: Vector Addition &amp; Dot Product</h4>
      <div className="flex flex-col lg:flex-row gap-4 items-start">
        <svg ref={svgRef} width={W} height={H} className="rounded-lg bg-gray-950 shrink-0" />
        <div className="flex-1 space-y-3 w-full">
          <p className="text-xs text-gray-500 mb-2">Vector a (blue)</p>
          <Slider label="ax" value={aX} onChange={setAX} />
          <Slider label="ay" value={aY} onChange={setAY} />
          <p className="text-xs text-gray-500 mt-4 mb-2">Vector b (green)</p>
          <Slider label="bx" value={bX} onChange={setBX} />
          <Slider label="by" value={bY} onChange={setBY} />
          <div className="mt-4 bg-gray-800 rounded-lg p-3 text-xs font-mono text-gray-300 space-y-1">
            <div>a = [{aX}, {aY}]</div>
            <div>b = [{bX}, {bY}]</div>
            <div>a+b = [{aX+bX}, {aY+bY}]</div>
            <div>a&#xb7;b = {(aX*bX+aY*bY).toFixed(1)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
