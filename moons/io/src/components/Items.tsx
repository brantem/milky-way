import { useMemo } from 'react';

import Dot from './Dot';

import { type Item, Side } from '../lib/types';
import { useIo } from '../lib/state';

type ItemsProps = {
  items: Item[];
  side: Side;
};

const Items = ({ items, side }: ItemsProps) => {
  const m = useMemo(() => {
    const m = new Map();
    items.forEach((item) => m.set(item.id, item));
    return m;
  }, []);

  const { _id, leftIds, rightIds } = useIo();

  return (
    <ol
      className={[
        'list-none flex flex-col gap-12 m-0 p-0 select-none',
        side === Side.Left ? '[grid-area:start]' : '[grid-area:end]',
      ].join(' ')}
    >
      {(side === Side.Left ? leftIds : rightIds).map((id) => {
        const item = m.get(id);
        return (
          <li
            key={item.id}
            id={`${_id}-${side}-${item.id}`}
            className={[
              'grid items-center gap-3',
              side === Side.Left
                ? "grid-cols-[1fr_42px] [grid-template-areas:'text_dot']"
                : "grid-cols-[42px_1fr] [grid-template-areas:'dot_text']",
            ].join(' ')}
          >
            <span className={['[grid-area:text]', side === Side.Left ? 'text-end' : 'text-start'].join(' ')}>
              {item.text}
            </span>
            <Dot side={side} />
          </li>
        );
      })}
    </ol>
  );
};

export default Items;
