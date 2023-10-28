import { createContext, useEffect, useRef } from 'react';

import { type AppState, state } from './shared';

// @ts-expect-error because i want to sleep
export const AppContext = createContext<AppState>({});

export type AppProviderProps = Partial<Pick<AppState, 'model' | 'autoClear' | 'debug'>> & {
  children: React.ReactNode;
};

export const AppProvider = ({ children, ...props }: AppProviderProps) => {
  const value = useRef(state).current;
  useEffect(() => {
    value.model = props.model || null;
    value.autoClear = Boolean(props.autoClear);
    value.debug = Boolean(props.debug);
  }, [props]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
