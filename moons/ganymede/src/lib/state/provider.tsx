import { createContext, forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { subscribe } from 'valtio';

import { type AppState, state } from './shared';
import { Action, Resource, type File } from '../types';

// @ts-expect-error because i want to sleep
export const AppContext = createContext<AppState>({});

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
  parent: {
    id: string;
    request: (resource: Resource.Files, keys: string[]) => (File | undefined)[];
  };
  data: Pick<AppState, 'model'> & {
    initial: {
      file: string;
    };
    tests: {
      file: string;
    };
    output: {
      file: string;
      deimos: string;
    };
  };
  onChange(files: File[], points: number): void;
  onPublish(action: string, data?: any): void;
  debug?: boolean;
  children: React.ReactNode;
};

export const AppProvider = forwardRef<AppProviderHandle, AppProviderProps>(
  ({ parent, onChange, onPublish, children, ...props }, ref) => {
    const tests = useMemo(() => {
      const [file] = parent.request(Resource.Files, [props.data.tests.file]);
      return (JSON.parse(file?.body || '[]') || []) as Test[];
    }, []);
    const value = useRef(state).current;

    const snapshot: AppProviderHandle['snapshot'] = () => {
      const items = Array.from({ length: tests.length }).fill(null);
      let points = 0;

      state.visiblePaths.forEach((path) => {
        tests.forEach((test, i) => {
          if (!path.prediction) return;
          if (path.prediction.label !== test.data.label) return;
          const probability = path.prediction.probability * 100;
          if (!(probability >= state.model!.probability.min && probability <= state.model!.probability.max)) return;
          if (test.data.color && path.color !== test.data.color) {
            items[i] = { color: path.color, label: path.prediction.label };
            return;
          }
          points += 1;
          items[i] = { color: path.color, label: path.prediction.label };
        });
      });

      return {
        files: [
          {
            key: props.data.output.file,
            body: JSON.stringify({
              color: state.color,
              paths: state.paths,
              n: state.n,
            }),
          },
          {
            key: props.data.output.deimos,
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
      const [file] = parent.request(Resource.Files, [props.data.initial.file]);
      if (file) {
        const { color, paths, n } = (JSON.parse(file?.body || '{}') || {}) as Pick<AppState, 'color' | 'paths' | 'n'>;
        value.color = color;
        value.paths = paths;
        value.n = n;
      }

      value.model = props.data.model || null;
      value.debug = Boolean(props.debug);
    }, []);

    useEffect(() => {
      const unsubscribe = subscribe(state, () => {
        const { files, points } = snapshot();
        onChange(files, points);
        onPublish('refresh');
      });
      return () => unsubscribe();
    }, []);

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
  },
);
