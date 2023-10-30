import { createContext, useEffect, useRef } from 'react';

import { type AppState, state } from './shared';
import { Choice } from '../types';

// @ts-expect-error because i still don't know how to make ts happy
export const AppContext = createContext<AppState>({});

export type AppProviderProps = {
  choices: Choice[];
  children: React.ReactNode;
};

export const AppProvider = ({ children, ...props }: AppProviderProps) => {
  const value = useRef(state).current;
  useEffect(() => {
    const choices = props.choices || [];
    const m = new Map<Choice['id'], Choice>();
    choices.forEach((choice) => m.set(choice.id, choice));
    value.m = m;
    value.choiceIds = Array.from(m.keys());
  }, [props]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
