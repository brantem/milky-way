import { createContext, forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { subscribeKey } from 'valtio/utils';

import { Action, Resource, type File, type Item } from '../types';
import { type AppState, state } from './shared';

// @ts-expect-error because i still don't know how to make ts happy
export const AppContext = createContext<AppState>({});

const shuffle = <T,>(a: T[]): T[] => {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = b[i];
    b[i] = b[j];
    b[j] = temp;
  }
  return b;
};

export type AppProviderHandle = {
  snapshot(): { files: File[]; points: number };
  execute(action: Action.Reset): boolean;
};

export type AppProviderProps = {
  parent: {
    id: string;
    request: (resource: Resource.Files, keys: string[]) => (File | undefined)[];
  };
  data: {
    initial: {
      file: string;
    };
    output: {
      file: string;
    };
    left: {
      items: Item[];
      shuffle?: boolean;
    };
    right: {
      items: Item[];
      shuffle?: boolean;
    };
  };
  onChange(files: File[], points: number): void;
  children: React.ReactNode;
};

export const AppProvider = forwardRef<AppProviderHandle, AppProviderProps>(
  ({ parent, data, children, onChange }, ref) => {
    const value = useRef(state).current;

    const snapshot: AppProviderHandle['snapshot'] = () => {
      const points = state.lines.reduce((points, line) => {
        return line.a.split('-')[1] === line.b.split('-')[1] ? ++points : points;
      }, 0);
      return {
        files: [
          {
            key: data.output.file,
            body: JSON.stringify({ leftIds: state.leftIds, rightIds: state.rightIds, lines: state.lines }),
          },
        ],
        points,
      };
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
      const [file] = parent.request(Resource.Files, [data.initial.file]);
      if (file) {
        type Body = Pick<AppState, 'leftIds' | 'rightIds' | 'lines'>;
        const { leftIds, rightIds, lines } = (JSON.parse(file?.body || '{}') || {}) as Body;
        value.leftIds = leftIds;
        value.rightIds = rightIds;
        value.lines = lines;
      } else {
        let leftIds = data.left.items.map((item) => item.id);
        if (data.left.shuffle) leftIds = shuffle(leftIds);
        value.leftIds = leftIds;

        let rightIds = data.right.items.map((item) => item.id);
        if (data.right.shuffle) rightIds = shuffle(rightIds);
        value.rightIds = rightIds;
      }
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
