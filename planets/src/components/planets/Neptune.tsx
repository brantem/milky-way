import { usePlanet } from './shared';
import Markdown from '../Markdown';
import Moon from '../Moon';
import EditorButton from '../buttons/EditorButton';

import type { Neptune, Parent } from '../../lib/types';
import { usePoints } from '../../lib/state';

const Neptune = () => {
  const [points] = usePoints();

  const { planet, onRequest, onChange } = usePlanet<Neptune>('planets/neptune/_planet.json');
  const parent: Parent = { id: planet.id, request: onRequest };

  const getStopAt = () => {
    for (let i = 0; i < planet.moons.length; i++) {
      const moon = planet.moons[i];
      if (typeof moon === 'string') continue;
      if ((points.value[moon.id] || 0) >= moon.points.min) continue;
      return i;
    }
    return -1;
  };

  return (
    <>
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-5 py-5">
        {planet.moons.map((moon, i) => {
          const stopAt = getStopAt();
          if (stopAt !== -1 && i > stopAt) return null;
          return typeof moon === 'string' ? (
            <Markdown key={i} className="px-3">
              {moon}
            </Markdown>
          ) : (
            <Moon
              key={i}
              parent={parent}
              moon={moon}
              onChange={onChange(moon.id)}
              onPublish={(action, data) => console.log(action, data)}
            />
          );
        })}
      </div>

      <EditorButton className="fixed bottom-4 left-4" />
    </>
  );
};

export default Neptune;
