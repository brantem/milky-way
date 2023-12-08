import { proxy, useSnapshot } from 'valtio';

interface State {
  ready: boolean;
}

export const offline = proxy<State>({
  ready: localStorage.getItem('offline') === '1',
});

export const useOffline = () => {
  return [useSnapshot(offline), offline] as const;
};
