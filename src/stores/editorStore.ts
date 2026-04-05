import { create } from 'zustand';

interface EditorStore {
  activeFramework: 'numpy' | 'tensorflow' | 'pytorch';
  outputs: Record<string, string>;
  isRunning: boolean;
  setFramework: (framework: 'numpy' | 'tensorflow' | 'pytorch') => void;
  setOutput: (framework: string, output: string) => void;
  setRunning: (running: boolean) => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  activeFramework: 'numpy',
  outputs: {},
  isRunning: false,
  setFramework: (framework) => set({ activeFramework: framework }),
  setOutput: (framework, output) =>
    set((state) => ({ outputs: { ...state.outputs, [framework]: output } })),
  setRunning: (isRunning) => set({ isRunning }),
}));
