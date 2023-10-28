import { proxy } from 'valtio';
import { nanoid } from 'nanoid';

import { getPath } from '../helpers';
import type { Path, Prediction, ModelOpts } from '../types';

declare module 'valtio' {
  function useSnapshot<T extends object>(p: T): T;
}

export type AppState = {
  color: string;

  points: number[][];
  addPoint(point: number[]): void;

  paths: Path[];
  get visiblePaths(): Path[];
  createPath(): Path | null;

  model: ModelOpts | null;
  addPrediction(id: Path['id'], prediction: Prediction): void;

  n: number;

  clear(): void;

  autoClear: boolean;
  debug: boolean;
};

export const state = proxy<AppState>({
  color: '#000',

  points: [],
  addPoint(point) {
    if (state.autoClear) state.paths = [];
    state.points.push(point);
  },

  paths: [],
  get visiblePaths(): Path[] /* why */ {
    if (!state.n) return state.paths;
    if (state.n >= state.paths.length) return [];
    return state.paths.slice(0, state.n * -1);
  },
  createPath() {
    if (!state.points) return null;
    const path: Path = { id: nanoid(), color: state.color, d: getPath(state.points) };
    state.points = [];
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
    state.points = [];
    state.paths = [];
    state.n = 0;
  },

  autoClear: false,
  debug: false,
});
