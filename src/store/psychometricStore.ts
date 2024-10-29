import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PsychometricQuestion {
  id: string;
  category: 'self_honesty' | 'emotional_stability' | 'social_perception';
  question: string;
  options: {
    text: string;
    value: number;
  }[];
}

export interface PsychometricResponse {
  id: string;
  questionId: string;
  value: number;
  timestamp: string;
}

interface PsychometricState {
  responses: PsychometricResponse[];
  addResponse: (questionId: string, value: number) => void;
  getScoreByCategory: (category: PsychometricQuestion['category']) => number;
  getLatestResponses: () => PsychometricResponse[];
}

export const questions: PsychometricQuestion[] = [
  {
    id: '1',
    category: 'self_honesty',
    question: 'How often do you find yourself adapting your behavior to please others?',
    options: [
      { text: 'Never', value: 5 },
      { text: 'Rarely', value: 4 },
      { text: 'Sometimes', value: 3 },
      { text: 'Often', value: 2 },
      { text: 'Always', value: 1 },
    ],
  },
  {
    id: '2',
    category: 'emotional_stability',
    question: 'When faced with a challenge, how quickly do you recover from setbacks?',
    options: [
      { text: 'Very quickly', value: 5 },
      { text: 'Quickly', value: 4 },
      { text: 'Moderately', value: 3 },
      { text: 'Slowly', value: 2 },
      { text: 'Very slowly', value: 1 },
    ],
  },
  {
    id: '3',
    category: 'social_perception',
    question: 'How well do you understand others\' emotional needs?',
    options: [
      { text: 'Very well', value: 5 },
      { text: 'Well', value: 4 },
      { text: 'Moderately', value: 3 },
      { text: 'Poorly', value: 2 },
      { text: 'Very poorly', value: 1 },
    ],
  },
];

export const usesPsychometricStore = create<PsychometricState>()(
  persist(
    (set, get) => ({
      responses: [],
      addResponse: (questionId, value) =>
        set((state) => ({
          responses: [
            ...state.responses,
            {
              id: Math.random().toString(36).substring(2),
              questionId,
              value,
              timestamp: new Date().toISOString(),
            },
          ],
        })),
      getScoreByCategory: (category) => {
        const categoryQuestions = questions.filter((q) => q.category === category);
        const categoryResponses = get().responses.filter((r) =>
          categoryQuestions.some((q) => q.id === r.questionId)
        );
        
        if (categoryResponses.length === 0) return 0;
        
        const total = categoryResponses.reduce((sum, r) => sum + r.value, 0);
        return Math.round((total / (categoryResponses.length * 5)) * 100);
      },
      getLatestResponses: () => {
        const responses = [...get().responses];
        return responses.sort(
          (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      },
    }),
    {
      name: 'psychometric-storage',
    }
  )
);