import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CalculatorState {
  history: string[];
  addHistory: (entry: string) => void;
  clearHistory: () => void;
}

interface ThemeState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useCalculatorStore = create<CalculatorState>()(
  persist(
    (set) => ({
      history: [],
      addHistory: (entry) => set((state) => ({ history: [entry, ...state.history] })),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'calculator-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ history: state.history }),
    }
  )
);

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);
