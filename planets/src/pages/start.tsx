import { Link } from 'react-router-dom';

import Button from '../components/Button';
import EditorButton from '../components/buttons/EditorButton';

import { files, useEditor } from '../lib/state';
import type { SolarSystem } from '../lib/types';
import { ROOT_FOLDER, SOLAR_SYSTEM_FILE } from '../lib/constants';

const getSolarSystem = () => {
  const file = files.value.find((file) => file.key === ROOT_FOLDER + SOLAR_SYSTEM_FILE)!;
  return JSON.parse(file.body) as SolarSystem;
};

const Start = () => {
  const [editor] = useEditor();

  const solarSystem = getSolarSystem();
  const firstPlanet = solarSystem.planets[0];

  return (
    <>
      <div className="p-3 h-full w-full flex">
        <div
          key={editor.saved}
          className="flex-1 flex flex-col items-center justify-center bg-white rounded-lg shadow-sm border border-neutral-200/50"
        >
          <h1 className="text-5xl font-bold">{solarSystem.title}</h1>
          <div className="flex gap-2 mt-6">
            <EditorButton />

            <Link to={firstPlanet ? `/${firstPlanet.id}` : '/'}>
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
