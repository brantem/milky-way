import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import type { Moon } from '../types';

interface State {
  points: Record<string, number>;
  save(id: Moon['id'], value: number): void;
}

export const usePoints = create<State, [['zustand/persist', Pick<State, 'points'>]]>(
  persist(
    (set) => ({
      points: {},
      save(id, value) {
        set((state) => ({ points: { ...state.points, [id]: value } }));
      },
    }),
    {
      name: 'points',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
