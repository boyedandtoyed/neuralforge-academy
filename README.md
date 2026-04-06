# NeuralForge Academy

An interactive ML/DL curriculum that runs entirely in your browser. Every lesson combines
KaTeX-rendered mathematics, live Python (NumPy) code cells powered by Pyodide (CPython WASM),
and auto-graded quizzes — no account or installation required to learn.

```
┌─────────────────────────────────────────────────────────────┐
│  NeuralForge Academy                         [Playground ▸] │
├─────────────────────────────────────────────────────────────┤
│  Phase 0 · Introduction          Phase 1 · Neuron Model     │
│  ┌─────────────────────────┐    ┌─────────────────────────┐ │
│  │ 00 Setup                │    │ 04 Artificial Neuron    │ │
│  │ 01 History & Biology    │    │ 05 Activation Functions │ │
│  │ 02 Probability          │    │ 06 Network Topology     │ │
│  │ 03 Matrix Operations    │    └─────────────────────────┘ │
│  └─────────────────────────┘                                │
│                                                             │
│  [KaTeX Math]  [Live NumPy Code]  [Quiz]                    │
└─────────────────────────────────────────────────────────────┘
```

---

## Installation & Running

### Prerequisites
- Node.js 18+ ([nodejs.org](https://nodejs.org))
- Git

### Quick Start
```bash
# 1. Clone the repository
git clone https://github.com/boyedandtoyed/neuralforge-academy.git
cd neuralforge-academy

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in browser
# Navigate to http://localhost:3000
```

### Production Build
```bash
npm run build    # Creates optimized build in .next/
npm start        # Serves production build on port 3000
```

### Docker
```bash
# Build and run with Docker Compose
docker compose up --build

# Or with Docker directly
docker build -t neuralforge-academy .
docker run -p 3000:3000 neuralforge-academy
```

### Verify Your Build
```bash
npm run type-check   # TypeScript validation
npm run lint         # ESLint check
npm run build        # Full production build
```

---

## Curriculum — 9 Phases, 25 Lessons

| Phase | Slug | Lessons |
|-------|------|---------|
| **0 — Introduction** | `introduction` | 00 Python, NumPy & Matplotlib Setup · 01 History & Biological Neurons · 02 Probability & Statistics · 03 Matrix Operations |
| **1 — Neuron Model & Architectures** | `neuron-model` | 04 The Artificial Neuron · 05 Activation / Transfer Functions · 06 Network Topology & Architectures |
| **2 — Regression** | `regression` | 07 Linear Regression · 08 Logistic Regression, CrossEntropy & Softmax |
| **3 — Optimization** | `optimization` | 09 Backpropagation & Computation Graphs · 10 Taylor Series, Hessian & Quadratic Surfaces · 11 SGD, Momentum, Nesterov, AdaGrad, RMSProp, Adam · 12 Learning Rate Schedules & Batch Training · 13 Vanishing Gradients & Regularization |
| **4 — Convolutional Neural Networks** | `cnns` | 14 Convolution, Padding, Stride & Pooling · 15 LeNet → AlexNet → VGG → ResNet |
| **5 — Autoencoders & VAEs** | `autoencoders` | 16 Autoencoders · 17 Variational Autoencoders — KL Divergence & ELBO |
| **6 — Recurrent Networks** | `rnns` | 18 Recurrent Neural Networks · 19 LSTM & GRU |
| **7 — Transformers** | `transformers` | 20 Embeddings & Positional Encoding · 21 Attention Mechanisms · 22 Transformer Architecture |
| **8 — Generative Models** | `generative` | 23 GANs — Generator, Discriminator & Training · 24 Diffusion Models — Forward/Reverse Process & Score Matching |

Each lesson contains:
- **Prose** — clear conceptual explanations
- **KaTeX math** — rendered display equations
- **NumPy code** — runnable via Pyodide in the browser
- **Quiz** — 4-option multiple-choice with explanations

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router, static export) |
| UI | React 19, Tailwind CSS |
| Language | TypeScript 5 |
| Math rendering | KaTeX via react-katex |
| In-browser Python | Pyodide 0.26 (CPython WASM) |
| Code editor | CodeMirror 6 |
| Visualizations | D3.js, Three.js |
| State management | Zustand |
| Containerization | Docker / Docker Compose |

---

## Project Structure

```
src/
  app/
    page.tsx                          # Homepage — 9-phase grid
    courses/
      [courseSlug]/
        page.tsx                      # Phase overview with lesson list
        [lessonSlug]/
          page.tsx                    # Individual lesson page
  lib/
    lessonData.ts                     # COURSE_TITLES, COURSE_LESSONS, LESSON_CONTENT
  components/
    lesson/
      LessonLayout.tsx                # Sidebar + content shell
      LessonContent.tsx               # Renders prose, math, code, quiz sections
    editor/                           # Pyodide code runner
    visualizations/                   # D3 / Three.js widgets
```

---

## License

MIT
