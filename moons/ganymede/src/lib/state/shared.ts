import { proxy } from 'valtio';
import { nanoid } from 'nanoid';

import { getPath } from '../helpers';
import type { Path, Prediction, ModelOpts } from '../types';

declare module 'valtio' {
  function useSnapshot<T extends object>(p: T): T;
}

export type AppState = {
  id: string;
  color: string;

  paths: Path[];
  get visiblePaths(): Path[];
  createPath(points: number[][]): Path | null;

  model: ModelOpts | null;
  addPrediction(id: Path['id'], prediction: Prediction): void;

  n: number;

  clear(): void;

  debug: boolean;
};

export const state = proxy<AppState>({
  id: '',
  color: '#000',

  paths: [],
  get visiblePaths(): Path[] /* why */ {
    if (!state.n) return state.paths;
    if (state.n >= state.paths.length) return [];
    return state.paths.slice(0, state.n * -1);
  },
  createPath(points) {
    if (!points.length) return null;
    const path: Path = { id: `${state.id}-${nanoid()}`, color: state.color, d: getPath(points) };
    state.paths = [...state.visiblePaths, path];
    state.n = 0;
    return path;
  },

  model: null,
  addPrediction(id, prediction) {
    const index = state.paths.findIndex((path) => path.id === id);
    if (index === -1) return;
    state.paths[index].prediction = prediction;
  },

  n: 0,

  clear() {
    state.paths = [];
    state.n = 0;
  },

  debug: false,
});
