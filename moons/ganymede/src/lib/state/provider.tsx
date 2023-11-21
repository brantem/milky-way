import { createContext, forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { subscribe } from 'valtio';

import { type AppState, state } from './shared';
import type { File } from '../types';

// @ts-expect-error because i want to sleep
export const AppContext = createContext<AppState>({});

enum Action {
  Reset = 'reset',
  SetColor = 'color:set',
}

export type AppProviderHandle = {
  snapshot(): { files: File[]; points: number };
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
  onChange(files: File[], points: number): void;
  debug?: boolean;
  children: React.ReactNode;
};

export const AppProvider = forwardRef<AppProviderHandle, AppProviderProps>(
  ({ children, files, onChange, ...props }, ref) => {
    const tests = (JSON.parse(files.find((file) => file.key === props.data.tests.file)?.body || '[]') || []) as Test[];
    const value = useRef(state).current;

    const snapshot: AppProviderHandle['snapshot'] = () => {
      let points = 0;
      const items = tests.map((test) => {
        const path = state.visiblePaths.find((path) => {
          if (!path.prediction) return;
          if (path.prediction.label !== test.data.label) return;
          const probability = path.prediction.probability * 100;
          if (!(probability >= state.model!.probability.min && probability <= state.model!.probability.max)) return;
          if (test.data.color && path.color !== test.data.color) return;
          points += 1;
          return path;
        });
        if (!path) return null;
        return {
          color: path.color,
          label: path.prediction?.label,
        };
      });

      return {
        files: [
          {
            key: 'ganymede.json',
            body: JSON.stringify({
              color: state.color,
              paths: state.paths,
              n: state.n,
            }),
          },
          {
            key: 'deimos.json',
            body: JSON.stringify(items),
          },
        ],
        points,
      };
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
        const { files, points } = snapshot();
        onChange(files, points);
      });
      return () => unsubscribe();
    }, []);

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
  },
);
