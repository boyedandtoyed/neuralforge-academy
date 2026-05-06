'use client';
import { useState, useRef, useCallback } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
import PythonEditor from './PythonEditor';
import OutputPanel from './OutputPanel';

type Framework = 'numpy' | 'tensorflow' | 'pytorch';

/* Per-tab color scheme */
const TAB_COLORS: Record<Framework, { color: string; bg: string; border: string; label: string }> = {
  numpy:      { color: '#93c5fd', bg: 'rgba(59,130,246,0.15)',  border: 'rgba(59,130,246,0.4)',  label: 'NumPy' },
  tensorflow: { color: '#fdba74', bg: 'rgba(249,115,22,0.15)',  border: 'rgba(249,115,22,0.4)',  label: 'TensorFlow.js' },
  pytorch:    { color: '#fca5a5', bg: 'rgba(239,68,68,0.15)',   border: 'rgba(239,68,68,0.4)',   label: 'PyTorch' },
};

const STARTER_CODE: Record<Framework, string> = {
  numpy: `import numpy as np

# Create a simple neural network layer
X = np.random.randn(100, 3)
W = np.random.randn(3, 4)
b = np.zeros(4)

# Forward pass
Z = X @ W + b
A = np.maximum(0, Z)  # ReLU activation

print("Input shape:", X.shape)
print("Weight shape:", W.shape)
print("Output shape:", A.shape)
print("\\nFirst 3 activations:")
print(A[:3].round(4))
`,
  tensorflow: `// TensorFlow.js — runs with WebGL acceleration
// Note: TF.js evaluation requires full browser context.
// Paste this in the browser console on the /playground page
// after importing tfjs, or use the NumPy tab for in-browser execution.

const model_config = {
  layers: [
    { type: 'dense', units: 4, activation: 'relu', inputShape: [3] },
    { type: 'dense', units: 1, activation: 'sigmoid' },
  ],
  optimizer: 'adam',
  loss: 'binaryCrossentropy',
};

console.log("Model config:", JSON.stringify(model_config, null, 2));
console.log("\\nTo run TF.js, open browser DevTools and import:");
console.log("  import * as tf from 'https://esm.run/@tensorflow/tfjs';");
`,
  pytorch: `import numpy as np

# PyTorch-style implementation using NumPy (runs via Pyodide)
# Demonstrates the same API pattern as PyTorch

class Linear:
    def __init__(self, in_features, out_features):
        scale = np.sqrt(2.0 / in_features)
        self.weight = np.random.randn(in_features, out_features) * scale
        self.bias = np.zeros(out_features)

    def __call__(self, x):
        return x @ self.weight + self.bias

class ReLU:
    def __call__(self, x):
        return np.maximum(0, x)

class Sequential:
    def __init__(self, *layers):
        self.layers = layers

    def __call__(self, x):
        for layer in self.layers:
            x = layer(x)
        return x

    def num_params(self):
        total = 0
        for l in self.layers:
            if hasattr(l, 'weight'):
                total += l.weight.size + l.bias.size
        return total

model = Sequential(
    Linear(3, 16),
    ReLU(),
    Linear(16, 1),
)

x = np.random.randn(10, 3)
y = model(x)

print(f"Output shape: {y.shape}")
print(f"Parameters: {model.num_params():,}")
print(f"\\nFirst 5 outputs: {y[:5].flatten().round(4)}")
`,
};

export default function MultiFrameworkEditor() {
  const [activeTab, setActiveTab] = useState<Framework>('numpy');
  const [code, setCode] = useState<Record<Framework, string>>(STARTER_CODE);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const workerRef = useRef<Worker | null>(null);

  const getWorker = useCallback(() => {
    if (workerRef.current) return workerRef.current;
    const workerCode = `
let pyodide = null;

async function loadPy() {
  if (pyodide) return pyodide;
  self.postMessage({ type: 'status', msg: 'Loading Pyodide runtime (~8MB, first run only)...' });
  importScripts('https://cdn.jsdelivr.net/pyodide/v0.26.0/full/pyodide.js');
  pyodide = await loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.0/full/' });
  self.postMessage({ type: 'status', msg: 'Installing numpy, scikit-learn...' });
  await pyodide.loadPackage(['numpy', 'scikit-learn']);
  self.postMessage({ type: 'status', msg: 'Ready!' });
  return pyodide;
}

self.onmessage = async (e) => {
  const { id, code } = e.data;
  try {
    const py = await loadPy();
    py.runPython(\`
import sys
from io import StringIO
_buf = StringIO()
sys.stdout = _buf
sys.stderr = _buf
\`);
    await py.runPythonAsync(code);
    const out = py.runPython(\`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
_buf.getvalue()
\`);
    self.postMessage({ id, success: true, output: out });
  } catch (err) {
    try {
      if (pyodide) pyodide.runPython('import sys; sys.stdout = sys.__stdout__; sys.stderr = sys.__stderr__');
    } catch {}
    self.postMessage({ id, success: false, error: String(err) });
  }
};
`;
    const blob = new Blob([workerCode], { type: 'text/javascript' });
    const worker = new Worker(URL.createObjectURL(blob));

    worker.onmessage = (e) => {
      if (e.data.type === 'status') {
        setOutput(e.data.msg);
        return;
      }
      const { success, output: out, error } = e.data;
      setIsRunning(false);
      setOutput(success ? (out || '(no output)') : `Error:\n${error}`);
    };

    worker.onerror = (err) => {
      setIsRunning(false);
      setOutput(`Worker error: ${err.message ?? 'Failed to initialize Python runtime.'}\n\nCheck your network connection and try again.`);
    };

    workerRef.current = worker;
    return worker;
  }, []);

  const handleRun = async () => {
    const currentCode = code[activeTab].trim();
    if (!currentCode) {
      setOutput('Nothing to run — write some code first.');
      return;
    }
    if (activeTab === 'tensorflow') {
      setOutput('TensorFlow.js runs in the browser GPU context.\nCopy this code to the browser console after importing TF.js.\n\nFor full in-browser execution, use the NumPy tab which runs CPython via Pyodide WASM.');
      return;
    }
    setIsRunning(true);
    setOutput('Initializing Python runtime…');
    const worker = getWorker();
    const id = Math.random().toString(36).slice(2);
    worker.postMessage({ id, code: currentCode });
  };

  const tc = TAB_COLORS[activeTab];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-160px)]">
      {/* Editor panel */}
      <div className="rounded-xl overflow-hidden flex flex-col border border-white/8 bg-slate-900/90">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as Framework)}>
          <div className="px-3 border-b border-white/7">
            <TabsList className="flex gap-1 py-2">
              {(Object.entries(TAB_COLORS) as [Framework, typeof TAB_COLORS[Framework]][]).map(([tab, cfg]) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="px-3 py-1.5 text-sm rounded-lg transition-all text-slate-500 hover:text-slate-300 data-[state=active]:text-white"
                  style={activeTab === tab ? {
                    color: cfg.color,
                    background: cfg.bg,
                    border: `1px solid ${cfg.border}`,
                    boxShadow: `0 0 12px ${cfg.bg}`,
                  } : { border: '1px solid transparent' }}
                >
                  {cfg.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {(Object.keys(TAB_COLORS) as Framework[]).map((tab) => (
            <TabsContent key={tab} value={tab} className="flex-1 overflow-hidden m-0">
              <PythonEditor
                value={code[tab]}
                onChange={(val) => setCode((prev) => ({ ...prev, [tab]: val }))}
                language={tab === 'tensorflow' ? 'javascript' : 'python'}
              />
            </TabsContent>
          ))}
        </Tabs>

        {/* Run bar */}
        <div className="p-3 flex items-center gap-3 shrink-0 border-t border-white/7">
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="text-slate-950 text-sm font-semibold px-4 py-1.5 rounded-lg transition-all disabled:opacity-50 flex items-center gap-2 hover:scale-105 active:scale-95 animate-gradient-shift"
            style={{
              background: isRunning
                ? 'linear-gradient(135deg, #475569, #334155)'
                : 'linear-gradient(135deg, #00d4c8, #8b5cf6, #f59e0b, #00d4c8)',
              backgroundSize: '300% 300%',
              color: isRunning ? '#94a3b8' : '#0f172a',
            }}
          >
            {isRunning ? '⟳ Running...' : '▶ Run'}
          </button>
          <span className="text-xs text-slate-500">
            {activeTab === 'numpy' ? 'CPython via Pyodide WASM' : activeTab === 'tensorflow' ? 'WebGL/WebGPU accelerated' : 'NumPy PyTorch-syntax via Pyodide'}
          </span>
        </div>
      </div>

      <OutputPanel output={output} framework={activeTab} />
    </div>
  );
}
