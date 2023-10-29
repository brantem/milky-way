import { generateLine } from '../lib/helpers';
import { useAppState } from '../lib/state';
import { STROKE_WIDTH } from '../lib/constants';

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

const Lines = () => {
  const [state] = useAppState();

  return (
    <svg className="absolute inset-0 h-full w-full z-[8] touch-none pointer-events-none">
      {state.start && state.end && <Line d={generateLine(state.start, state.end)} />}
    </svg>
  );
};

export default Lines;
