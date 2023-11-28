import { useEffect, useState } from 'react';

import { getBoundingClientRectById } from '../../lib/helpers';
import { Path } from '../../lib/types';
import { useAppState } from '../../lib/state';

type Style = {
  top: number;
  left: number;
  height: number;
  width: number;
};

const PADDING = 32;

const Box = ({ path }: { path: Path }) => {
  const [state] = useAppState();
  const [style, setStyle] = useState<Style>();

  useEffect(() => {
    const rect = getBoundingClientRectById(path.id);
    if (!rect) return;
    setStyle({
      top: rect.top - PADDING / 2,
      left: rect.left - PADDING / 2,
      width: rect.width + PADDING,
      height: rect.height + PADDING,
    });
  }, []);

  if (!path.prediction || !style) return null;

  const probability = path.prediction.probability * 100;
  const isInRange = state.model
    ? probability >= state.model.probability.min && probability <= state.model.probability.max
    : false;

  return (
    <div
      className={[
        'absolute border border-solid rounded-md z-[8] flex items-end',
        isInRange ? 'border-green-300' : 'border-neutral-300',
      ].join(' ')}
      style={style}
    >
      {path.prediction ? (
        <code className={['m-0 p-1 rounded-b-md break-all', isInRange ? 'bg-green-50' : 'bg-neutral-50'].join(' ')}>
          {JSON.stringify({ label: path.prediction.label, probability: probability.toFixed(2) })}
        </code>
      ) : null}
    </div>
  );
};

export default Box;
