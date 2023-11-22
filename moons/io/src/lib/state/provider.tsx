import { createContext, forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { subscribeKey } from 'valtio/utils';

import type { File, Line } from '../types';
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
  files: File[];
  data: {
    initial: {
      file: string;
    };
    output: {
      file: string;
    };
  };
  onChange(files: File[], points: number): void;
  children: React.ReactNode;
};

export const AppProvider = forwardRef<AppProviderHandle, AppProviderProps>(
  ({ files, data, children, onChange }, ref) => {
    const value = useRef(state).current;

    const snapshot: AppProviderHandle['snapshot'] = () => {
      const points = state.lines.reduce((points, line) => {
        return line.a.split('-')[1] === line.b.split('-')[1] ? ++points : points;
      }, 0);
      return { files: [{ key: data.output.file, body: JSON.stringify({ lines: state.lines }) }], points };
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
      const file = files.find((file) => file.key === data.initial.file);
      value.lines = (JSON.parse(file?.body || '{}')?.lines || []) as Line[];
    }, []);

    useEffect(() => {
      const unsubscribe = subscribeKey(state, 'lines', () => {
        const { files, points } = snapshot();
        onChange(files, points);
      });
      return () => unsubscribe();
    }, []);

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
  },
);
