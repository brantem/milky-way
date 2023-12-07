import { proxy, useSnapshot } from 'valtio';

interface State {
  isVisible: boolean;

  keys: string[];
  activeKey: string;
  value: string;
}

export const editor = proxy<State>({
  isVisible: false,

  keys: [],
  activeKey: '_temp',
  value: '',
});

export const useEditor = () => {
  return [useSnapshot(editor), editor] as const;
};
