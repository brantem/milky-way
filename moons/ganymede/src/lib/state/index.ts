import { useContext } from 'react';
import { useSnapshot } from 'valtio';

import { AppContext } from './provider';

export { AppProvider, type AppProviderHandle, type AppProviderProps } from './provider';

export const useAppState = () => {
  const value = useContext(AppContext);
  return [useSnapshot(value), value];
};
