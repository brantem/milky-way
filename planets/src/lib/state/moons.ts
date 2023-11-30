import { proxy } from 'valtio';
import { proxyMap } from 'valtio/utils';

import type { MoonHandle } from '../../components/Moon';

import type { Moon } from '../types';

interface State {
  refs: Map<Moon['id'], MoonHandle>;
  addRef: (id: Moon['id']) => (el: MoonHandle | null) => void;
  publish: (action: string, data?: any, except?: Moon['id']) => void;
}

export const moons = proxy<State>({
  refs: proxyMap(),
  addRef: (id) => (el) => {
    if (el === null) {
      moons.refs.delete(id);
    } else {
      moons.refs.set(id, el);
    }
  },
  publish: (action, data, except) => {
    for (const key of moons.refs.keys()) {
      if (key === except) continue;
      moons.refs.get(key)?.execute?.(action, data);
    }
  },
});
