import { proxy, useSnapshot } from 'valtio';

import type { Moon } from '../../types';
import storage from '../storage';

interface State {
  value: Record<string, number>;
  save(id: Moon['id'], value: number): void;
}

export const points = proxy<State>({
  value: {},
  save(id, value) {
    points.value[id] = value;
    storage.put('points', id, value);
  },
});

export const usePoints = () => {
  return [useSnapshot(points), points] as const;
};
