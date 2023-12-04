import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import type { Planet, SolarSystem } from './types';
import { ROOT_FOLDER, SOLAR_SYSTEM_FILE } from './constants';
import { files } from './state';

const getFile = (key: string) => files.value.find((file) => file.key === key);

export const useSolarSystem = () => {
  const file = getFile(ROOT_FOLDER + SOLAR_SYSTEM_FILE)!;
  return JSON.parse(file.body || '[]') as SolarSystem;
};

export const usePlanet = <P extends Planet>(): P => {
  const params = useParams();

  const solarSystem = useSolarSystem();
  const file = getFile(solarSystem.planets.find((planet) => planet.id === params.planetId)!.file);
  const planet = JSON.parse(file?.body || '{}') || {};

  useEffect(() => {
    document.title = `${planet.title} - ${solarSystem.title}`;
  }, [solarSystem, planet]);

  return planet;
};
