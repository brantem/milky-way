import { useEffect, useState } from 'react';
import { subscribe } from 'valtio';

import { usePlanet } from './shared';
import Moon from '../Moon';
import EditorButton from '../buttons/EditorButton';
import ResetButton from '../buttons/ResetButton';
import Button from '../Button';

import type { Neptune, Parent } from '../../lib/types';
import { useEditor, points, moons } from '../../lib/state';

const Neptune = () => {
  const [editor] = useEditor();

  const { planet, onRequest, onChange } = usePlanet<Neptune>('planets/neptune/_planet.json');
  const parent: Parent = { id: planet.id, request: onRequest };

  const [stopAt, setStopAt] = useState<number>();

  useEffect(() => {
    const cb = () => {
      for (let i = 0; i < planet.moons.length; i++) {
        const moon = planet.moons[i];
        if (typeof moon === 'string') continue;
        if ((points.value[moon.id] || 0) >= moon.points.min) continue;
        setStopAt(i);
        return;
      }
      setStopAt(-1);
    };

    cb();
    return subscribe(points, cb);
  }, []);

  return (
    <>
      <div key={editor.saved} className="py-5 overflow-y-auto [scrollbar-gutter:stable] h-full">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-5">
          {planet.moons.map((moon, i) => {
            if (typeof moon === 'string') return null;
            if (stopAt === undefined || (stopAt !== -1 && i > stopAt)) return null;
            return <Moon key={i} parent={parent} moon={moon} onChange={onChange(moon.id)} />;
          })}
        </div>
      </div>

      <div className="fixed bottom-[21px] left-[21px] flex gap-2">
        <EditorButton />
        <ResetButton
          onClick={() => {
            for (let i = planet.moons.length - 1; i >= 0; i--) {
              const moon = planet.moons[i];
              if (typeof moon === 'string') continue;
              const ref = moons.refs.get(moon.id);
              if (!ref) continue;
              ref.execute?.('reset');
            }
          }}
        />
      </div>

      <a href="/jupiter">
        <Button
          className="fixed right-[21px] bottom-[21px]"
          shadowClassName="bg-sky-600"
          contentClassName="bg-sky-500 px-4 py-2 text-white"
        >
          Jupiter
        </Button>
      </a>
    </>
  );
};

export default Neptune;
