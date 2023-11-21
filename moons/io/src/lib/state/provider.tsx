import { createContext, forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { subscribeKey } from 'valtio/utils';

import type { File } from '../types';
import { type AppState, state } from './shared';

// @ts-expect-error because i still don't know how to make ts happy
export const AppContext = createContext<AppState>({});

enum Action {
  Reset = 'reset',
}

export type AppProviderHandle = {
  snapshot(): { files: File[]; points: number };
  execute(action: Action, data: any): boolean;
};

export type AppProviderProps = {
  onChange(files: File[], points: number): void;
  children: React.ReactNode;
};

export const AppProvider = forwardRef<AppProviderHandle, AppProviderProps>(({ children, onChange }, ref) => {
  const value = useRef(state).current;

  const snapshot: AppProviderHandle['snapshot'] = () => {
    const points = state.lines.reduce((points, line) => {
      return line.a.split('-')[1] === line.b.split('-')[1] ? ++points : points;
    }, 0);
    return { files: [{ key: 'io.json', body: JSON.stringify(state.lines) }], points };
  };

  useImperativeHandle(ref, () => ({
    snapshot,
    execute(action) {
      switch (action) {
        case Action.Reset:
          value.lines = [];
          return true;
        default:
          return false;
      }
    },
  }));

  useEffect(() => {
    const unsubscribe = subscribeKey(state, 'lines', () => {
      const { files, points } = snapshot();
      onChange(files, points);
    });
    return () => unsubscribe();
  }, []);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
});
