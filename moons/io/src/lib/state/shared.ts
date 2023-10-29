import { proxy } from 'valtio';

import type { Coordinate, Line } from '../types';

declare module 'valtio' {
  function useSnapshot<T extends object>(p: T): T;
}

export type AppState = {
  a: string | null;
  start(id: string): void;
  b: (Coordinate & { id?: string }) | null;

  lines: Line[];
  addLine(): void;

  isConnected(id: string): boolean;
};

export const state = proxy<AppState>({
  a: null,
  start(id) {
    if (state.a) return;
    if (state.isConnected(id)) return;
    state.a = id;
  },
  b: null,

  lines: [],
  addLine() {
    if (!state.a || !state.b) return;
    if (state.b.id) {
      const id = state.b.id;
      if (!state.isConnected(id)) state.lines.push({ a: state.a, b: id });
    }
    state.a = null;
    state.b = null;
  },

  isConnected(id): boolean /* why */ {
    return state.lines.findIndex((line) => line.a === id || line.b === id) !== -1;
  },
});
