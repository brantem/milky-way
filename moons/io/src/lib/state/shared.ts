import { proxy } from 'valtio';

import type { Dot, Coordinate } from '../types';

declare module 'valtio' {
  function useSnapshot<T extends object>(p: T): T;
}

export type AppState = {
  a: Dot | null;
  start(dot: Dot): void;
  b: (Coordinate & { dot?: Dot }) | null;

  lines: { a: Dot; b: Dot }[];
  addLine(): void;

  isConnected(dot: Dot): boolean;
};

export const state = proxy<AppState>({
  a: null,
  start(dot) {
    if (state.a) return;
    if (state.isConnected(dot)) return;
    state.a = dot;
  },
  b: null,

  lines: [],
  addLine() {
    if (!state.a || !state.b) return;
    if (state.b.dot) {
      const dot = state.b.dot;
      if (!state.isConnected(dot)) state.lines.push({ a: state.a, b: dot });
    }
    state.a = null;
    state.b = null;
  },

  isConnected(dot): boolean /* why */ {
    const index = state.lines.findIndex((line) => {
      if (dot.side === line.a.side && dot.index === line.a.index) return true;
      if (dot.side === line.b.side && dot.index === line.b.index) return true;
      return false;
    });
    return index !== -1;
  },
});
