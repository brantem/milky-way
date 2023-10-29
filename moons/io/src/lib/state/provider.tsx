import { createContext, useRef } from 'react';

import { type AppState, state } from './shared';

// @ts-expect-error because i still don't know how to make ts happy
export const AppContext = createContext<AppState>({});

export type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const value = useRef(state).current;
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
