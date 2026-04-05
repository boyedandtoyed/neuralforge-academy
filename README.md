# NeuralForge Academy

[![Build Status](https://img.shields.io/github/actions/workflow/status/boyedandtoyed/neuralforge-academy/ci.yml?branch=main)](https://github.com/boyedandtoyed/neuralforge-academy/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-via%20Pyodide-blue)](https://pyodide.org)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org)

> An interactive ML teaching platform — every math concept paired with live TensorFlow.js, PyTorch-syntax, and NumPy implementations running entirely in your browser.

## Features

- **Multi-framework editor** — NumPy (CPython via Pyodide WASM), TensorFlow.js (WebGL/WebGPU), PyTorch-syntax (ONNX Runtime Web)
- **23 lessons** across 5 phases: Math → ML → Classical ML → Deep Learning → Transformers & LLMs
- **Live visualizations** — D3.js 2D plots, Three.js 3D neural networks, animated loss landscapes
- **Math rendering** — KaTeX (10× faster than MathJax)
- **Zero backend** — all computation happens in the browser via WebAssembly

## Quick Start

```bash
git clone https://github.com/boyedandtoyed/neuralforge-academy
cd neuralforge-academy
npm install
npm run dev
# Open http://localhost:3000
```

## Docker

```bash
docker compose up
```

## Architecture

```
Browser
├── Pyodide Web Worker    # CPython WASM — NumPy, scikit-learn, matplotlib
├── TensorFlow.js         # WebGL/WebGPU GPU acceleration
└── ONNX Runtime Web      # PyTorch model inference
```

## Curriculum

| Phase | Topic | Lessons |
|-------|-------|---------|
| 0 | Math Foundations | Vectors, matrices, derivatives, probability, gradient descent |
| 1 | ML Fundamentals | Linear/logistic regression, evaluation, bias-variance |
| 2 | Classical ML | Decision trees, SVMs, clustering, PCA |
| 3 | Deep Learning | Neural nets, backprop, CNNs, RNNs |
| 4 | Transformers & LLMs | Attention, BERT, GPT, RLHF, RAG, agents |

## Tech Stack

Next.js 15 · React 19 · TypeScript 5.7 · Pyodide 0.26 · TensorFlow.js 4.22 · D3.js 7.9 · Three.js · KaTeX · Tailwind CSS

## License

MIT
