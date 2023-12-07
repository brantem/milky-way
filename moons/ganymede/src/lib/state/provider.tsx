import { createContext, forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { subscribe } from 'valtio';

import { type AppState, state } from './shared';
import { Action, Resource, type File } from '../types';

// @ts-expect-error because i want to sleep
export const AppContext = createContext<AppState>({});

export type AppProviderHandle = {
  snapshot(): Promise<{ files: File[]; points: number }>;
  execute(action: Action, data: unknown): Promise<boolean>;
};

export type AppProviderProps = {
  parent: {
    id: string;
    request(resource: Resource.Files, keys: string[]): Promise<(File | null)[]>;
  };
  id: string;
  data: Partial<Pick<AppState, 'model'>> & {
    initial?: {
      file?: string;
    };
    tests?: {
      file?: string;
    };
    output?: {
      file?: string;
      deimos?: string;
    };
  };
  onChange(files: File[], points: number): void;
  onPublish(action: string, data?: unknown): void;
  debug?: boolean;
  children: React.ReactNode;
};

export const AppProvider = forwardRef<AppProviderHandle, AppProviderProps>(
  ({ parent, id, onChange, onPublish, children, ...props }, ref) => {
    const value = useRef(state).current;

    const snapshot = () => {
      const files = [];
      let points = 0;

      if (props.data.output?.file) {
        files.push({
          key: props.data.output.file,
          body: JSON.stringify({
            color: state.color,
            paths: state.paths,
            n: state.n,
          }),
        });
      }

      if (state.model && state.tests.length) {
        const { min, max } = state.model.probability;
        const items = Array.from({ length: state.tests.length }).fill(null);
        state.visiblePaths.forEach((path) => {
          state.tests.forEach((test, i) => {
            if (!path.prediction) return;
            if (path.prediction.label !== test.data.label) return;
            const probability = path.prediction.probability * 100;
            if (!(probability >= min && probability <= max)) return;
            if (test.data.color && path.color !== test.data.color) {
              items[i] = { color: path.color, label: path.prediction.label };
              return;
            }
            points += 1;
            items[i] = { color: path.color, label: path.prediction.label };
          });
        });
        if (props.data.output?.deimos) files.push({ key: props.data.output.deimos, body: JSON.stringify(items) });
      }

      return { files, points };
    };

    useImperativeHandle(ref, () => ({
      async snapshot() {
        return snapshot();
      },
      async execute(action, data) {
        switch (action) {
          case Action.SetColor:
            value.color = data as string;
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
      value.id = id;
      value.model = props.data.model || null;
      value.debug = Boolean(props.debug);

      (async () => {
        const keys = [];
        if (props.data.initial?.file) keys.push(props.data.initial.file);
        if (props.data.output?.file) keys.push(props.data.output.file);
        if (!keys.length) return;
        const [initial, output] = await parent.request(Resource.Files, keys);
        const body = JSON.parse((output || initial)?.body || '{}') || {};
        if ('color' in body) value.color = body.color;
        if ('paths' in body) value.paths = body.paths;
        if ('n' in body) value.n = body.n;

        if (!props.data.tests?.file) return;
        const [tests] = await parent.request(Resource.Files, [props.data.tests.file]);
        value.tests = JSON.parse(tests?.body || '[]') || [];
      })();
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
