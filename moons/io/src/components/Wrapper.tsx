import { useAppState } from '../lib/state';

import type { Dot, Coordinate } from '../lib/types';

import { STROKE_WIDTH } from '../lib/constants';

const getDotCoord = (parent: HTMLElement, el: HTMLElement): Coordinate => {
  const parentRect = parent.getBoundingClientRect();
  const rect = el.getBoundingClientRect();
  return { x: rect.x - parentRect.x + rect.width / 2, y: rect.y - parentRect.y + rect.width / 2 };
};

const getCoord = (parent: HTMLElement, pageX: number, pageY: number): Coordinate => {
  const rect = parent.getBoundingClientRect();
  const x = pageX - rect.x - window.scrollX;
  const y = pageY - rect.y - window.scrollY;
  const min = STROKE_WIDTH / 2;
  const maxX = rect.width - STROKE_WIDTH / 2;
  const maxY = rect.height - STROKE_WIDTH / 2;
  return { x: x > maxX ? maxX : x < min ? min : x, y: y > maxY ? maxY : y < min ? min : y };
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const [, set] = useAppState();
  return (
    <div
      className="relative w-full h-full flex items-center justify-center font-sans text-5xl font-semibold gap-52"
      onPointerDown={(e) => {
        if (e.button !== 0) return;
        if (!(e.target as any).classList.contains('dot')) return;
        const el = e.target as HTMLDivElement;
        set.start = { dot: el.dataset as unknown as Dot, ...getDotCoord(e.currentTarget, el) };
      }}
      onPointerMove={(e) => {
        if (!set.start) return;
        if ((e.target as any).classList.contains('dot')) {
          const el = e.target as HTMLDivElement;
          set.end = getDotCoord(e.currentTarget, el);
        } else {
          set.end = getCoord(e.currentTarget, e.pageX, e.pageY);
        }
      }}
      onPointerUp={() => {
        if (!set.start || !set.end) return;
        if (set.end.dot) set.lines.push({ start: set.start.dot, end: set.end.dot });
        set.start = null;
        set.end = null;
      }}
    >
      {children}
    </div>
  );
};

export default Wrapper;
