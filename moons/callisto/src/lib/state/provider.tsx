import { createContext, useEffect, useRef } from 'react';

import { type AppState, state } from './shared';

// @ts-expect-error because i still don't know how to make ts happy
export const AppContext = createContext<AppState>({});

export type AppProviderProps = Partial<Pick<AppState, 'choices'>> & {
  children: React.ReactNode;
};

export const AppProvider = ({ children, ...props }: AppProviderProps) => {
  const value = useRef(state).current;
  useEffect(() => {
    value.choices = props.choices || [];
  }, [props]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
