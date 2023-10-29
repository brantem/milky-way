import { proxy } from 'valtio';

import type { Coordinate, Line } from '../types';
import { getDotCoord } from '../helpers';

declare module 'valtio' {
  function useSnapshot<T extends object>(p: T): T;
}

export type AppState = {
  a: string | null;
  start(id: string): void;
  b: (Coordinate & { id?: string }) | null; // TODO: (string | Coordinate) | null

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
      const el = document.querySelector(`#${id} > .dot`)!;
      state.b = { id, ...getDotCoord(el) };
    } else {
      state.a = id;
    }
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
