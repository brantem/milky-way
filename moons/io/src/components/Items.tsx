import Dot from './Dot';

import { Side } from '../lib/types';

const Items = ({ items, side }: { items: string[]; side: Side }) => {
  return (
    <ol className="list-none flex flex-col gap-12 m-0 p-0 select-none">
      {items.map((item, i) => (
        <li
          key={item}
          className={['flex items-center gap-2', side === 'right' ? 'flex-row-reverse' : 'flex-row'].join(' ')}
        >
          <span>{item}</span>
          <Dot side={side} index={i + 1} />
        </li>
      ))}
    </ol>
  );
};

export default Items;
