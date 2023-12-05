import { proxy, useSnapshot } from 'valtio';

interface State {
  enabled: boolean;
  isVisible: boolean;
  saved: number;
}

export const editor = proxy<State>({
  enabled: localStorage.getItem('editor') === '1',
  isVisible: false,
  saved: 0,
});

export const useEditor = () => {
  return [useSnapshot(editor), editor] as const;
};
