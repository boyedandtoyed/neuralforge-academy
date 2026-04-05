'use client';
import { useRef, useCallback, useState } from 'react';

interface ExecutionResult {
  success: boolean;
  output?: string;
  error?: string;
}

export function usePyodide() {
  const workerRef = useRef<Worker | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const pendingRef = useRef<Map<string, (result: ExecutionResult) => void>>(new Map());

  const getWorker = useCallback(() => {
    if (!workerRef.current) {
      workerRef.current = new Worker(new URL('./worker.ts', import.meta.url));
      workerRef.current.onmessage = (event: MessageEvent) => {
        const { id, ...result } = event.data;
        const resolve = pendingRef.current.get(id);
        if (resolve) {
          resolve(result);
          pendingRef.current.delete(id);
        }
      };
    }
    return workerRef.current;
  }, []);

  const runPython = useCallback(async (code: string): Promise<ExecutionResult> => {
    setIsLoading(true);
    const worker = getWorker();
    const id = Math.random().toString(36).slice(2);

    return new Promise((resolve) => {
      pendingRef.current.set(id, (result) => {
        setIsLoading(false);
        resolve(result);
      });
      worker.postMessage({ id, code });
    });
  }, [getWorker]);

  return { runPython, isLoading };
}
