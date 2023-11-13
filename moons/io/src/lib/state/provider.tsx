import { createContext, forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { subscribeKey } from 'valtio/utils';

import { type AppState, state } from './shared';

// @ts-expect-error because i still don't know how to make ts happy
export const AppContext = createContext<AppState>({});

export type AppProviderHandle = {
  reset(): void;
};

export type AppProviderProps = {
  onChange(lines: AppState['lines'], points: number): void;
  children: React.ReactNode;
};

export const AppProvider = forwardRef<AppProviderHandle, AppProviderProps>(({ children, onChange }, ref) => {
  const value = useRef(state).current;

  useImperativeHandle(ref, () => ({
    reset: () => (value.lines = []),
  }));

  useEffect(() => {
    const unsubscribe = subscribeKey(state, 'lines', () => {
      const lines = JSON.parse(JSON.stringify(state.lines)) as AppState['lines']; // unwrap
      const points = lines.reduce((points, line) => {
        return line.a.split('-')[1] === line.b.split('-')[1] ? ++points : points;
      }, 0);
      onChange(lines, points);
    });
    return () => unsubscribe();
  }, []);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
});
