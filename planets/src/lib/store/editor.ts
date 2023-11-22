import { create } from 'zustand';

interface State {
  isOpen: boolean;
  toggle(): void;
}

export const useEditor = create<State>()((set) => ({
  isOpen: false,
  toggle() {
    set((state) => ({ isOpen: !state.isOpen }));
  },
}));
