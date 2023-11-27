import { useEffect, useMemo, useState } from 'react';

import { usePlanet } from './shared';
import Markdown from '../Markdown';
import Moon from '../Moon';
import EditorButton from '../buttons/EditorButton';

import type { Neptune, Parent } from '../../lib/types';
import { points } from '../../lib/state';

const Neptune = () => {
  const { planet, onRequest, onChange } = usePlanet<Neptune>('planets/neptune/_planet.json');

  const [stopAt, setStopAt] = useState<number>();

  const parent: Parent = useMemo(() => ({ id: planet.id, request: onRequest }), []);

  useEffect(() => {
    if (stopAt !== undefined) return;
    for (let i = 0; i < planet.moons.length; i++) {
      const moon = planet.moons[i];
      if (typeof moon === 'string') continue;
      if ((points.value[moon.id] || 0) >= moon.points.min) continue;
      setStopAt(i);
      return;
    }
    setStopAt(-1);
  }, []);

  // TODO: watch points, if the points has reached the min, continue rendering

  return (
    <>
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-5 py-5">
        {stopAt !== undefined
          ? (stopAt !== -1 ? planet.moons.slice(0, stopAt + 1) : planet.moons).map((moon) => {
              if (typeof moon === 'string') return <Markdown className="px-3">{moon}</Markdown>;
              return (
                <Moon
                  key={moon.id}
                  parent={parent}
                  moon={moon}
                  onChange={onChange(moon.id)}
                  onPublish={(action, data) => console.log(action, data)}
                />
              );
            })
          : null}
      </div>

      <EditorButton className="fixed bottom-4 left-4" />
    </>
  );
};

export default Neptune;
