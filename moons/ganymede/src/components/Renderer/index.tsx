import Box from './Box';

import { useAppState } from '../../lib/state';

const Renderer = () => {
  const [state] = useAppState();
  if (!state.visiblePaths.length) return null;
  return (
    <>
      <svg className="absolute inset-0 h-full w-full z-[7]">
        {state.visiblePaths.map(({ id, color, d }) => (
          <path id={id} key={id} d={d} fill={color} />
        ))}
      </svg>

      {state.debug ? state.visiblePaths.map((path) => <Box key={path.id} path={path} />) : null}
    </>
  );
};

export default Renderer;
