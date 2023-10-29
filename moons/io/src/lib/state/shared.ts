import { proxy } from 'valtio';

import type { Dot, Coordinate } from '../types';

declare module 'valtio' {
  function useSnapshot<T extends object>(p: T): T;
}

export type AppState = {
  start: (Coordinate & { dot: Dot }) | null;
  end: (Coordinate & { dot?: Dot }) | null;

  lines: { start: Dot; end: Dot }[];

  debug: boolean;
};

export const state = proxy<AppState>({
  start: null,
  end: null,

  lines: [],

  debug: false,
});
