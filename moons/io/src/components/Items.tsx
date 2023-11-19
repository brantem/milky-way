import Dot from './Dot';

import { type Item, Side } from '../lib/types';

const shuffle = <T,>(a: T[]): T[] => {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = b[i];
    b[i] = b[j];
    b[j] = temp;
  }
  return b;
};

type ItemsProps = {
  items: Item[];
  side: Side;
  shuffle?: boolean;
};

const Items = ({ items, side, shuffle: _shuffle }: ItemsProps) => {
  return (
    <ol
      className={[
        'list-none flex flex-col gap-12 m-0 p-0 select-none',
        side === Side.Left ? '[grid-area:start]' : '[grid-area:end]',
      ].join(' ')}
    >
      {(_shuffle ? shuffle(items) : items).map((item) => (
        <li
          key={item.id}
          id={`${side}-${item.id}`}
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
      ))}
    </ol>
  );
};

export default Items;
