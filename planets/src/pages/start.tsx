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
      <div key={editor.saved} className="h-full w-full flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold">{solarSystem.title}</h1>
        <Link to={firstPlanet ? `/${firstPlanet.id}` : '/'}>
          <Button
            className="mt-6"
            shadowClassName="bg-sky-600"
            contentClassName="bg-sky-500 text-white px-4"
            disabled={!firstPlanet}
          >
            Start
          </Button>
        </Link>
      </div>

      <EditorButton className="fixed bottom-[21px] left-[21px]" />
    </>
  );
};

export default Start;
