'use client';
import { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathBlockProps {
  math: string;
  display?: boolean;
}

export default function MathBlock({ math, display = false }: MathBlockProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    try {
      katex.render(math, ref.current, {
        displayMode: display,
        throwOnError: false,
        strict: false,
      });
    } catch {
      if (ref.current) ref.current.textContent = math;
    }
  }, [math, display]);

  return <span ref={ref} className={display ? 'block my-4 overflow-x-auto text-center' : 'inline'} />;
}
