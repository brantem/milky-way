import { proxy, useSnapshot } from 'valtio';

interface State {
  isVisible: boolean;
  saved: number;
}

export const editor = proxy<State>({
  isVisible: false,
  saved: 0,
});

export const useEditor = () => {
  return [useSnapshot(editor), editor] as const;
};
