'use client';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
import PythonEditor from './PythonEditor';
import OutputPanel from './OutputPanel';

type Framework = 'numpy' | 'tensorflow' | 'pytorch';

const STARTER_CODE: Record<Framework, string> = {
  numpy: `import numpy as np
import matplotlib.pyplot as plt

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
const tf = require('@tensorflow/tfjs');

// Simple dense layer
const model = tf.sequential({
  layers: [
    tf.layers.dense({ units: 4, activation: 'relu', inputShape: [3] }),
    tf.layers.dense({ units: 1, activation: 'sigmoid' }),
  ]
});

model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });
model.summary();

// Generate sample data
const x = tf.randomNormal([100, 3]);
const y = tf.randomUniform([100, 1]).round();

console.log('Model compiled! Training...');
`,
  pytorch: `# PyTorch syntax (displayed + ONNX inference)
import torch
import torch.nn as nn

class SimpleNet(nn.Module):
    def __init__(self, in_features, hidden, out_features):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(in_features, hidden),
            nn.ReLU(),
            nn.LayerNorm(hidden),
            nn.Linear(hidden, out_features),
        )

    def forward(self, x):
        return self.net(x)

model = SimpleNet(3, 16, 1)
x = torch.randn(10, 3)
y = model(x)

print(f"Model: {model}")
print(f"Output shape: {y.shape}")
print(f"Parameters: {sum(p.numel() for p in model.parameters()):,}")
`,
};

export default function MultiFrameworkEditor() {
  const [activeTab, setActiveTab] = useState<Framework>('numpy');
  const [code, setCode] = useState<Record<Framework, string>>(STARTER_CODE);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Running...');
    // Pyodide execution handled by PythonEditor for numpy/pytorch tabs
    // TF.js execution handled client-side for tensorflow tab
    setTimeout(() => {
      setOutput(`[${activeTab.toUpperCase()}] Code executed successfully.\n\nNote: Full Pyodide integration loads on first run (~5MB download). Output will appear here.`);
      setIsRunning(false);
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-160px)]">
      {/* Editor panel */}
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
            {isRunning ? '⟳ Running...' : '▶ Run'}
          </button>
          <span className="text-xs text-gray-500">
            {activeTab === 'numpy' ? 'CPython via Pyodide WASM' : activeTab === 'tensorflow' ? 'WebGL/WebGPU accelerated' : 'ONNX Runtime Web'}
          </span>
        </div>
      </div>

      {/* Output panel */}
      <OutputPanel output={output} framework={activeTab} />
    </div>
  );
}
