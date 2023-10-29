import { getDotCoord } from '../lib/helpers';
import { useAppState } from '../lib/state';
import { STROKE_WIDTH } from '../lib/constants';
import type { Dot, Coordinate } from '../lib/types';

const calcOffset = (start: Coordinate, end: Coordinate) => {
  const dx = start.x - end.x;
  const dy = start.y - end.y;
  return Math.hypot(dx, dy) / Math.PI / 2;
};

// based on https://stackoverflow.com/a/49286885/10298958
const generateLine = (start: Coordinate, end: Coordinate | null) => {
  if (!end) return `M${start.x} ${start.y} ${start.x} ${start.y}`;
  const mx = (end.x + start.x) * 0.5;
  const my = (end.y + start.y) * 0.5;
  const angle = Math.atan2(end.y - start.y, end.x - start.x) + Math.PI / 2;
  const offset = calcOffset(start, end);
  const offsetX = offset * Math.cos(angle);
  const offsetY = offset * Math.sin(angle);
  const cx = start.x > end.x ? mx - offsetX : mx + offsetX;
  const cy = start.x > end.x ? my - offsetY : my + offsetY;
  return `M${start.x} ${start.y} Q${cx} ${cy} ${end.x} ${end.y}`;
};

const BaseLine = ({ d }: { d: string }) => {
  return (
    <path
      d={d}
      stroke="#1a1a1a"
      strokeWidth={STROKE_WIDTH}
      strokeLinecap="round"
      fill="transparent"
      className="drop-shadow-xlb"
    />
  );
};

const TempLine = () => {
  const [state] = useAppState();
  if (!state.a) return null;
  return (
    <svg className="absolute inset-0 h-full w-full z-[9] pointer-events-none">
      <BaseLine d={generateLine(dotToCoord(state.a), state.b)} />
    </svg>
  );
};

const dotToCoord = (dot: Dot): Coordinate => {
  const el = document.querySelector(`.dot[data-side="${dot.side}"][data-index="${dot.index}"]`)!;
  return getDotCoord(el as HTMLDivElement);
};

const Line = ({ start, end }: { start: Dot; end: Dot }) => {
  return <BaseLine d={generateLine(dotToCoord(start), dotToCoord(end))} />;
};

const Lines = () => {
  const [state] = useAppState();

  return (
    <>
      <TempLine />
      <svg className="absolute inset-0 h-full w-full z-[8] touch-none pointer-events-none">
        {state.lines.map((line, i) => (
          <Line key={i} start={line.a} end={line.b} />
        ))}
      </svg>
    </>
  );
};

export default Lines;
