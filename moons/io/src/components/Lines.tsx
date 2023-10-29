import { generateLine, getDotCoord } from '../lib/helpers';
import { useAppState } from '../lib/state';
import { STROKE_WIDTH } from '../lib/constants';
import type { Dot, Coordinate } from '../lib/types';

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
  if (!state.a || !state.b) return null;
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
