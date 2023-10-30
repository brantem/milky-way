import { useDroppable } from '@dnd-kit/core';

import Choice from './Choice';

import { useAppState } from '../lib/state';

type BlankProps = {
  children: string;
};

const Blank = ({ children }: BlankProps) => {
  const [, a, key, b] = children.match(/(.*)(__\w+__)(.*)/)!;

  const { items } = useAppState();
  const value = items.find((item) => item[0] === key)?.[1];

  const { setNodeRef } = useDroppable({
    id: key,
    data: {
      accepts: ['callisto-choice'],
    },
  });

  return (
    <span className="inline-flex items-baseline -my-1" ref={setNodeRef}>
      {a}
      {value ? (
        <Choice choice={value} />
      ) : (
        <span className="bg-lime-100 rounded-lg text-center px-2 py-1 select-none min-w-[theme(spacing.32)]">
          &nbsp;
        </span>
      )}
      {b}
    </span>
  );
};

export default Blank;
