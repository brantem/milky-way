import { useAppState } from '../lib/state';

import type { Dot, Coordinate } from '../lib/types';

import { STROKE_WIDTH } from '../lib/constants';
import { getDotCoord } from '../lib/helpers';

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
      className="relative w-full h-full grid grid-cols-3 [grid-template-areas:'start_middle_end'] items-center justify-between font-sans text-4xl font-semibold"
      onPointerDown={(e) => {
        if (e.button !== 0) return;
        if (!(e.target as any).classList.contains('dot')) return;
        const el = e.target as HTMLDivElement;
        set.start = { dot: el.dataset as unknown as Dot, ...getDotCoord(el) };
      }}
      onPointerMove={(e) => {
        if (!set.start) return;
        if ((e.target as any).classList.contains('dot')) {
          const el = e.target as HTMLDivElement;
          const dot = el.dataset as unknown as Dot;
          if (dot.side !== set.start.dot.side) {
            set.end = { dot, ...getDotCoord(el) };
            return;
          }
        }
        set.end = getCoord(e.currentTarget, e.pageX, e.pageY);
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
