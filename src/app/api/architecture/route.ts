import { NextResponse } from 'next/server';

const nodes = [
  { id: 'page-home',             label: 'HomePage',             type: 'page',      file: 'src/app/page.tsx',                                              lastModified: '2026-05-06' },
  { id: 'page-course',           label: 'CoursePage',           type: 'page',      file: 'src/app/courses/[courseSlug]/page.tsx',                          lastModified: '2026-05-06' },
  { id: 'page-lesson',           label: 'LessonPage',           type: 'page',      file: 'src/app/courses/[courseSlug]/[lessonSlug]/page.tsx',             lastModified: '2026-05-06' },
  { id: 'page-playground',       label: 'PlaygroundPage',       type: 'page',      file: 'src/app/playground/page.tsx',                                   lastModified: '2026-05-06' },
  { id: 'page-layout',           label: 'RootLayout',           type: 'page',      file: 'src/app/layout.tsx',                                            lastModified: '2026-05-06' },
  { id: 'comp-nav',              label: 'Navigation',           type: 'component', file: 'src/components/Navigation.tsx',                                   lastModified: '2026-05-06' },
  { id: 'comp-lesson-layout',    label: 'LessonLayout',         type: 'component', file: 'src/components/lesson/LessonLayout.tsx',                          lastModified: '2026-05-06' },
  { id: 'comp-lesson-content',   label: 'LessonContent',        type: 'component', file: 'src/components/lesson/LessonContent.tsx',                         lastModified: '2026-05-06' },
  { id: 'comp-math-block',       label: 'MathBlock',            type: 'component', file: 'src/components/lesson/MathBlock.tsx',                             lastModified: '2026-04-20' },
  { id: 'comp-quiz-block',       label: 'QuizBlock',            type: 'component', file: 'src/components/lesson/QuizBlock.tsx',                             lastModified: '2026-05-06' },
  { id: 'comp-multi-editor',     label: 'MultiFrameworkEditor', type: 'component', file: 'src/components/editor/MultiFrameworkEditor.tsx',                  lastModified: '2026-05-06' },
  { id: 'comp-python-editor',    label: 'PythonEditor',         type: 'component', file: 'src/components/editor/PythonEditor.tsx',                          lastModified: '2026-04-15' },
  { id: 'comp-output-panel',     label: 'OutputPanel',          type: 'component', file: 'src/components/editor/OutputPanel.tsx',                           lastModified: '2026-04-15' },
  { id: 'comp-course-badge',     label: 'CourseProgressBadge',  type: 'component', file: 'src/components/progress/CourseProgressBadge.tsx',                 lastModified: '2026-05-06' },
  { id: 'comp-lesson-dot',       label: 'LessonCompletedDot',   type: 'component', file: 'src/components/progress/LessonCompletedDot.tsx',                  lastModified: '2026-04-20' },
  { id: 'comp-vector-field',     label: 'VectorField',          type: 'component', file: 'src/components/visualizations/math/VectorField.tsx',               lastModified: '2026-04-10' },
  { id: 'comp-gradient-descent', label: 'GradientDescent2D',    type: 'component', file: 'src/components/visualizations/ml/GradientDescent2D.tsx',           lastModified: '2026-04-10' },
  { id: 'comp-loss-curve',       label: 'LossCurve',            type: 'component', file: 'src/components/visualizations/ml/LossCurve.tsx',                   lastModified: '2026-04-10' },
  { id: 'store-progress',        label: 'progressStore',        type: 'store',     file: 'src/stores/progressStore.ts',                                    lastModified: '2026-05-06' },
  { id: 'store-editor',          label: 'editorStore',          type: 'store',     file: 'src/stores/editorStore.ts',                                      lastModified: '2026-04-20' },
  { id: 'lib-lesson-data',       label: 'lessonData',           type: 'lib',       file: 'src/lib/lessonData.ts',                                          lastModified: '2026-04-25' },
  { id: 'lib-pyodide-hook',      label: 'usePyodide',           type: 'lib',       file: 'src/lib/pyodide/usePyodide.ts',                                  lastModified: '2026-04-15' },
  { id: 'lib-pyodide-worker',    label: 'PyodideWorker',        type: 'lib',       file: 'src/lib/pyodide/worker.ts',                                      lastModified: '2026-04-15' },
];

const edges = [
  { source: 'page-layout',         target: 'comp-nav' },
  { source: 'page-home',           target: 'comp-course-badge' },
  { source: 'page-course',         target: 'comp-course-badge' },
  { source: 'page-course',         target: 'comp-lesson-dot' },
  { source: 'page-lesson',         target: 'comp-lesson-layout' },
  { source: 'page-lesson',         target: 'comp-lesson-content' },
  { source: 'page-lesson',         target: 'lib-lesson-data' },
  { source: 'page-playground',     target: 'comp-multi-editor',  dashed: true },
  { source: 'comp-lesson-layout',  target: 'store-progress' },
  { source: 'comp-lesson-content', target: 'comp-math-block',    dashed: true },
  { source: 'comp-lesson-content', target: 'comp-quiz-block' },
  { source: 'comp-lesson-content', target: 'store-progress' },
  { source: 'comp-quiz-block',     target: 'store-progress' },
  { source: 'comp-multi-editor',   target: 'comp-python-editor' },
  { source: 'comp-multi-editor',   target: 'comp-output-panel' },
  { source: 'comp-course-badge',   target: 'store-progress' },
  { source: 'comp-lesson-dot',     target: 'store-progress' },
  { source: 'lib-pyodide-hook',    target: 'lib-pyodide-worker' },
];

export async function GET() {
  return NextResponse.json({
    nodes,
    edges,
    lastUpdated: new Date().toISOString(),
    meta: {
      nodeCount: nodes.length,
      edgeCount: edges.length,
      version: '1.0.0',
    },
  });
}
