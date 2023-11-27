import { proxy, subscribe, useSnapshot } from 'valtio';

import type { Moon } from '../types';

interface State {
  points: Record<string, number>;
  savePoints(id: Moon['id'], value: number): void;
}

const state = proxy<State>({
  points: ((value) => (value ? JSON.parse(value) || {} : {}))(localStorage.getItem('points')),
  savePoints(id, value) {
    state.points[id] = value;
  },
});

subscribe(state, () => localStorage.setItem('points', JSON.stringify(state.points)));

export const usePoints = () => {
  return [useSnapshot(state), state] as const;
};
