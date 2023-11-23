import { createContext, forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { subscribe } from 'valtio';

import { type AppState, state } from './shared';
import { Action, Resource, type File, type Choice, type Answer } from '../types';
import { shuffle } from '../helpers';

// @ts-expect-error because i still don't know how to make ts happy
export const AppContext = createContext<AppState>({});

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
    text: string;
    choices: {
      items: Choice[];
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
      const points = state.answers.reduce((points, answer) => {
        return answer.blankId === `__${answer.choiceId}__` ? ++points : points;
      }, 0);
      return { files: [{ key: data.output.file, body: JSON.stringify({ answers: state.answers }) }], points };
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
      let choices = data.choices.items || [];
      if (data.choices.shuffle) choices = shuffle(choices, parent.id);

      const m = new Map<Choice['id'], Choice>();
      choices.forEach((choice) => m.set(choice.id, choice));
      value.m = m;

      const [file] = parent.request(Resource.Files, [data.initial.file]);
      const answers = (JSON.parse(file?.body || '{}')?.answers || []) as Answer[];
      if (answers.length) {
        const choiceIds = answers.map((answer) => answer.choiceId);
        value.choiceIds = Array.from(m.keys()).filter((choiceId) => !choiceIds.includes(choiceId));
        value.answers = answers;
      } else {
        value.choiceIds = Array.from(m.keys());
      }
    }, []);

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
