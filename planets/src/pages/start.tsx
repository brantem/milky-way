import { Link } from 'react-router-dom';

import Button from '../components/Button';
import EditorButton from '../components/buttons/EditorButton';

import { useEditor } from '../lib/state';
import { useSolarSystem } from '../lib/hooks';

const Start = () => {
  const [editor] = useEditor();

  const solarSystem = useSolarSystem();
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
