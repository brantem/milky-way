import Dot from './Dot';

import { Side } from '../lib/types';

const Items = ({ items, side }: { items: string[]; side: Side }) => {
  return (
    <ol
      className={[
        'list-none flex flex-col gap-12 m-0 p-0 select-none',
        side === 'left' ? '[grid-area:start]' : '[grid-area:end]',
      ].join(' ')}
    >
      {items.map((item, i) => (
        <li
          key={item}
          className={[
            'grid items-center gap-3',
            side === 'left'
              ? "grid-cols-[1fr_42px] [grid-template-areas:'text_dot']"
              : "grid-cols-[42px_1fr] [grid-template-areas:'dot_text']",
          ].join(' ')}
        >
          <span className={['[grid-area:text]', side === 'left' ? 'text-end' : 'text-start'].join(' ')}>{item}</span>
          <Dot side={side} index={i + 1} />
        </li>
      ))}
    </ol>
  );
};

export default Items;
