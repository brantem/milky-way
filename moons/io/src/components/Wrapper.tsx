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
      className="relative w-full h-full grid grid-cols-[1fr_theme(spacing.52)_1fr] [grid-template-areas:'start_middle_end'] items-center justify-between font-sans text-4xl font-semibold"
      onPointerDown={(e) => {
        if (e.button !== 0) return;
        if (!(e.target as any).classList.contains('dot')) return;
        const el = e.target as HTMLDivElement;
        set.start(el.dataset as unknown as Dot);
      }}
      onPointerMove={(e) => {
        if (!set.a) return;
        if ((e.target as any).classList.contains('dot')) {
          const el = e.target as HTMLDivElement;
          const dot = el.dataset as unknown as Dot;
          if (dot.side !== set.a.side && !set.isConnected(dot)) {
            set.b = { dot, ...getDotCoord(el) };
            return;
          }
        }
        set.b = getCoord(e.currentTarget, e.pageX, e.pageY);
      }}
      onPointerUp={set.addLine}
    >
      {children}
    </div>
  );
};

export default Wrapper;
