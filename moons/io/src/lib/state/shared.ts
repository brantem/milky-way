import { proxy } from 'valtio';

import type { Coordinate, Line } from '../types';

declare module 'valtio' {
  function useSnapshot<T extends object>(p: T): T;
}

export type AppState = {
  a: string | null;
  start(id: string): void;
  b: (string | Coordinate) | null;

  lines: Line[];
  addLine(): void;

  isConnected(id: string): boolean;
};

export const state = proxy<AppState>({
  a: null,
  start(id) {
    if (state.a) return;
    const lineIndex = state.lines.findIndex((line) => line.a === id || line.b === id);
    if (lineIndex !== -1) {
      const [line] = state.lines.splice(lineIndex, 1);
      state.a = line.a === id ? line.b : line.a;
      state.b = id;
    } else {
      state.a = id;
    }
  },
  b: null,

  lines: [],
  addLine() {
    if (!state.a || !state.b) return;
    if (typeof state.b === 'string') {
      const id = state.b;
      if (!state.isConnected(id)) state.lines.push({ a: state.a, b: id });
    }
    state.a = null;
    state.b = null;
  },

  isConnected(id): boolean /* why */ {
    return state.lines.findIndex((line) => line.a === id || line.b === id) !== -1;
  },
});
