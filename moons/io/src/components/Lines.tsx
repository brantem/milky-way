import { useState, useEffect } from 'react';

import { STROKE_SIZE } from '../lib/constants';
import { useAppState } from '../lib/state';
import type { Coordinate, Line } from '../lib/types';

const calcOffset = (a: Coordinate, b: Coordinate) => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy) / Math.PI / 2;
};

// based on https://stackoverflow.com/a/49286885/10298958
const generateLine = (a: Coordinate, b: Coordinate | null) => {
  if (!b) return `M${a.x} ${a.y} ${a.x} ${a.y}`;
  const mx = (b.x + a.x) * 0.5;
  const my = (b.y + a.y) * 0.5;
  const angle = Math.atan2(b.y - a.y, b.x - a.x) + Math.PI / 2;
  const offset = calcOffset(a, b);
  const offsetX = offset * Math.cos(angle);
  const offsetY = offset * Math.sin(angle);
  const cx = a.x > b.x ? mx - offsetX : mx + offsetX;
  const cy = a.x > b.x ? my - offsetY : my + offsetY;
  return `M${a.x} ${a.y} Q${cx} ${cy} ${b.x} ${b.y}`;
};

const BaseLine = ({ d }: { d: string }) => {
  return (
    <path
      d={d}
      stroke="#1a1a1a"
      strokeWidth={STROKE_SIZE}
      strokeLinecap="round"
      fill="transparent"
      className="drop-shadow-xlb"
    />
  );
};

const idToCoord = (id: string): Coordinate => {
  const parentRect = document.getElementById('io')!.getBoundingClientRect();
  const el = document.querySelector(`#${id} > .dot`)!;
  const rect = el.getBoundingClientRect();
  return { x: rect.x - parentRect.x + rect.width / 2, y: rect.y - parentRect.y + rect.width / 2 };
};

const useIdToCoord = (id: string | Coordinate | null): Coordinate => {
  const getCoord = () => {
    if (!id) return;
    if (typeof id !== 'string') return setCoord(coord);
    setCoord(idToCoord(id));
  };

  const [coord, setCoord] = useState<Coordinate>(() => {
    if (!id || typeof id !== 'string') return { x: 0, y: 0 };
    return idToCoord(id);
  });

  useEffect(() => {
    window.addEventListener('resize', getCoord);
    return () => window.removeEventListener('resize', getCoord);
  }, []);

  useEffect(() => {
    getCoord();
  }, []);

  return coord;
};

const TempLine = () => {
  const [state] = useAppState();
  if (!state.a) return null;
  const b = typeof state.b === 'string' ? idToCoord(state.b) : state.b;
  return (
    <svg className="absolute inset-0 h-full w-full z-[9] pointer-events-none">
      <BaseLine d={generateLine(idToCoord(state.a), b)} />
    </svg>
  );
};

const Line = ({ line }: { line: Line }) => {
  const a = useIdToCoord(line.a);
  const b = useIdToCoord(line.b);
  return <BaseLine d={generateLine(a, b)} />;
};

const Lines = () => {
  const [state] = useAppState();

  return (
    <>
      <TempLine />
      <svg className="absolute inset-0 h-full w-full z-[8] touch-none pointer-events-none">
        {state.visibleLines.map((line, i) => (
          <Line key={i} line={line} />
        ))}
      </svg>
    </>
  );
};

export default Lines;
