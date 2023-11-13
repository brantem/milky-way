import { createContext, useEffect, useRef } from 'react';

import { type AppState, state } from './shared';

// @ts-expect-error because i want to sleep
export const AppContext = createContext<AppState>({});

export type AppProviderProps = {
  data: Pick<AppState, 'model'> & Partial<Pick<AppState, 'autoClear'>>;
  debug?: boolean;
  children: React.ReactNode;
};

export const AppProvider = ({ children, ...props }: AppProviderProps) => {
  const value = useRef(state).current;
  useEffect(() => {
    value.model = props.data.model || null;
    value.autoClear = Boolean(props.data.autoClear);
    value.debug = Boolean(props.debug);
  }, [props.data, props.debug]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
