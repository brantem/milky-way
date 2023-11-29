import { useEffect, useRef, useState } from 'react';
import { subscribe } from 'valtio';

import { usePlanet } from './shared';
import Markdown from '../Markdown';
import Moon, { type MoonHandle } from '../Moon';
import EditorButton from '../buttons/EditorButton';
import ResetButton from '../buttons/ResetButton';
import Button from '../Button';

import type { Neptune, Parent } from '../../lib/types';
import { useEditor, points } from '../../lib/state';

const Neptune = () => {
  const refs = useRef<(MoonHandle | null)[]>([]);

  const [editor] = useEditor();

  const { planet, onRequest, onChange } = usePlanet<Neptune>('planets/neptune/_planet.json');
  const parent: Parent = { id: planet.id, request: onRequest };

  const [stopAt, setStopAt] = useState(-1);

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
      <div key={editor.saved} className="max-w-5xl mx-auto flex flex-col items-center gap-5 py-5">
        {planet.moons.map((moon, i) => {
          if (stopAt !== -1 && i > stopAt) return null;
          return typeof moon === 'string' ? (
            <Markdown key={i} className="px-3">
              {moon}
            </Markdown>
          ) : (
            <Moon
              ref={(el) => (refs.current[i] = el)}
              key={i}
              parent={parent}
              moon={moon}
              onChange={onChange(moon.id)}
              onPublish={(action, data) => {
                for (let i = refs.current.length - 1; i >= 0; i--) {
                  refs.current[i]?.execute?.(action, data);
                }
              }}
            />
          );
        })}
      </div>

      <div className="fixed bottom-[21px] left-[21px] flex gap-2">
        <EditorButton />
        <ResetButton
          onClick={() => {
            for (let i = refs.current.length - 1; i >= 0; i--) {
              refs.current[i]?.execute?.('reset');
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
