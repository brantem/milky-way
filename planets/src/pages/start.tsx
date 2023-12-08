import { Link } from 'react-router-dom';
import { deleteDB } from 'idb';

import Button from '../components/Button';
import ResetButton from '../components/buttons/ResetButton';
import EditorButton from '../components/buttons/EditorButton';

import { useSolarSystem } from '../lib/hooks';
import storage from '../lib/storage';
import { sleep } from '../lib/helpers';

const Start = () => {
  const solarSystem = useSolarSystem();
  const firstPlanet = solarSystem.planets[0];

  return (
    <>
      <div className="p-3 h-full w-full flex">
        <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-lg shadow-sm border border-neutral-200/50">
          <h1 className="text-5xl font-bold">{solarSystem.title}</h1>
          <div className="flex gap-2 mt-6">
            <ResetButton
              onClick={async () => {
                await storage.close();
                await deleteDB('solar-system');
                await sleep(250);
                window.location.reload();
              }}
            >
              Reset
            </ResetButton>
            <EditorButton>Editor</EditorButton>

            <Link to={firstPlanet ? `/${solarSystem.id}/${firstPlanet.id}` : '/'}>
              <Button
                shadowClassName="bg-sky-600"
                contentClassName="bg-sky-500 text-white px-4"
                disabled={!firstPlanet}
              >
                Start
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Start;
