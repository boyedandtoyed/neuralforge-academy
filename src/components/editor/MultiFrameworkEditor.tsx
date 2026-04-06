'use client';
import { useState, useRef, useCallback } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
import PythonEditor from './PythonEditor';
import OutputPanel from './OutputPanel';

type Framework = 'numpy' | 'tensorflow' | 'pytorch';

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
      if (success) {
        setOutput(out || '(no output)');
      } else {
        setOutput(`Error:\n${error}`);
      }
    };
    workerRef.current = worker;
    return worker;
  }, []);

  const handleRun = async () => {
    setIsRunning(true);
    const currentCode = code[activeTab];

    if (activeTab === 'tensorflow') {
      setIsRunning(false);
      setOutput('TensorFlow.js runs in the browser GPU context.\nCopy this code to the browser console after importing TF.js.\n\nFor full in-browser execution, use the NumPy tab which runs CPython via Pyodide WASM.');
      return;
    }

    setOutput('Initializing Python runtime...');
    const worker = getWorker();
    const id = Math.random().toString(36).slice(2);
    worker.postMessage({ id, code: currentCode });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-160px)]">
      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden flex flex-col">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as Framework)}>
          <div className="border-b border-gray-800 px-4">
            <TabsList className="flex gap-1 py-2">
              {(['numpy', 'tensorflow', 'pytorch'] as Framework[]).map(tab => (
                <TabsTrigger key={tab} value={tab}
                  className="px-3 py-1.5 text-sm rounded-md transition-colors data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-400 hover:text-gray-200">
                  {tab === 'numpy' ? 'NumPy' : tab === 'tensorflow' ? 'TensorFlow.js' : 'PyTorch'}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {(['numpy', 'tensorflow', 'pytorch'] as Framework[]).map(tab => (
            <TabsContent key={tab} value={tab} className="flex-1 overflow-hidden m-0">
              <PythonEditor
                value={code[tab]}
                onChange={(val) => setCode(prev => ({ ...prev, [tab]: val }))}
                language={tab === 'tensorflow' ? 'javascript' : 'python'}
              />
            </TabsContent>
          ))}
        </Tabs>
        <div className="p-3 border-t border-gray-800 flex items-center gap-3">
          <button onClick={handleRun} disabled={isRunning}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-medium px-4 py-1.5 rounded-md transition-colors flex items-center gap-2">
            {isRunning ? '\u27F3 Running...' : '\u25B6 Run'}
          </button>
          <span className="text-xs text-gray-500">
            {activeTab === 'numpy' ? 'CPython via Pyodide WASM' : activeTab === 'tensorflow' ? 'WebGL/WebGPU accelerated' : 'NumPy PyTorch-syntax via Pyodide'}
          </span>
        </div>
      </div>
      <OutputPanel output={output} framework={activeTab} />
    </div>
  );
}
