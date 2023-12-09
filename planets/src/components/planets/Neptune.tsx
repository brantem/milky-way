import { useEffect, useMemo, useRef, useState } from 'react';
import { subscribe } from 'valtio';

import Moon from '../Moon';

import type { Neptune } from '../../types';
import { points } from '../../lib/state';
import { usePlanet } from '../../lib/hooks';

const Neptune = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const planet = usePlanet<Neptune>();
  const firstStopIndex = useMemo(() => planet.moons.findIndex((moon) => (moon.points?.min || 0) !== 0), [planet.moons]);

  const [stopAt, setStopAt] = useState<number>();

  const updateStopAt = (i: number, skipAutoScroll: boolean) => {
    setStopAt(i);
    if (i === firstStopIndex || skipAutoScroll) return;
    setTimeout(() => {
      const el = containerRef.current?.querySelector(`& > div > [data-i="${i === -1 ? planet.moons.length - 1 : i}"]`);
      if (!el) return;
      el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
    }, 100);
  };

  useEffect(() => {
    const cb = (skipAutoScroll: boolean) => {
      for (let i = 0; i < planet.moons.length; i++) {
        const moon = planet.moons[i];
        if ((points.value[moon.id] || 0) >= (moon.points?.min || 0)) continue;
        updateStopAt(i, skipAutoScroll);
        return;
      }
      updateStopAt(-1, skipAutoScroll);
    };

    cb(true);
    return subscribe(points, () => cb(false));
  }, [planet.moons]);

  return (
    <div className="flex-1 p-3 flex overflow-hidden">
      <div
        ref={containerRef}
        className="flex-1 py-5 overflow-y-auto [scrollbar-gutter:stable] rounded-lg bg-white border border-neutral-200/50 shadow-sm"
      >
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-5">
          {planet.moons.map((moon, i) => {
            if (stopAt === undefined || (stopAt !== -1 && i > stopAt)) return null;
            return (
              <div key={i} data-i={i} className="w-full">
                <Moon moon={moon} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Neptune;
