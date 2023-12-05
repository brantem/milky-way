import { useEffect, useState } from 'react';
import { subscribe } from 'valtio';

import Moon from '../Moon';

import type { Neptune } from '../../lib/types';
import { useEditor, points } from '../../lib/state';
import { usePlanet } from '../../lib/hooks';

const Neptune = () => {
  const [editor] = useEditor();

  const planet = usePlanet<Neptune>();

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
  }, [planet.moons]);

  return (
    <div className="flex-1 p-3 flex overflow-hidden">
      <div
        key={editor.saved}
        className="flex-1 py-5 overflow-y-auto [scrollbar-gutter:stable] rounded-lg bg-white border border-neutral-200/50 shadow-sm"
      >
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-5">
          {planet.moons.map((moon, i) => {
            if (typeof moon === 'string') return null;
            if (stopAt === undefined || (stopAt !== -1 && i > stopAt)) return null;
            return <Moon key={i} moon={moon} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Neptune;
