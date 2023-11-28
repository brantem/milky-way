import { proxy, subscribe, useSnapshot } from 'valtio';

import type { Moon } from '../types';

interface State {
  value: Record<string, number>;
  save(id: Moon['id'], value: number): void;
}

export const points = proxy<State>({
  value: ((value) => (value ? JSON.parse(value) || {} : {}))(localStorage.getItem('points')),
  save(id, value) {
    points.value[id] = value;
  },
});

subscribe(points, () => localStorage.setItem('points', JSON.stringify(points.value)));

export const usePoints = () => {
  return [useSnapshot(points), points] as const;
};
