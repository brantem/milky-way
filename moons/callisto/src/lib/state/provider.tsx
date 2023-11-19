import { createContext, forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { subscribe } from 'valtio';

import { type AppState, state } from './shared';
import { Choice } from '../types';

// @ts-expect-error because i still don't know how to make ts happy
export const AppContext = createContext<AppState>({});

type Data = Pick<AppState, 'answers'>;

enum Action {
  Reset = 'reset',
}

export type AppProviderHandle = {
  snapshot(): { data: Data; points: number };
  execute(action: Action, data: any): boolean;
};

export type AppProviderProps = {
  data: {
    text: string;
    choices: Choice[];
  };
  onChange(data: Data, points: number): void;
  children: React.ReactNode;
};

export const AppProvider = forwardRef<AppProviderHandle, AppProviderProps>(({ children, onChange, ...props }, ref) => {
  const value = useRef(state).current;

  const snapshot = () => {
    const answers = JSON.parse(JSON.stringify(state.answers)) as AppState['answers']; // unwrap
    const points = answers.reduce((points, answer) => {
      return answer.blankId === `__${answer.choiceId}__` ? ++points : points;
    }, 0);
    return { data: { answers }, points };
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
    const choices = props.data.choices || [];
    const m = new Map<Choice['id'], Choice>();
    choices.forEach((choice) => m.set(choice.id, choice));
    value.m = m;
    value.choiceIds = Array.from(m.keys());
  }, [props.data]);

  useEffect(() => {
    const unsubscribe = subscribe(state, () => {
      const { data, points } = snapshot();
      onChange(data, points);
    });
    return () => unsubscribe();
  }, []);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
});
