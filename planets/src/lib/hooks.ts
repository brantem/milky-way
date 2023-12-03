import { useLoaderData } from 'react-router-dom';

import type { Planet } from './types';

export const usePlanet = <P extends Planet>(): P => {
  const planet = useLoaderData() as P;
  return planet;
};
