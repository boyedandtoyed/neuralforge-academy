# NeuralForge Academy — Codebase Architecture Map

## Project Stack
- Next.js 15 (App Router, static export), React 19, TypeScript 5
- Tailwind CSS 3, Framer Motion, D3.js, Three.js
- Pyodide 0.26 (CPython WASM in Web Worker), KaTeX
- Zustand 5 (state), CodeMirror 6 (editor)

## Directory Structure
src/
├── app/
│   ├── layout.tsx              # RootLayout — fonts (Syne, DM Sans), Navigation, globals.css
│   ├── page.tsx                # HomePage — 9 phase cards, stats, tech stack, framer-motion animations
│   ├── globals.css             # Design tokens, animations, scrollbar, shimmer, gradient-text
│   ├── courses/
│   │   ├── [courseSlug]/
│   │   │   ├── page.tsx        # CoursePage — lesson list grid, CourseProgressBadge, LessonCompletedDot
│   │   │   └── [lessonSlug]/
│   │   │       └── page.tsx    # LessonPage — generateStaticParams, LessonLayout + LessonContent
│   └── playground/
│       └── page.tsx            # PlaygroundPage — dynamic import MultiFrameworkEditor (ssr:false)
├── components/
│   ├── Navigation.tsx          # Sticky nav, mobile hamburger, active route underline
│   ├── lesson/
│   │   ├── LessonLayout.tsx    # Sidebar (lesson list + progress), prev/next nav, mobile drawer
│   │   ├── LessonContent.tsx   # Renders LessonSection[] — prose/heading/math/code/quiz + visualizers map
│   │   ├── MathBlock.tsx       # KaTeX renderer (dynamic import, client-only)
│   │   └── QuizBlock.tsx       # Quiz UI — select option, check answer, markQuizPassed
│   ├── editor/
│   │   ├── MultiFrameworkEditor.tsx  # Tab switcher (numpy/tensorflow/pytorch), Web Worker Pyodide runner
│   │   ├── PythonEditor.tsx          # CodeMirror 6 wrapper, python/javascript language support
│   │   └── OutputPanel.tsx           # Output display panel
│   ├── progress/
│   │   ├── CourseProgressBadge.tsx   # Shows X/Y done badge, reads from progressStore
│   │   └── LessonCompletedDot.tsx    # Green checkmark if lesson completed
│   └── visualizations/
│       ├── math/VectorField.tsx      # D3 interactive vector addition + dot product
│       └── ml/
│           ├── GradientDescent2D.tsx # D3 animated gradient descent on 2D function
│           └── LossCurve.tsx         # D3 animated train/val loss curves
├── lib/
│   ├── lessonData.ts           # COURSE_TITLES, COURSE_LESSONS, LESSON_CONTENT (9 phases, 25 lessons)
│   │                           # LessonSection type: prose|heading|math|code|quiz
│   │                           # Keys: "courseSlug/lessonSlug" e.g. "introduction/00-setup"
│   └── pyodide/
│       ├── usePyodide.ts       # React hook — wraps worker, returns {runPython, isLoading}
│       └── worker.ts           # Web Worker — loads Pyodide, captures stdout, runs code async
└── stores/
    ├── progressStore.ts        # Zustand + persist — markComplete(key), markQuizPassed(key)
    │                           # key format: "courseSlug/lessonSlug"
    └── editorStore.ts          # Zustand — activeFramework, outputs, isRunning

## Key Data Flows

### Lesson Rendering
LessonPage → LessonLayout (sidebar) + LessonContent (body)
LessonContent reads LESSON_CONTENT["courseSlug/lessonSlug"] → array of LessonSection
Each section type renders differently:
  prose    → <p> with inline markdown (bold, code)
  heading  → <h2|h3|h4>
  math     → <MathBlock> (KaTeX, dynamic import)
  code     → <pre><code> with language badge
  quiz     → <QuizBlock> → on correct: markQuizPassed(key)
Mark Complete button → markComplete(key) → stored in localStorage via Zustand persist

### Python Execution (Playground + Editor)
MultiFrameworkEditor → creates Web Worker inline (blob URL)
Worker: importScripts Pyodide CDN → loadPackage(['numpy','scikit-learn'])
On run: redirects sys.stdout to StringIO → runPythonAsync(code) → returns captured output
TensorFlow tab shows static message (TF.js not run in worker)

### Progress Persistence
Zustand persist middleware → localStorage key: "neuralforge-progress"
Shape: { lessons: { "courseSlug/lessonSlug": { completed, quizPassed, completedAt } } }
CourseProgressBadge + LessonCompletedDot both subscribe to progressStore

## Component Import Graph
page-layout          → Navigation
page-home            → CourseProgressBadge
page-course          → CourseProgressBadge, LessonCompletedDot
page-lesson          → LessonLayout, LessonContent, lessonData
page-playground      → MultiFrameworkEditor (dynamic)
LessonLayout         → progressStore
LessonContent        → MathBlock (dynamic), QuizBlock, progressStore
QuizBlock            → progressStore
MultiFrameworkEditor → PythonEditor, OutputPanel
CourseProgressBadge  → progressStore
LessonCompletedDot   → progressStore
usePyodide           → worker.ts

## Course Structure
9 phases, 25 lessons total
Slugs: introduction | neuron-model | regression | optimization | cnns | autoencoders | rnns | transformers | generative
Lesson key format: "introduction/00-setup", "neuron-model/04-single-neuron", etc.
All content hardcoded in src/lib/lessonData.ts — LESSON_CONTENT object

## Docker & Deployment
docker-compose.yml → port 127.0.0.1:3001:3000
Cloudflare Tunnel → neuralforge.binodtiwari.com → localhost:3001
Dockerfile: node:22-alpine, multi-stage (deps → builder → runner)
next.config.mjs: reactStrictMode, asyncWebAssembly (for Pyodide), COEP/COOP headers

## Important Notes for AI Assistants
- lessonData.ts is VERY large (~3000 lines) — avoid reading fully, use grep for specific lessons
- All lesson content uses LessonSection[] type — never break this interface
- progressStore key MUST be "courseSlug/lessonSlug" format exactly
- MathBlock must stay as dynamic import (client-only, KaTeX needs DOM)
- MultiFrameworkEditor must stay ssr:false (Web Worker needs browser)
- COEP/COOP headers in next.config.mjs are REQUIRED for Pyodide SharedArrayBuffer
- Font preload:false on Inter/Space_Grotesk prevents Docker build timeout
- Python 3.11+ required locally (ChromaDB wheel compat) but Docker handles this

Run `npm run build` to verify after any changes.
