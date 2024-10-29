import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood: 'positive' | 'neutral' | 'negative';
  quadrant: 'dharma' | 'artha' | 'kama' | 'moksha';
  prompt: string;
}

interface JournalState {
  entries: JournalEntry[];
  addEntry: (entry: Omit<JournalEntry, 'id' | 'date'>) => void;
  getEntriesByQuadrant: (quadrant: JournalEntry['quadrant']) => JournalEntry[];
  deleteEntry: (id: string) => void;
}

export const useJournalStore = create<JournalState>()(
  persist(
    (set, get) => ({
      entries: [],
      addEntry: (entry) =>
        set((state) => ({
          entries: [
            {
              ...entry,
              id: Math.random().toString(36).substring(2),
              date: new Date().toISOString(),
            },
            ...state.entries,
          ],
        })),
      getEntriesByQuadrant: (quadrant) =>
        get().entries.filter((entry) => entry.quadrant === quadrant),
      deleteEntry: (id) =>
        set((state) => ({
          entries: state.entries.filter((entry) => entry.id !== id),
        })),
    }),
    {
      name: 'journal-storage',
    }
  )
);