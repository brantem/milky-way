import { useDroppable } from '@dnd-kit/core';

import Choice from './Choice';

import { useAppState } from '../lib/state';

type BlankProps = {
  children: string;
};

const Blank = ({ children }: BlankProps) => {
  const [, a, id, b] = children.match(/(.*)(__\w+__)(.*)/)!;

  const [state] = useAppState();
  const choice = state.answers.find((item) => item.blankId === id)?.choice;

  const { setNodeRef } = useDroppable({
    id,
    data: {
      accepts: ['callisto-choice'],
    },
  });

  return (
    <span className="inline-flex items-baseline -my-1" ref={setNodeRef}>
      {a}
      {choice ? (
        <Choice choice={choice} />
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
