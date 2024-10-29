import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WellnessParameter {
  id: string;
  category: 'mental' | 'physical' | 'financial' | 'social';
  name: string;
  value: number;
  lastUpdated: string;
}

interface WellnessState {
  parameters: WellnessParameter[];
  updateParameter: (id: string, value: number) => void;
  getParametersByCategory: (category: WellnessParameter['category']) => WellnessParameter[];
}

export const useWellnessStore = create<WellnessState>()(
  persist(
    (set, get) => ({
      parameters: [],
      updateParameter: (id, value) =>
        set((state) => ({
          parameters: state.parameters.map((param) =>
            param.id === id
              ? { ...param, value, lastUpdated: new Date().toISOString() }
              : param
          ),
        })),
      getParametersByCategory: (category) =>
        get().parameters.filter((param) => param.category === category),
    }),
    {
      name: 'wellness-storage',
    }
  )
);