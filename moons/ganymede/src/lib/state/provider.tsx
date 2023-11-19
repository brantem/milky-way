import { createContext, forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { subscribe } from 'valtio';

import { type AppState, state } from './shared';
import type { File, Path } from '../types';

// @ts-expect-error because i want to sleep
export const AppContext = createContext<AppState>({});

type Data = Pick<AppState, 'paths'>;

enum Action {
  Reset = 'reset',
  SetColor = 'color:set',
}

export type AppProviderHandle = {
  snapshot(): { data: Data; points: number };
  execute(action: Action, data: any): boolean;
};

type Test = {
  text: string;
  data: {
    label: string;
    color?: string;
  };
};

export type AppProviderProps = {
  files: File[];
  data: Pick<AppState, 'model'> & { tests: { file: string } };
  onChange(data: Data, points: number): void;
  debug?: boolean;
  children: React.ReactNode;
};

const calculatePoints = (tests: Test[], paths: Path[]) => {
  let points = 0;
  a: for (let i = 0; i < tests.length; i++) {
    for (let j = 0; j < paths.length; j++) {
      const prediction = paths[j].prediction;
      if (!prediction) continue;
      if (prediction.label !== tests[i].data.label) continue;
      if (prediction.probability * 100 < 95) continue;
      if (tests[i].data.color && paths[j].color !== tests[i].data.color) continue;
      points += 1;
      continue a;
    }
  }
  return points;
};

export const AppProvider = forwardRef<AppProviderHandle, AppProviderProps>(
  ({ children, files, onChange, ...props }, ref) => {
    const tests = (JSON.parse(files.find((file) => file.key === props.data.tests.file)?.body || '[]') || []) as Test[];
    const value = useRef(state).current;

    const snapshot = () => {
      const paths = JSON.parse(JSON.stringify(state.visiblePaths));
      return { data: { paths }, points: calculatePoints(tests, paths) };
    };

    useImperativeHandle(ref, () => ({
      snapshot,
      execute(action, data) {
        switch (action) {
          case Action.SetColor:
            value.color = data;
            return true;
          case Action.Reset:
            value.color = '#000';
            value.clear();
            return true;
          default:
            return false;
        }
      },
    }));

    useEffect(() => {
      value.model = props.data.model || null;
      value.debug = Boolean(props.debug);
    }, [props.data.model, props.debug]);

    useEffect(() => {
      const unsubscribe = subscribe(state, () => {
        const { data, points } = snapshot();
        onChange(data, points);
      });
      return () => unsubscribe();
    }, []);

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
  },
);
