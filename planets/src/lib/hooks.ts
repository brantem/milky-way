import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import type { Planet, SolarSystem } from './types';
import { SOLAR_SYSTEM_FILE } from './constants';
import { files } from './state';

const getFile = (key: string) => files.value.find((file) => file.key === key);

export const useSolarSystem = () => {
  const params = useParams() as { solarSystem: string };

  const file = getFile(`${params.solarSystem}/${SOLAR_SYSTEM_FILE}`)!;
  return JSON.parse(file.body || '[]') as SolarSystem;
};

export const useNavigation = () => {
  const params = useParams() as { solarSystem: string; planet: string };

  const solarSystem = useSolarSystem();
  const index = solarSystem.planets.findIndex((planet) => planet.id === params.planet);

  return {
    prevId: solarSystem.planets[index - 1]?.id || null,
    nextId: solarSystem.planets[index + 1]?.id || null,
  };
};

export const usePlanet = <P extends Planet>(): P => {
  const params = useParams() as { planet: string };

  const solarSystem = useSolarSystem();
  const file = getFile(solarSystem.planets.find((planet) => planet.id === params.planet)!.file);
  const planet = JSON.parse(file?.body || '{}') || {};

  useEffect(() => {
    document.title = `${planet.title} - ${solarSystem.title}`;
  }, [solarSystem, planet]);

  return planet;
};
