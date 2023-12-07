import { Link } from 'react-router-dom';

import Button from './Button';

import { useSolarSystem, useNavigation, usePlanet } from '../lib/hooks';

const Navigation = () => {
  const solarSystem = useSolarSystem();
  const navigation = useNavigation();
  const planet = usePlanet();

  return (
    <div className="grid grid-cols-4 items-center pt-0 p-3">
      <div className="flex items-center gap-3">
        <Link to={navigation.prevId ? `/${solarSystem.id}/${navigation.prevId}` : '/'}>
          <Button shadowClassName="bg-sky-600" contentClassName="bg-sky-500 px-4 py-2 text-white">
            {navigation.prevId ? 'Prev' : 'Leave'}
          </Button>
        </Link>

        <div className="h-[3px] flex-1 bg-neutral-200 rounded-l-full" />
      </div>

      <div className="flex items-center gap-3 col-span-2">
        <div className="h-[3px] flex-1 bg-neutral-200 rounded-r-full" />

        <div className="text-neutral-400 text-center font-medium flex truncate gap-1">
          <span className="truncate">{planet.title}</span>-<span className="truncate">{solarSystem.title}</span>
        </div>

        <div className="h-[3px] flex-1 bg-neutral-200 rounded-l-full" />
      </div>

      <div className="flex items-center gap-3">
        <div className="h-[3px] flex-1 bg-neutral-200 rounded-r-full" />

        <Link to={navigation.nextId ? `/${solarSystem.id}/${navigation.nextId}` : '#'}>
          <Button
            shadowClassName="bg-sky-600"
            contentClassName="bg-sky-500 px-4 py-2 text-white group-disabled:bg-neutral-200 group-disabled:text-neutral-400"
            disabled={!navigation.nextId}
          >
            Next
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
