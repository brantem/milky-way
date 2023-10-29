import { useState } from 'react';

import { generateLine } from '../lib/helpers';

const STROKE_WIDTH = 8;

const Line = ({ d }: { d: string }) => {
  return (
    <path
      d={d}
      stroke="#1a1a1a"
      strokeWidth={STROKE_WIDTH}
      strokeLinecap="round"
      fill="transparent"
      className="drop-shadow-lg"
    />
  );
};

type Coordinate = [x: number, y: number];

const getCoord = (el: HTMLElement, pageX: number, pageY: number): Coordinate => {
  const rect = el.getBoundingClientRect();
  const x = pageX - rect.x - window.scrollX;
  const y = pageY - rect.y - window.scrollY;
  const min = STROKE_WIDTH / 2;
  const maxX = rect.width - STROKE_WIDTH / 2;
  const maxY = rect.height - STROKE_WIDTH / 2;
  return [x > maxX ? maxX : x < min ? min : x, y > maxY ? maxY : y < min ? min : y];
};

const Lines = () => {
  const [a, setA] = useState<Coordinate | null>(null);
  const [b, setB] = useState<Coordinate | null>(null);
  const [lines, setLines] = useState<string[]>([]);

  return (
    <>
      {lines.length ? (
        <svg className="absolute inset-0 h-full w-full z-[8]">
          {lines.map((line, i) => (
            <Line key={i} d={line} />
          ))}
        </svg>
      ) : null}

      <svg
        className="absolute inset-0 h-full w-full z-[9] touch-none"
        onPointerDown={(e) => {
          if (e.button !== 0) return;
          (e.target as any).setPointerCapture(e.pointerId);
          setA(getCoord(e.target as any, e.pageX, e.pageY));
        }}
        onPointerMove={(e) => {
          if (!a || e.buttons !== 1) return;
          setB(getCoord(e.target as any, e.pageX, e.pageY));
        }}
        onPointerUp={() => {
          if (!a || !b) return;
          const line = generateLine(a[0], a[1], b[0], b[1]);
          setA(null);
          setB(null);
          setLines((prev) => [...prev, line]);
        }}
      >
        {a && b && <Line d={generateLine(a[0], a[1], b[0], b[1])} />}
      </svg>
    </>
  );
};

export default Lines;
