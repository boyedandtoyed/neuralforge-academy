import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LessonProgress {
  completed: boolean;
  quizPassed: boolean;
  completedAt?: string;
}

interface ProgressState {
  lessons: Record<string, LessonProgress>; // key: "courseSlug/lessonSlug"
  markComplete: (key: string) => void;
  markQuizPassed: (key: string) => void;
  reset: () => void;
  getLessonProgress: (key: string) => LessonProgress;
  getCourseProgress: (courseSlug: string, lessonSlugs: string[]) => { completed: number; total: number };
}

const DEFAULT_LESSON: LessonProgress = { completed: false, quizPassed: false };

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      lessons: {},

      markComplete: (key) =>
        set((state) => ({
          lessons: {
            ...state.lessons,
            [key]: {
              ...state.lessons[key],
              completed: true,
              quizPassed: state.lessons[key]?.quizPassed ?? false,
              completedAt: new Date().toISOString(),
            },
          },
        })),

      markQuizPassed: (key) =>
        set((state) => ({
          lessons: {
            ...state.lessons,
            [key]: {
              ...state.lessons[key],
              completed: state.lessons[key]?.completed ?? false,
              quizPassed: true,
            },
          },
        })),

      reset: () => set({ lessons: {} }),

      getLessonProgress: (key) => get().lessons[key] ?? DEFAULT_LESSON,

      getCourseProgress: (courseSlug, lessonSlugs) => {
        const lessons = get().lessons;
        const completed = lessonSlugs.filter(
          (slug) => lessons[`${courseSlug}/${slug}`]?.completed
        ).length;
        return { completed, total: lessonSlugs.length };
      },
    }),
    {
      name: 'neuralforge-progress',
    }
  )
);
