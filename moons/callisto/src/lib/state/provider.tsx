import { createContext, forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { subscribe } from 'valtio';

import { type AppState, state } from './shared';
import type { File, Choice } from '../types';

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
  data: {
    text: string;
    choices: {
      items: Choice[];
      shuffle?: boolean;
    };
  };
  onChange(files: File[], points: number): void;
  children: React.ReactNode;
};

export const AppProvider = forwardRef<AppProviderHandle, AppProviderProps>(({ children, onChange, ...props }, ref) => {
  const value = useRef(state).current;

  const snapshot: AppProviderHandle['snapshot'] = () => {
    const points = state.answers.reduce((points, answer) => {
      return answer.blankId === `__${answer.choiceId}__` ? ++points : points;
    }, 0);
    return { files: [{ key: 'callisto.json', body: JSON.stringify(state.answers) }], points };
  };

  useImperativeHandle(ref, () => ({
    snapshot,
    execute(action) {
      switch (action) {
        case Action.Reset:
          value.choiceIds.push(...value.answers.map((answer) => answer.choiceId));
          value.answers = [];
          return true;
        default:
          return false;
      }
    },
  }));

  useEffect(() => {
    let choices = props.data.choices.items || [];
    if (props.data.choices.shuffle) choices = shuffle(choices);
    const m = new Map<Choice['id'], Choice>();
    choices.forEach((choice) => m.set(choice.id, choice));
    value.m = m;
    value.choiceIds = Array.from(m.keys());
  }, [props.data.choices]);

  useEffect(() => {
    const unsubscribe = subscribe(state, () => {
      const { files, points } = snapshot();
      onChange(files, points);
    });
    return () => unsubscribe();
  }, []);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
});
