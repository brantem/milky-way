import { createContext, forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { subscribe } from 'valtio';

import { type AppState, state } from './shared';
import type { Path } from '../types';

// @ts-expect-error because i want to sleep
export const AppContext = createContext<AppState>({});

export type AppProviderHandle = {
  get(): { data: Path[]; points: number };
  reset(): void;
};

type Test = {
  label: string;
  color?: string;
};

export type AppProviderProps = {
  data: Pick<AppState, 'model'> & { tests: Test[] };
  onChange(paths: Path[], points: number): void;
  debug?: boolean;
  children: React.ReactNode;
};

const calculatePoints = (tests: Test[], paths: Path[]) => {
  let points = 0;
  a: for (let i = 0; i < tests.length; i++) {
    for (let j = 0; j < paths.length; j++) {
      const prediction = paths[j].prediction;
      if (!prediction) continue;
      if (prediction.label !== tests[i].label) continue;
      if (prediction.probability * 100 < 95) continue;
      if (tests[i].color && paths[j].color !== tests[i].color) continue;
      points += 1;
      continue a;
    }
  }
  return points;
};

export const AppProvider = forwardRef<AppProviderHandle, AppProviderProps>(({ children, onChange, ...props }, ref) => {
  const value = useRef(state).current;

  useImperativeHandle(ref, () => ({
    get() {
      const data = JSON.parse(JSON.stringify(state.visiblePaths));
      return { data, points: calculatePoints(props.data.tests, data) };
    },
    reset() {
      value.color = '#000';
      value.clear();
    },
  }));

  useEffect(() => {
    value.model = props.data.model || null;
    value.debug = Boolean(props.debug);
  }, [props.data, props.debug]);

  useEffect(() => {
    const unsubscribe = subscribe(state, () => {
      const paths = JSON.parse(JSON.stringify(state.visiblePaths));
      onChange(paths, calculatePoints(props.data.tests, paths));
    });
    return () => unsubscribe();
  }, []);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
});
