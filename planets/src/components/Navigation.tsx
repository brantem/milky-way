import { Link } from 'react-router-dom';

import Button from './Button';
import EditorButton from './buttons/EditorButton';

import { useSolarSystem, useNavigation, usePlanet } from '../lib/hooks';
import { usePoints } from '../lib/state';
import { cn } from '../lib/helpers';

const Navigation = () => {
  const solarSystem = useSolarSystem();
  const navigation = useNavigation();
  const planet = usePlanet();
  const [points] = usePoints();

  let requiredPoints = 0;
  let earnedPoints = 0;
  switch (planet.layout) {
    case 'jupiter': {
      const { small, medium, large } = planet;
      requiredPoints = (small?.points?.min || 0) + (medium?.points?.min || 0) + (large?.points?.min || 0);
      earnedPoints = 0;
      if (small) earnedPoints += points.value[small.id] || 0;
      if (medium) earnedPoints += points.value[medium.id] || 0;
      if (large) earnedPoints += points.value[large.id] || 0;
      break;
    }
    case 'neptune':
      requiredPoints = planet.moons.reduce((points, moon) => points + (moon.points?.min || 0), 0);
      earnedPoints = planet.moons.reduce((v, moon) => v + (points.value[moon.id] || 0), 0);
      break;
    default:
      requiredPoints = 0;
      earnedPoints = 0;
      break;
  }

  return (
    <div className="grid grid-cols-4 items-center pt-0 p-3">
      <div className="flex items-center gap-3">
        <Link to="/" reloadDocument>
          <Button className="aspect-square" shadowClassName="bg-black" contentClassName="bg-neutral-800 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path
                fillRule="evenodd"
                d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </Link>

        <Link to={navigation.prevId ? `/${solarSystem.id}/${navigation.prevId}` : '/'} reloadDocument>
          <Button shadowClassName="bg-sky-600" contentClassName="bg-sky-500 px-4 py-2 text-white">
            Prev
          </Button>
        </Link>

        <EditorButton />

        <div className="h-[3px] flex-1 bg-neutral-200 rounded-l-full" />
      </div>

      <div className="flex items-center gap-3 col-span-2">
        <div className="h-[3px] flex-1 bg-neutral-200 rounded-r-full" />

        <div className="text-center font-medium flex truncate gap-1 items-center">
          <span
            className={
              requiredPoints > 0
                ? 'bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.green.500)_var(--percentage),theme(colors.neutral.400)_var(--percentage))] transition-colors'
                : 'text-neutral-400'
            }
            style={{ '--percentage': `${(earnedPoints / requiredPoints) * 100}%` } as React.CSSProperties}
          >
            <span className="truncate">{planet.title}</span> - <span className="truncate">{solarSystem.title}</span>
          </span>
          {requiredPoints > 0 && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={cn('w-6 h-6 text-neutral-400', earnedPoints >= requiredPoints && 'text-green-500')}
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>

        <div className="h-[3px] flex-1 bg-neutral-200 rounded-l-full" />
      </div>

      <div className="flex items-center gap-3">
        <div className="h-[3px] flex-1 bg-neutral-200 rounded-r-full" />

        <Link to={navigation.nextId ? `/${solarSystem.id}/${navigation.nextId}` : '#'} reloadDocument>
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
